import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
// import loginImage from '../../assets/images/loginimage2.jpg'; // Import the background image
import loginimage from "../../assets/images/loginimage2.jpg"
// import loginimage from "../../assets/images/loginimage3.avif"
import '../../assets/landing/css/sellerlogin.css'; // Import the CSS file
import axios from 'axios';

export const SellerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      // data.roleId = "67e23529907acfb7882f2426";
      const res = await axios.post("http://localhost:4000/seller/loginseller", data); // Use full backend URL

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

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("roles", res.data.data.roleId.name);

        console.log("Stored ID:", localStorage.getItem("id")); // Debugging: Log stored ID
        console.log("Stored Role:", localStorage.getItem("roles")); // Debugging: Log stored role


        if (res.data.data.roleId?.name === "SELLER") {
          navigate("/seller");
        } else {
          toast.error("Invalid role", {
            position: "top-center",
            autoClose: 900,
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
      console.log(error)
      toast.error(error.response?.data?.message || "Login Failed", {
        position: "top-center",
        autoClose: 900,
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
        backgroundImage: `url(${loginimage})`, // Set background image
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
        <h1 className="login-title">Seller Login</h1>
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

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
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
            <Link to="/forgot-password">Forgot Password?</Link>
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