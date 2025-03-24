import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "../../assets/homepage.css";
import axios from "axios";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [fetchedCartId, setFetchedCartId] = useState(null);

  useEffect(() => {
    const buyerId = localStorage.getItem("id");
    console.log("Fetching cart for userId:", buyerId);

    const fetchCartData = async () => {
      try {
        const cartResponse = await axios.get(`/cart/user/${buyerId}`); // Fetch cart data
        if (cartResponse.data && cartResponse.data.data) {
          setCart(cartResponse.data.data.items); // Assuming your cart data has an 'items' array.
          setFetchedCartId(cartResponse.data.data._id); // Set fetched cartId
        } else {
          console.error("Cart data not found");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData(); // Call fetchCartData when component mounts

    if (location.state?.cartItems) {
      setCart(location.state.cartItems);
    }
  }, [location.state]);

  const handleQuantityChange = async (id, amount) => {
    try {
      const item = cart.find((item) => item.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + amount);
      await axios.put(`/cart/${fetchedCartId}/item/${id}`, {
        quantity: newQuantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/cart/${fetchedCartId}/item/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleOrderNow = async () => {
    try {
      if (!fetchedCartId) {
        console.error("Cart ID not available");
        return;
      }

      // Calculate total order amount
      const totalOrder = cart.reduce(
        (acc, item) => acc + parseFloat(item.price.replace("₹", "")) * item.quantity,
        0
      );

      // Send POST request to /addorder API
      const orderResponse = await axios.post("/order/addorder", {
        cartId: fetchedCartId, // Use fetched cartId
        orderStatus: "Pending",
        totalOrder: totalOrder,
      });

      console.log("Order placed:", orderResponse.data);
      navigate("/order-confirmation", { state: { orderItems: cart } });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/exploreitems");
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="product-details-overlay">
      <div className="product-details-card">
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "80%",
            maxWidth: "600px",
            borderRadius: "8px",
          }}
        >
          <div className="col-md-12" style={{ width: "100%" }}>
            <div className="card card-outline card-success">
              <div className="card-header">
                <h2 className="card-title" style={{ fontSize: "1.2rem" }}>
                  Your Cart
                </h2>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-lte-toggle="card-remove"
                    onClick={closeModal}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#888" }}>
                    Your cart is empty.
                  </p>
                ) : (
                  <div>
                    <div>
                      {cart.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="col-md-12"
                            style={{ marginBottom: "15px" }}
                          >
                            <div>
                              <div>
                                <h3 style={{ fontSize: "1.7rem" }}>
                                  {item.productName}
                                </h3>
                              </div>
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{
                                  width: "170px",
                                  height: "auto",
                                  marginTop: "30px",
                                }}
                              />
                              <div>
                                <p style={{ fontSize: "1.3rem" }}>
                                  Price: {item.price}
                                </p>
                                <p style={{ fontSize: "1.1rem" }}>
                                  {item.description}
                                </p>
                                <div>
                                  Qty &nbsp;&nbsp;
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(item.id, -1)
                                    }
                                    style={{
                                      padding: "5px 10px",
                                      marginRight: "5px",
                                      border: "1px solid #ccc",
                                      cursor: "pointer",
                                    }}
                                  >
                                    
                                  </button>
                                  <span style={{ margin: "0 10px" }}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(item.id, 1)
                                    }
                                    style={{
                                      padding: "5px 10px",
                                      marginLeft: "5px",
                                      border: "1px solid #ccc",
                                      cursor: "pointer",
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-outline-success"
                              onClick={handleOrderNow}
                              style={{ marginTop: "20px" }}
                            >
                              Order Now
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveItem(item.id)}
                              style={{ marginTop: "20px", marginLeft: "40px" }}
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;