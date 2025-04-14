import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
    const { orderId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const orderData = useLocation().state;

    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Fetch order data
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderResponse = await fetch(`http://localhost:4000/order/buyer/${orderData.orderData?.buyerId}`);
                const orderDataResponse = await orderResponse.json();
                setOrders(orderDataResponse.data || []);
                
                // Check if order is already paid
                if (orderDataResponse.data?.[0]?.paymentStatus === 'paid') {
                    setPaymentStatus('paid');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [orderId, orderData]);

    // Load Razorpay script dynamically
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle payment process
    const handlePayment = async () => {
        setPaymentProcessing(true);
        try {
            // 1. Create order with backend
            const orderResponse = await axios.post(
                "http://localhost:4000/payment/create_order",
                {
                    amount: totalAmount,
                    currency: "INR",
                    receipt: `order_${orderId}_${Date.now()}`,
                    notes: {
                        orderId: orderId,
                        buyerId: orderData.orderData?.buyerId
                    }
                }
            );

            // 2. Load Razorpay SDK
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                setPaymentProcessing(false);
                return;
            }

            // 3. Initialize Razorpay payment
            const options = {
                key: "rzp_test_a5klQkqI6XlKEq", // <-- Use your actual key here
                amount: orderResponse.data.amount,
                currency: orderResponse.data.currency,
                name: "Your Store Name",
                description: `Payment for Order #${orderId}`,
                order_id: orderResponse.data.id,
                handler: async function (response) {
                    try {
                        // Verify payment with backend
                        const verificationResponse = await axios.post(
                            "http://localhost:4000/payment/verify_order",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: orderId,
                                amount: totalAmount,
                                buyerId: orderData.orderData?.buyerId
                            }
                        );

                        if (verificationResponse.data.status === "success") {
                            setPaymentStatus('paid');
                            // Update local order status
                            const updatedOrders = orders.map(order => ({
                                ...order,
                                orderstatus: 'Paid',
                                paymentStatus: 'paid'
                            }));
                            setOrders(updatedOrders);
                            alert("Payment successful! Your order is confirmed.");
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Payment verification error:", error);
                        alert("There was an error verifying your payment. Please contact support.");
                    } finally {
                        setPaymentProcessing(false);
                    }
                },
                prefill: {
                    name: orderData.orderData?.buyerName || "Customer",
                    email: orderData.orderData?.buyerEmail || "customer@example.com",
                    contact: orderData.orderData?.buyerPhone || "9999999999",
                },
                theme: {
                    color: "#2563eb",
                },
                modal: {
                    ondismiss: () => {
                        setPaymentProcessing(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            
        } catch (error) {
            console.error("Payment processing error:", error);
            alert("There was an error processing your payment. Please try again.");
            setPaymentProcessing(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    // Calculate total amount
    const totalAmount = orders.reduce((sum, order) => {
        const price = order?.cartId?.productId?.price || 0;
        const qty = order?.quantity || 1;
        return sum + price * qty;
    }, 0);

    // Loading and error states
    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading invoice...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;
    if (orders.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}>No orders found</div>;

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
                    Order Invoice #{orderId}
                </h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    marginBottom: '1.2rem',
                    color: '#4a5568'
                }}>
                    <span>Date: {formatDate(orders[0].orderdate)}</span>
                    <span>Order Status: <span style={{
                        color: 
                            orders[0]?.orderstatus === 'Delivered' ? '#16a34a' :
                            orders[0]?.orderstatus === 'Cancelled' ? '#dc2626' :
                            paymentStatus === 'paid' ? '#16a34a' : '#2563eb',
                        fontWeight: '600'
                    }}>
                        {paymentStatus === 'paid' ? 'Paid' : orders[0]?.orderstatus}
                    </span></span>
                </div>

                <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ color: '#4a5568', marginBottom: '0.25rem' }}>Payment Status</h3>
                    <strong style={{
                        color: paymentStatus === 'paid' ? '#16a34a' : '#d97706',
                        textTransform: 'capitalize'
                    }}>
                        {paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </strong>
                </div>

                <h3 style={{ color: '#2d3748', fontSize: '1.125rem', marginBottom: '1rem' }}>Order Items</h3>

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
                                            <div style={{ fontWeight: 600 }}>{order.cartId.productId.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                                                {order.cartId.productId.description}
                                            </div>
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

                {/* Order Summary */}
                <div style={{ 
                    marginTop: '1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1rem'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{ color: '#4a5568' }}>Subtotal:</span>
                        <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{ color: '#4a5568' }}>Shipping:</span>
                        <span>{formatCurrency(0)}</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginTop: '1rem',
                        paddingTop: '0.5rem',
                        borderTop: '1px dashed #e2e8f0'
                    }}>
                        <span style={{ fontWeight: '600', color: '#1a202c' }}>Total:</span>
                        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                            {formatCurrency(totalAmount)}
                        </span>
                    </div>
                </div>

                {/* Payment Button */}
                {paymentStatus !== 'paid' && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={handlePayment}
                            disabled={paymentProcessing}
                            style={{
                                backgroundColor: paymentProcessing ? '#cbd5e1' : '#2563eb',
                                color: '#fff',
                                padding: '0.75rem 2rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '8px',
                                border: 'none',
                                cursor: paymentProcessing ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.3s ease',
                                width: '100%',
                                maxWidth: '300px'
                            }}
                            onMouseOver={(e) => {
                                if (!paymentProcessing) {
                                    e.target.style.backgroundColor = '#1e40af';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!paymentProcessing) {
                                    e.target.style.backgroundColor = '#2563eb';
                                }
                            }}
                        >
                            {paymentProcessing ? (
                                <>
                                    <span style={{ display: 'inline-block', marginRight: '8px' }}>
                                        Processing...
                                    </span>
                                </>
                            ) : (
                                `Pay ${formatCurrency(totalAmount)}`
                            )}
                        </button>
                    </div>
                )}

                {/* Payment Success Message */}
                {paymentStatus === 'paid' && (
                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '8px',
                        textAlign: 'center',
                        color: '#166534'
                    }}>
                        <h4 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                            Payment Successful!
                        </h4>
                        <p style={{ margin: 0 }}>
                            Your payment of {formatCurrency(totalAmount)} has been received.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Invoice;