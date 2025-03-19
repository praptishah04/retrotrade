import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import loginimage from "../../assets/images/loginimage.avif"

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      data.roleId = "67c60a1481267c1168056a22";
      const res = await axios.post("/user/login", data);

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
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "BUYER") {
          navigate("/buyerprofile");
        } else if (res.data.data.roleId.name === "SELLER") {
          navigate("/seller");
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
      toast.error(error.response?.data?.message || "Login Failed", {
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
      <div className="vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ 
        // backgroundImage: `url(${loginimage})`, // Use the imported image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
      <div className="card p-4 shadow" style={{ width: "400px", backgroundColor: "white", borderRadius: "15px" }}>
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
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-center" style={{ padding: 15, color: "#333", fontWeight: "bold" }}>Login</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                style={{ paddingRight: "40px" }}
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

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="rememberMe" className="d-flex align-items-center">
                Remember Me
                <input
                  type="checkbox"
                  className="ms-2"
                  {...register("rememberMe")}
                  id="rememberMe"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isLoading}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
            </button>

            <div className="mt-3 text-center">
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#007bff" }}>
                Forgot Password?
              </Link>
            </div>

            <div className="mt-3 text-center">
              <p>Or login with:</p>
              <div className="d-flex justify-content-center gap-3">
                <button type="button" className="btn btn-outline-danger rounded-pill">
                  <i className="fab fa-google"></i> Google
                </button>
                <button type="button" className="btn btn-outline-primary rounded-pill">
                  <i className="fab fa-facebook"></i> Facebook
                </button>
              </div>
            </div>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#007bff" }}>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};