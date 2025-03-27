import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    const fetchOrder = async () => {
        try {
            const response = await axios.get('/api/getallorder');
            
            if (!response.data || !response.data.data) {
                throw new Error('Invalid response format');
            }
            
            const foundOrder = response.data.data.find(order => order._id === orderId);
            
            if (!foundOrder) {
                throw new Error(`Order ${orderId} not found`);
            }
            
            setOrder(foundOrder);
        } catch (err) {
            console.error("Order fetch error:", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchOrder();
}, [orderId]);

    if (loading) return <div>Loading invoice...</div>;
    if (error) return <div>{error}</div>;
    if (!order) return <div>Order not found</div>;

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="invoice-container p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <header className="border-b-2 border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Invoice</h1>
                <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Order #: {order._id}</span>
                    <span className="text-gray-600">Date: {formatDate(order.orderdate)}</span>
                </div>
            </header>

            <div className="order-details mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="font-medium text-gray-700">Status</h3>
                        <p className={`font-semibold ${
                            order.orderstatus === 'Delivered' ? 'text-green-600' :
                            order.orderstatus === 'Cancelled' || order.orderstatus === 'Refunded' ? 'text-red-600' :
                            'text-blue-600'
                        }`}>
                            {order.orderstatus}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700">Total Amount</h3>
                        <p className="font-semibold">${order.totalorder}</p>
                    </div>
                </div>

                {order.cartId && (
                    <div className="cart-items mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Items</h3>
                        <p>Cart ID: {order.cartId}</p>
                        {/* You would typically render cart items here */}
                    </div>
                )}
            </div>

            <div className="total-section bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total</span>
                    <span className="text-xl font-bold">${order.totalorder}</span>
                </div>
            </div>

            <footer className="mt-8 pt-4 border-t-2 border-gray-200 text-sm text-gray-500">
                <p>Thank you for your order!</p>
                <p className="mt-2">If you have any questions, please contact our customer support.</p>
            </footer>
        </div>
    );
};

export default Invoice;