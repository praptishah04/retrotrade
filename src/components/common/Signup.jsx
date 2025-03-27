import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupimage from "../../assets/images/signupimage.jpg";

export const Signup = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === 'buyer') {
      navigate('/buyersignup');
    } else if (userType === 'seller') {
      navigate('/sellersignup');
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ 
       backgroundImage: `url(${signupimage})`, // Use the imported image here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}>
      <div className="card p-4 shadow-lg" style={{ 
        width: "600px", 
        maxWidth: "90vw",
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}>
        <ToastContainer
          position="top-center"
          autoClose={900}
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
        <div className="text-center mb-4">
          <h1 className="mt-3" style={{ 
            color: "#333", 
            fontWeight: "bold",
            fontSize: "2rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}>
            Signup
          </h1>
          <p className="text-center mb-4" style={{ color: "#555" }}>
            Choose your account type:
          </p>
        </div>

        <div className="d-flex flex-column mb-4" style={{ gap: "1.5rem" }}>
          <button
            className="btn btn-primary w-100 rounded-pill py-2"
            onClick={() => handleUserTypeSelection('buyer')}
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Signup as Buyer
          </button>

          <button
            className="btn btn-secondary w-100 rounded-pill py-2"
            onClick={() => handleUserTypeSelection('seller')}
            style={{ 
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Signup as Seller
          </button>
        </div>

        {/* <p className="text-center mt-3" style={{ color: "#555" }}>
          Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "#007bff" }}>Login</Link>
        </p> */}
      </div>
    </div>
  );
};