/**
 * Reusable HeroBanner Component
 *
 * Renders the top page hero with title, subtitle, call-to-action buttons,
 * and decorative couch imagery.
 */

import React from "react";
import { Link } from "react-router-dom";

export function HeroBanner({
  title = "Modern Interior Design Studio",
  subtitle = "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.",
  showButtons = true,
  primaryBtnText = "Shop Now",
  primaryBtnLink = "/shop",
  secondaryBtnText = "Explore",
  secondaryBtnLink = "/services",
  showImage = true,
  imageSrc = "/images/couch.png",
}) {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>{title}</h1>
              {subtitle && <p className="mb-4">{subtitle}</p>}
              {showButtons && (
                <p>
                  <Link to={primaryBtnLink} className="btn btn-secondary me-2">
                    {primaryBtnText}
                  </Link>
                  <Link to={secondaryBtnLink} className="btn btn-white-outline">
                    {secondaryBtnText}
                  </Link>
                </p>
              )}
            </div>
          </div>
          {showImage && (
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={imageSrc} className="img-fluid" alt="Furni Hero Couch" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;

