import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import axios from 'axios'; // Ensure axios is imported
import loginImage from '../../assets/images/loginimage2.jpg'; // Import the background image
import '../../assets/landing/css/sellerlogin.css'; // Import the CSS file

export const BuyerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      data.roleId = "67c60a1481267c1168056a22"; // Add roleId to the request payload
      const res = await axios.post("http://localhost:4000/buyer/login", data); // Use full backend URL

      console.log("API Response:", res.data); // Debugging: Log the response

      if (res.status === 200) {
        toast.success('️✅ Logged in Successfully', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        // Store user data in localStorage
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("roles", res.data.data.roleId.name);

        console.log("Stored ID:", localStorage.getItem("id")); // Debugging: Log stored ID
        console.log("Stored Role:", localStorage.getItem("roles")); // Debugging: Log stored role

        // Navigate based on role
        if (res.data.data.roleId?.name === "BUYER") {
          navigate("/exploreitems");
        } else {
          toast.error("Invalid role", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      let errorMessage = "Login Failed";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from the server";
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="seller-login-container"
      style={{ 
        backgroundImage: `url(${loginImage})`, // Set background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
        theme="colored"
        transition={Bounce}
      />
      <motion.div
        className="login-card"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="login-title">Buyer Login</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group" style={{ 
  position: 'relative',
  marginBottom: '1rem'
}}>
  <label htmlFor="password">Password</label>
  <div style={{ position: 'relative' }}>
    <input
      type={showPassword ? "text" : "password"}
      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
      placeholder="Enter password"
      style={{
        paddingRight: '40px', // Make room for the icon
        width: '100%' // Ensure full width
      }}
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      })}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        color: '#6c757d',
        outline: 'none'
      }}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>
  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
</div>

          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
          </motion.button>

          <div className="forgot-password">
            <Link to="/resetpassword">Forgot Password?</Link>
          </div>

          <div className="social-login">
            <p>Or login with:</p>
            <div className="social-buttons">
              <motion.button
                type="button"
                className="social-button google"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-google"></i> Google
              </motion.button>
              <motion.button
                type="button"
                className="social-button facebook"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-facebook"></i> Facebook
              </motion.button>
            </div>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};