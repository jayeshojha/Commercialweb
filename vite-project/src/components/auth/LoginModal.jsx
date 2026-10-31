/**
 * LoginModal Component
 *
 * Popup dialog allowing users to sign in via Firebase Email/Password
 * or one-click Google Sign-In.
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  closeLoginModal,
  setCredentials,
  setAuthLoading,
  setAuthError,
} from "../../redux/slices/authSlice";
import { setCartFromFirebase } from "../../redux/slices/cartSlice";
import { loginWithFirebase, loginWithGoogle } from "../../services/authService";

export function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const isOpen = useSelector((state) => state.auth.isLoginModalOpen);
  const loading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);

  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  // Handle Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(setAuthError("Please fill in both email and password."));
      return;
    }

    dispatch(setAuthLoading(true));
    const { user, error } = await loginWithFirebase(email, password);

    if (error) {
      dispatch(setAuthError(error));
    } else if (user) {
      dispatch(setCredentials(user));
      if (user.cart && user.cart.length > 0) {
        dispatch(setCartFromFirebase(user.cart));
      }
      dispatch(closeLoginModal());
      setEmail("");
      setPassword("");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    dispatch(setAuthLoading(true));
    const { user, error } = await loginWithGoogle();

    if (error) {
      dispatch(setAuthError(error));
    } else if (user) {
      dispatch(setCredentials(user));
      if (user.cart && user.cart.length > 0) {
        dispatch(setCartFromFirebase(user.cart));
      }
      dispatch(closeLoginModal());
    }
  };

  // Navigate to Registration
  const handleGoToRegister = () => {
    dispatch(closeLoginModal());
    navigate("/register");
  };

  return (
    <div
      className="modal-backdrop-custom d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        zIndex: 9999,
      }}
      onClick={() => dispatch(closeLoginModal())}
    >
      <div
        className="login-modal-card bg-white p-4 rounded shadow-lg position-relative"
        style={{ width: "90%", maxWidth: "420px" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={() => dispatch(closeLoginModal())}
        ></button>

        <h3 className="mb-3 text-center fw-bold text-dark">Welcome Back</h3>
        <p className="text-muted text-center small mb-4">
          Sign in to access your saved cart and orders
        </p>

        {/* Error Alert */}
        {authError && (
          <div className="alert alert-danger py-2 small" role="alert">
            {authError}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          {/* Email Input */}
          <div className="mb-3 text-start">
            <label className="form-label small fw-semibold">Email Address</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-3 text-start">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Password Toggle */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassModal"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label small" htmlFor="showPassModal">
                Show password
              </label>
            </div>
            <span
              className="small text-muted"
              style={{ cursor: "pointer" }}
              onClick={() =>
                alert("Please contact support or register a new account to reset credentials.")
              }
            >
              Forgot password?
            </span>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn mb-3"
          >
            {loading ? "Signing In..." : "Sign In with Email"}
          </button>

          {/* Divider */}
          <div className="text-center my-3 text-muted small position-relative">
            <span className="bg-white px-2">OR</span>
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="auth-google-btn mb-3"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: "18px", height: "18px", marginRight: "10px" }}
            />
            Continue with Google
          </button>
        </form>

        {/* Footer Redirect to Register */}
        <div className="text-center mt-3 small text-muted">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="auth-switch-btn"
            onClick={handleGoToRegister}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
