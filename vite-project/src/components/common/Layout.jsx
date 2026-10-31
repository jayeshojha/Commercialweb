/**
 * Layout Component
 *
 * App shell that encapsulates common layout structure:
 * - Top Navbar
 * - Login Modal (accessible across the entire application)
 * - Outlet (renders matched page routes)
 * - Bottom Footer
 */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "../auth/LoginModal";

export function Layout() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      {/* Top Global Navigation Bar */}
      <Navbar />

      {/* Global Authentication Modal */}
      <LoginModal />

      {/* Main Content Area rendered by current Route */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default Layout;

