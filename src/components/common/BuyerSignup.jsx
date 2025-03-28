import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner, faUser , faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

export const BuyerSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Validation Schema
  const ValidationSchema = {
    firstname: {
      required: {
        value: true,
        message: 'First Name is required*',
      },
    },
    lastname: {
      required: {
        value: true,
        message: 'Last Name is required*',
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
    contactnumber: {
      required: {
        value: true,
        message: 'Contact number is required*',
      },
    },
    password: {
      required: {
        value: true,
        message: 'Password is required*',
      },
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    },
    confirmPassword: {
      required: {
        value: true,
        message: 'Confirm Password is required*',
      },
      validate: (value) => value === watch('password') || 'Passwords do not match',
    },
    terms: {
      required: {
        value: true,
        message: 'You must agree to the terms and conditions*',
      },
    },
  };

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      return;
    }

    setIsLoading(true);
    try {
      data.roleId = '67c60a1481267c1168056a22';
      const res = await axios.post('/buyer/addbuyer', data);

      if (res.status === 200) {
        toast.success('️✅ Successfully Signed up as Buyer!', {
          position: 'top-center',
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        navigate('/buyerlogin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup Failed', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f0f4f8', overflow: 'hidden' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: 'white', borderRadius: '15px', transition: 'transform 0.2s' }}>
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
        <h1 className="text-center" style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Buyer Signup</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faUser } /></span>
              <input
                type="text"
                className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                placeholder="Enter your first name"
                {...register('firstname', ValidationSchema.firstname)}
              />
            </div>
            {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faUser } /></span>
              <input
                type="text"
                className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                placeholder="Enter your last name"
                {...register('lastname', ValidationSchema.lastname)}
              />
            </div>
            {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
              <input
                type="text"
                className={`form-control ${errors.contactnumber ? 'is-invalid' : ''}`}
                placeholder="Enter your contact number"
                {...register('contactnumber', ValidationSchema.contactnumber)}
              />
            </div>
            {errors.contactnumber && <div className="invalid-feedback">{errors.contactnumber.message}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                {...register('email', ValidationSchema.email)}
              />
            </div>
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                {...register('password', ValidationSchema.password)}
                style={{ paddingRight: '40px' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#777' }} />
              </span>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm your password"
                {...register('confirmPassword', ValidationSchema.confirmPassword)}
                style={{ paddingRight: '40px' }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{ color: '#777' }} />
              </span>
            </div>
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
              {...register('terms', ValidationSchema.terms)}
            />
            <label className="form-check-label">
              I agree to the{' '}
              <span onClick={openTermsModal} style={{ color: '#007bff', cursor: 'pointer' }}>
                terms and conditions
              </span>
            </label>
            {errors.terms && <div className="invalid-feedback">{errors.terms.message}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isLoading} style={{ background: '#007bff', border: 'none', transition: 'background-color 0.3s' }}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Signup'}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/buyerlogin" style={{ textDecoration: 'none', color: '#007bff' }}>
            Login
          </Link>
        </p>
      </div>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={closeTermsModal}
        contentLabel="Terms and Conditions"
        style={{
          content: {
            width: '50%',
            margin: 'auto',
            borderRadius: '10px',
            padding: '20px',
          },
        }}
      >
        <h2>Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button onClick={closeTermsModal} className="btn btn-primary">
          Close
        </button>
      </Modal>
    </div>
  );
};