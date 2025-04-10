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
                setOrders(orderDataResponse.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [orderId, orderData]);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading invoice...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;
    if (orders.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}>No orders found</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const totalAmount = orders.reduce((sum, order) => {
        const price = order?.cartId?.productId?.price || 0;
        const qty = order?.quantity || 1;
        return sum + price * qty;
    }, 0);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #f0f4f8, #e2e8f0)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '800px',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#1a202c',
                    marginBottom: '1rem',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '1rem'
                }}>
                    Order Invoice
                </h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    marginBottom: '1.2rem',
                    color: '#4a5568'
                }}>
                    <span>Date: {formatDate(orders[0].orderdate)}</span>
                </div>

                <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ color: '#4a5568', marginBottom: '0.25rem' }}>Status</h3>
                    <strong style={{
                        color:
                            orders[0]?.orderstatus === 'Delivered' ? '#16a34a' :
                                orders[0]?.orderstatus === 'Cancelled' ? '#dc2626' : '#2563eb'
                    }}>
                        {orders[0]?.orderstatus}
                    </strong>
                </div>

                <h3 style={{ color: '#2d3748', fontSize: '1.125rem', marginBottom: '1rem' }}>Items</h3>

                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f8fafc' }}>
                            <tr>
                                {['Product', 'Price', 'Qty', 'Subtotal'].map((text) => (
                                    <th key={text} style={{
                                        padding: '12px',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        color: '#718096',
                                        borderBottom: '1px solid #e2e8f0'
                                    }}>
                                        {text}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #edf2f7' }}>
                                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={order.cartId.productId.imageURL}
                                            alt={order.cartId.productId.name}
                                            style={{
                                                height: '60px',
                                                width: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginRight: '12px'
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{order.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>{order.description}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px', color: '#4a5568' }}>
                                        {formatCurrency(order.cartId.productId.price)}
                                    </td>
                                    <td style={{ padding: '12px', color: '#4a5568' }}>
                                        {order.quantity}
                                    </td>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>
                                        {formatCurrency(order.cartId.productId.price * order.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total */}
                <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                        Total: {formatCurrency(totalAmount)}
                    </h4>
                </div>

                {/* Pay Now Button */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={() => alert('Redirecting to payment...')}
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
