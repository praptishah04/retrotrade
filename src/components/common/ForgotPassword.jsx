import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { Navbar } from "../layout/Navbar";
// import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", {
        email: data.email,
      });
      setMessage(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong! Try again."
      );
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/Images/fpbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="row justify-content-center"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <div className="col-md-12">
            <div
              className="card shadow-sm"
              style={{ border: "none", borderRadius: "10px" }}
            >
              <div
                className="card-header text-white text-center py-3"
                style={{
                  background: "linear-gradient(135deg, #0066cc 0%, #004080 100%)",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h4 className="mb-0">Forgot Password</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      placeholder="Enter your registered email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #0066cc 0%, #004080 100%)",
                      border: "none",
                    }}
                  >
                    Send Reset Link
                  </button>
                </form>

                {message && (
                  <div
                    className={`mt-3 p-3 text-center rounded ${
                      message.includes("sent") ? "bg-success-light" : "bg-danger-light"
                    }`}
                    style={{
                      backgroundColor: message.includes("sent")
                        ? "rgba(25, 135, 84, 0.1)"
                        : "rgba(220, 53, 69, 0.1)",
                    }}
                  >
                    <p
                      className="mb-0"
                      style={{
                        color: message.includes("sent") ? "#198754" : "#dc3545",
                      }}
                    >
                      {message}
                    </p>
                  </div>
                )}

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-primary fw-semibold">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;