import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import signupimage from "../../assets/images/signupimage.avif"

export const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error('Passwords do not match', {
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
      return;
    }

    setIsLoading(true);
    try {
      data.roleId = "67bd47bf1250b5874cc62c09";
      const res = await axios.post("/user/signup", data);

      if (res.status === 201) {
        toast.success('✅ Successfully Signed Up!', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed", {
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

  const handleUserTypeSelection = (userType) => {
    if (userType === 'buyer') {
      navigate('/buyersignup');
    } else if (userType === 'seller') {
      navigate('/sellersignup');
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ 
      // backgroundImage: `url(${signupimage})`, // Use the imported image here
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


        {/* <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
              placeholder="Enter your first name"
              {...register("firstname", { required: "First Name is required" })}
              style={{ borderRadius: "10px" }}
            />
            {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
              placeholder="Enter your last name"
              {...register("lastname", { required: "Last Name is required" })}
              style={{ borderRadius: "10px" }}
            />
            {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              style={{ borderRadius: "10px" }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              style={{ paddingRight: "40px", borderRadius: "10px" }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: "#777" }} />
            </span>
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
              placeholder="Enter password again"
              {...register("confirmpassword", { required: "Confirm Password is required" })}
              style={{ paddingRight: "40px", borderRadius: "10px" }}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{ color: "#777" }} />
            </span>
            {errors.confirmpassword && <div className="invalid-feedback">{errors.confirmpassword.message}</div>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 rounded-pill py-2 mt-3"
            disabled={isLoading}
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Signup'}
          </button> */}

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "#007bff" }}>Login</Link>
          </p>
        {/* </form> */}
      </div>
    </div>
  );
};