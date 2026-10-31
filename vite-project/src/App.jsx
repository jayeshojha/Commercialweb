/**
 * App Component
 *
 * Configures application routing with React Router, sets up persistent
 * Firebase Auth state synchronization, and renders the primary Layout.
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Layout & Global Components
import Layout from "./components/common/Layout";

// Modular Page Views
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Service from "./pages/Service";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Auth & Store Synchronization
import { setCredentials, clearCredentials } from "./redux/slices/authSlice";
import { setCartFromFirebase } from "./redux/slices/cartSlice";
import { subscribeToAuthChanges } from "./services/authService";

// Global Stylesheet
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Listen to Firebase Authentication state changes across page reloads
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        dispatch(setCredentials(currentUser));
        if (currentUser.cart && Array.isArray(currentUser.cart)) {
          dispatch(setCartFromFirebase(currentUser.cart));
        }
      } else {
        dispatch(clearCredentials());
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Shared Layout Shell (Navbar, Login Modal, Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />

          {/* Case-insensitive and legacy route redirects */}
          <Route path="Shop" element={<Navigate to="/shop" replace />} />
          <Route path="About" element={<Navigate to="/about" replace />} />
          <Route path="Service" element={<Navigate to="/services" replace />} />
          <Route path="Blog" element={<Navigate to="/blog" replace />} />
          <Route path="Contact" element={<Navigate to="/contact" replace />} />
          <Route path="Cart" element={<Navigate to="/cart" replace />} />
          <Route path="Register" element={<Navigate to="/register" replace />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
