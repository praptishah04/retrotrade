import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const orderData = useLocation().state.orderData.data
   // console.log("orderdata",orderData.state?.orderData?.data)
    //cartId,BuyerId --> call that api from order table populate 
    

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                //const response = await fetch("http://localhost:4000/order/buyer/"+orderData?.buyerId+"/"+orderData?.cartId);
                const response = await fetch(`http://localhost:4000/order/buyer/${orderData.buyerId}/${orderData.cartId}`)
                const data = await response.json();
                console.log("Order Fetch Response:", data); // Debugging

               setOrder(data.data)
                // Find the order that matches the orderId from URL params
                // const selectedOrder = data.data.find(order => order._id === orderId);

                

                // setOrder(selectedOrder);
            } catch (error) {
                console.error("Order fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <div>Loading invoice...</div>;
    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!order) return <div>Order not found</div>;

    // Function to format date
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
