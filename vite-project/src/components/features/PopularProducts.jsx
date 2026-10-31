/**
 * PopularProducts Component
 *
 * Highlights top 3 featured products with quick summaries and 'Read More' links.
 */

import React from "react";
import { Link } from "react-router-dom";

export function PopularProducts() {
  const items = [
    {
      title: "Nordic Chair",
      desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus.",
      img: "/images/product-1.png",
    },
    {
      title: "Kruzo Aero Chair",
      desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus.",
      img: "/images/product-2.png",
    },
    {
      title: "Ergonomic Chair",
      desc: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus.",
      img: "/images/product-3.png",
    },
  ];

  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail me-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid"
                    style={{ maxHeight: "120px", objectFit: "contain" }}
                  />
                </div>
                <div className="pt-3">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <p>
                    <Link to="/shop">Read More</Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;

