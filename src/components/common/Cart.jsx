import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "../../assets/exploreitems.css";
import axios from "axios";

export const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartId } = useParams();

  const [cart, setCart] = useState([]);
  const [fetchedCartId, setFetchedCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const buyerId = localStorage.getItem("id");
        console.log("Buyer ID from localStorage:", buyerId);
  
        const cartResponse = await axios.get(
          `http://localhost:4000/cart/buyer/${buyerId}`
        );
  
        console.log("Full cart response:", cartResponse.data);
  
        if (
          cartResponse.data &&
          Array.isArray(cartResponse.data.data) &&
          cartResponse.data.data.length > 0
        ) {
          const uniqueCart = cartResponse.data.data.reduce((acc, item) => {
            const existing = acc.find((i) => i.productid === item.productid);
            if (!existing) acc.push(item);
            return acc;
          }, []);
  
          console.log("Unique cart items:", uniqueCart);
          setCart(uniqueCart);
          if (cartResponse.data.data[0]?.cartId) {
            setFetchedCartId(cartResponse.data.data[0].cartId);
          }
        } else if (
          cartResponse.data &&
          cartResponse.data.data &&
          cartResponse.data.data.cartId
        ) {
          // if response is a single object, wrap it in an array
          setCart([cartResponse.data.data]);
          setFetchedCartId(cartResponse.data.data.cartId);
        } else {
          console.warn("Cart data is empty or malformed:", cartResponse.data);
          setCart([]);
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsLoading(false);
      }
    };
  
    fetchCartData();
  }, []);
  

  const handleQuantityChange = (cartItemId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === cartItemId) {
          return {
            ...item,
            quantity: Math.max(1, Number(item.quantity || 0) + amount), // Convert to number
          };
        }
        return item;
      })
    );
  };
  const handleRemoveItem = async (cartItemId) => {
    try {
      if (!cartItemId) {
        toast.error("Cart item ID is missing.");
        return;
      }

      await axios.delete(`/cart/deletecartitem/${cartItemId}`);

      setCart((prevCart) => prevCart.filter((item) => item._id !== cartItemId));

      toast.success("Product removed from cart.");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Error deleting cart item.");
    }
  };

  const handleOrderNow = async () => {
    console.log("handleOrderNow - isLoading:", isLoading);
    console.log("handleOrderNow - fetchedCartId:", fetchedCartId);
    console.log("handleOrderNow - cart:", cart);

    try {
      if (isLoading) {
        toast.warn("Please wait while the cart is loading.");
        return;
      }
      console.log("cart...", cart);
      if (!cart || cart.length === 0) {
        console.error("Cart ID or cart data not available");
        toast.error("Cart is empty or cartId is missing");
        return;
      }

      // const totalorder = cart.reduce(
      //   (total, item) => total + item.productprice * item.quantity,
      //   0
      // );
      
      const totalOrder = cart.reduce(
        (total, item) => total + item.productprice * item.quantity,
        0
      );
      const orderItems = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        productprice: item.productprice,
        totalorder:totalOrder,
        buyerId:localStorage.getItem("id"),
        status:"pending",
        cartId:item._id
      }));

      console.log("order items.........................",orderItems)
     
      const buyerId=localStorage.getItem("id")

      // const orderResponse = await axios.post("/order/addorder", {
      //   // cartId: fetchedCartId,
      //   buyerId:buyerId,
        
      //   totalorder: totalOrder,
      //   //orderItems: orderItems, // Send the orderItems array
      //   cartId:cart[0]?._id
      // });
      const orderResponse = await axios.post("/order/addorder",orderItems)

      console.log("Order placed:**********************", orderResponse.data.data[0]);

      if (orderResponse.status === 200) {
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/invoice", { state: { orderData: orderResponse.data.data[0] } });
        }, 900);
        
      } else {
        toast.warn("Order  not placed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred during ordering the product.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const closeModal = () => {
    navigate("/exploreitems");
  };

  return (
    <div className="product-details-overlay">
      <div className="product-details-card">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
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
              <div
                className="card-body"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                {isLoading ? (
                  <p style={{ textAlign: "center", color: "#888" }}>
                    Loading...
                  </p>
                ) : cart && cart.length > 0 ? (
                  <div>
                    {cart?.map((c) => {
                      return (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginTop: "30px",
                              marginBottom: "30px",
                            }}
                          >
                            <img
                              src={c.productId?.imageURL}
                              alt={c.productId?.name}
                              style={{
                                width: "150px",
                                height: "auto",
                                marginRight: "20px",
                              }}
                            />
                            <div>
                              <h3 style={{ fontSize: "1.7rem" }}>
                                {c.productId?.productName}
                              </h3>
                              <p style={{ fontSize: "1.3rem" }}>
                                Price: {c.productprice}
                              </p>
                              <p>{c.productId?.description}</p>
                              <div>
                                Qty &nbsp;&nbsp;
                                <button
                                  onClick={() =>
                                    handleQuantityChange(c._id, -1)
                                  }
                                  style={{
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                  }}
                                >
                                  −
                                </button>
                                <span style={{ margin: "0 10px" }}>
                                  {c.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(c._id, 1)}
                                  style={{
                                    padding: "5px 10px",
                                    marginLeft: "5px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                  }}
                                >
                                  +
                                </button>
                                <i
                                  class="bi bi-trash"
                                  onClick={() => handleRemoveItem(c._id)}
                                  style={{
                                    marginTop: "20px",
                                    color: "red",
                                    fontSize: "20px",
                                    marginLeft: "50px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-outline-success"
                      onClick={handleOrderNow}
                      style={{ marginTop: "20px" }}
                    >
                      Order Now
                    </button>
                  </div>
                ) : (
                  <p style={{ textAlign: "center", color: "#888" }}>
                    Your cart is empty.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;