/**
 * NotFound (404) Page
 */

import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container py-5 text-center my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-1 fw-bold text-secondary">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-secondary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

