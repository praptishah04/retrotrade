import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Invoice = () => {
    const { orderId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const orderData = useLocation().state;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderResponse = await fetch(`http://localhost:4000/order/buyer/${orderData.orderData?.buyerId}`);
                const orderDataResponse = await orderResponse.json();
                
                console.log("Fetched Orders:", orderDataResponse.data);
                setOrders(orderDataResponse.data || []); // Ensure it's an array
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId, orderData]);

    if (loading) return <div className="text-center py-8">Loading invoice...</div>;
    if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>;
    if (orders.length === 0) return <div className="text-center py-8">No orders found</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="invoice-container p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 border-b-2 pb-4 mb-6">Order Invoice</h1>
            
            {orders.map((order) => (
                <div key={order._id} className="mb-8 border-b pb-6">
                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-600">Order #: {order._id}</span>
                        <span className="text-gray-600">Date: {formatDate(order.orderdate)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-700 mb-1">Status</h3>
                            <p className={`font-semibold text-${order.orderstatus === 'Delivered' ? 'green' : order.orderstatus === 'Cancelled' ? 'red' : 'blue'}-600`}>
                                {order.orderstatus}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-700 mb-1">Total Amount</h3>
                            <p className="font-semibold">{formatCurrency(order.totalorder)}</p>
                        </div>
                    </div>

                    <div className="items-section">
                        <h3 className="font-medium text-gray-700 mb-3">Items</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr key={order.productId}>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {order.imageURL && (
                                                    <img className="h-10 w-10 rounded" src={order.imageURL} alt={order.name} />
                                                )}
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{order.name}</div>
                                                    <div className="text-xs text-gray-500">{order.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order?.cartId?.productId?.price)}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.productprice * order.quantity)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Invoice;
