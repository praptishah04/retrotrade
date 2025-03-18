import React, { useState } from 'react'; // Import useState
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

export const AdminSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const ValidationSchema = {
    fullname: {
      required: {
        value: true,
        message: 'Full Name is required*',
      },
    },
    email: {
      required: {
        value: true,
        message: 'Email is required*',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: {
        value: true,
        message: 'Password is required*',
      },
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
    confirmPassword: {
      required: {
        value: true,
        message: 'Confirm Password is required*',
      },
      validate: (value) => value === watch('password') || 'Passwords do not match',
    },
    adminCode: {
      required: {
        value: true,
        message: 'Admin Code is required*',
      },
    },
    terms: {
      required: {
        value: true,
        message: 'You must agree to the terms and conditions*',
      },
    },
  };

  const submitHandler = async (data) => {
    console.log(data);
    const res = await axios.post("/user/adminsignup", data);
    console.log(res.data);
    if (res.status === 201) {
      toast.success('️✅ Successfully Signed up as Admin!', {
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
    } else {
      alert("Admin not created");
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ overflow: 'hidden' }}>
      <div className="card p-4 shadow" style={{ width: "400px", backgroundColor: "white" }}>
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
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          Admin Signup
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Full Name */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register('fullname', ValidationSchema.fullname)}
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
            {errors.fullname && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.fullname.message}</span>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', ValidationSchema.email)}
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
            {errors.email && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              placeholder="Enter your password"
              {...register('password', ValidationSchema.password)}
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                paddingRight: '40px', // Add padding to prevent text overlap with the icon
              }}
            />
            {/* Eye Icon */}
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#777' }} />
            </span>
            {errors.password && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
              placeholder="Confirm your password"
              {...register('confirmPassword', ValidationSchema.confirmPassword)}
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                paddingRight: '40px', // Add padding to prevent text overlap with the icon
              }}
            />
            {/* Eye Icon */}
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
            >
              <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#777' }} />
            </span>
            {errors.confirmPassword && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Admin Code */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Admin Code</label>
            <input
              type="text"
              placeholder="Enter admin code"
              {...register('adminCode', ValidationSchema.adminCode)}
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
            {errors.adminCode && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.adminCode.message}</span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '15px' }}>
            <label>
              <input
                type="checkbox"
                {...register('terms', ValidationSchema.terms)}
                style={{ marginRight: '5px' }}
              />
              I agree to the terms and conditions
            </label>
            {errors.terms && (
              <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.terms.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Signup
          </button>
        </form>

        {/* Link to Login Page */}
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#333', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};