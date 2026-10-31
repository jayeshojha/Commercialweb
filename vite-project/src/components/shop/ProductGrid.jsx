/**
 * ProductGrid Component
 *
 * Renders a responsive grid of ProductCard components with optional
 * section header/callout column.
 */

import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export function ProductGrid({
  products = [],
  limit,
  showIntro = false,
  introTitle = "Crafted with excellent material.",
  introText = "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.",
  introLink = "/shop",
  introLinkText = "Explore",
}) {
  const displayed = limit ? products.slice(0, limit) : products;

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          {/* Optional Intro Column (e.g. for Home Page showcase) */}
          {showIntro && (
            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">{introTitle}</h2>
              <p className="mb-4">{introText}</p>
              <p>
                <Link to={introLink} className="btn">
                  {introLinkText}
                </Link>
              </p>
            </div>
          )}

          {/* Render individual Product Cards */}
          {displayed.map((product) => (
            <div
              key={product.id}
              className={`col-6 col-md-4 ${
                showIntro ? "col-lg-3" : "col-lg-3"
              } mb-4 mb-md-5`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;

