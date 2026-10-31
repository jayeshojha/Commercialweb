/**
 * Register Page
 *
 * Provides new user registration with Name, Email, and Password.
 * Integrated with Firebase Authentication and Cloud Firestore for persistent user profiles.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, openLoginModal } from "../redux/slices/authSlice";
import { registerWithFirebase, loginWithGoogle } from "../services/authService";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Form Validations
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Call Firebase Authentication & Firestore Service
    const { user, error } = await registerWithFirebase(name, email, password);

    setLoading(false);
    if (error) {
      setErrorMessage(error);
    } else if (user) {
      dispatch(setCredentials(user));
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const { user, error } = await loginWithGoogle();
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      dispatch(setCredentials(user));
      navigate("/");
    }
  };

  return (
    <div
      className="register-page py-5"
      style={{ minHeight: "80vh", backgroundColor: "#eff2f1" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card shadow-sm border-0 p-4 p-md-5 bg-white rounded-3">
              <h2 className="text-center fw-bold mb-2">Create Account</h2>
              <p className="text-center text-muted small mb-4">
                Join Furni for personalized interior recommendations and order tracking.
              </p>

              {/* Error Alert */}
              {errorMessage && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Success Alert */}
              {successMessage && (
                <div className="alert alert-success py-2 small" role="alert">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleRegister}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email Address */}
                <div className="mb-3">
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

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="form-control"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Show Password Toggle */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPassRegister"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label small" htmlFor="showPassRegister">
                    Show passwords
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-submit-btn mb-3"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Divider */}
                <div className="text-center my-3 text-muted small position-relative">
                  <span className="bg-white px-2">OR</span>
                </div>

                {/* Sign up with Google */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleSignUp}
                  className="auth-google-btn mb-3"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    style={{ width: "18px", height: "18px", marginRight: "10px" }}
                  />
                  Sign up with Google
                </button>
              </form>

              {/* Link to Login */}
              <div className="text-center mt-3 small text-muted">
                Already have an account?{" "}
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => {
                    dispatch(openLoginModal());
                    navigate("/");
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

