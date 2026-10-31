/**
 * Navbar Component
 *
 * Provides site navigation, authenticated user display, login trigger,
 * and a real-time shopping cart count badge.
 */

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal, clearCredentials } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { logoutFirebase } from "../../services/authService";

export function Navbar() {
  const dispatch = useDispatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Read auth and cart state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Handle user logout via Firebase
  const handleLogout = async () => {
    await logoutFirebase();
    dispatch(clearCredentials());
    dispatch(clearCart());
  };

  // Toggle mobile navigation menu
  const toggleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Furni navigation bar"
    >
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          Furni<span>.</span>
        </Link>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavCollapse}
          aria-controls="navbarsFurni"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
          id="navbarsFurni"
        >
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={() => setIsNavCollapsed(true)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop" onClick={() => setIsNavCollapsed(true)}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={() => setIsNavCollapsed(true)}>
                About us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={() => setIsNavCollapsed(true)}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog" onClick={() => setIsNavCollapsed(true)}>
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={() => setIsNavCollapsed(true)}>
                Contact us
              </NavLink>
            </li>

            {/* Auth Actions: Login / Register vs Logout */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  type="button"
                  className="navbar-auth-btn nav-link text-start"
                  onClick={() => {
                    handleLogout();
                    setIsNavCollapsed(true);
                  }}
                  title="Sign Out"
                >
                  Logout ({user?.displayName || "Account"})
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  type="button"
                  className="navbar-auth-btn nav-link text-start"
                  onClick={() => {
                    dispatch(openLoginModal());
                    setIsNavCollapsed(true);
                  }}
                  title="Login or Create an Account"
                >
                  Login / Register
                </button>
              </li>
            )}
          </ul>

          {/* User Profile & Shopping Cart CTA Icons */}
          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-md-4 align-items-center flex-row">
            {isAuthenticated ? (
              <li className="nav-item me-3">
                <span
                  className="nav-link text-white-50 d-flex align-items-center"
                  title={user?.email || ""}
                >
                  <img
                    src="/images/user.svg"
                    alt="User Profile"
                    style={{ width: "22px", height: "22px", marginRight: "6px" }}
                  />
                  <small className="text-white d-none d-lg-inline">
                    {user?.displayName || "User"}
                  </small>
                </span>
              </li>
            ) : (
              <li className="nav-item me-3">
                <button
                  type="button"
                  className="btn nav-link bg-transparent border-0 p-1"
                  onClick={() => dispatch(openLoginModal())}
                  title="Sign In / Register"
                  aria-label="Sign In or Register"
                >
                  <img
                    src="/images/user.svg"
                    alt="User Profile"
                    style={{ width: "22px", height: "22px" }}
                  />
                </button>
              </li>
            )}

            {/* Shopping Cart Icon with Badge */}
            <li className="nav-item position-relative">
              <Link className="nav-link p-1 d-inline-block position-relative" to="/cart" title="Shopping Cart">
                <img
                  src="/images/cart.svg"
                  alt="Cart"
                  style={{ width: "24px", height: "24px" }}
                />
                {totalQuantity > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem", padding: "0.25em 0.5em" }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

