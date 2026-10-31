/**
 * ProductCard Component
 *
 * Renders an individual product item with image, title, price,
 * and an interactive, clearly visible 'Add to Cart' button.
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { openLoginModal } from "../../redux/slices/authSlice";
import { formatCurrency } from "../../utils/formatters";

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If user is not signed in, prompt login modal
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    // Dispatch action to Redux store
    dispatch(addToCart(product));

    // Show temporary feedback toast/badge
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div className="product-item position-relative d-block text-decoration-none">
      {/* Product Image */}
      <img
        src={product.img}
        alt={product.title}
        className="img-fluid product-thumbnail"
        loading="lazy"
      />

      {/* Product Title */}
      <h3 className="product-title">{product.title}</h3>

      {/* Formatted Price */}
      <strong className="product-price">{formatCurrency(product.price)}</strong>

      {/* Added notice badge */}
      {addedNotice && (
        <span
          className="badge bg-success position-absolute"
          style={{ bottom: "55px", left: "50%", transform: "translateX(-50%)", zIndex: 15 }}
        >
          Added to Cart!
        </span>
      )}

      {/* Clearly Visible Add To Cart (+) Button */}
      <button
        type="button"
        className="product-add-btn"
        title="Add to cart"
        onClick={handleAddToCart}
        aria-label={`Add ${product.title} to cart`}
      >
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
}

export default ProductCard;
