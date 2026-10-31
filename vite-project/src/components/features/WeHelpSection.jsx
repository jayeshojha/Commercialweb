/**
 * WeHelpSection Component
 *
 * Renders the modern interior design showcase with grid of photos
 * and feature checklist.
 */

import React from "react";
import { Link } from "react-router-dom";

export function WeHelpSection() {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">
          {/* Photo Grid */}
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img src="/images/img-grid-1.jpg" alt="Interior Grid 1" />
              </div>
              <div className="grid grid-2">
                <img src="/images/img-grid-2.jpg" alt="Interior Grid 2" />
              </div>
              <div className="grid grid-3">
                <img src="/images/img-grid-3.jpg" alt="Interior Grid 3" />
              </div>
            </div>
          </div>

          {/* Description and Checklist */}
          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">
              We Help You Make Modern Interior Design
            </h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis
              nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
              velit imperdiet dolor tempor tristique.
            </p>

            <ul className="list-unstyled custom-list my-4">
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
            </ul>

            <p>
              <Link to="/services" className="btn">
                Explore Services
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeHelpSection;

