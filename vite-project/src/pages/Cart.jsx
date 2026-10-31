/**
 * Cart Page
 *
 * Displays shopping cart items, controls to increase/decrease quantity,
 * item removal, subtotal computation, and checkout summary.
 * Cart changes are automatically synchronized to Firebase Cloud Firestore.
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HeroBanner from "../components/common/HeroBanner";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../redux/slices/cartSlice";
import { openLoginModal } from "../redux/slices/authSlice";
import { formatCurrency } from "../utils/formatters";

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    const orderId = "FURNI-" + Math.floor(100000 + Math.random() * 900000);
    const summary = {
      orderId,
      totalAmount,
      totalQuantity,
      customer: user?.displayName || user?.email || "Valued Customer",
    };

    setOrderConfirmation(summary);
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      {/* Hero Header */}
      <HeroBanner
        title="Your Shopping Cart"
        subtitle="Review your chosen furniture items, adjust quantities, or proceed to secure checkout."
        showButtons={false}
      />

      <div className="untree_co-section before-footer-section">
        <div className="container">
          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-5">
              <div className="mb-4">
                <img
                  src="/images/cart.svg"
                  alt="Empty Cart"
                  style={{ width: "80px", opacity: 0.4 }}
                />
              </div>
              <h3 className="h4 text-muted mb-3">Your shopping cart is currently empty</h3>
              <p className="text-muted mb-4">
                Explore our catalog to find Scandinavian chairs, sofas, and crafted tables.
              </p>
              <Link to="/shop" className="btn btn-secondary me-2">
                Start Shopping
              </Link>
              {!isAuthenticated && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => dispatch(openLoginModal())}
                >
                  Sign In to View Saved Cart
                </button>
              )}
            </div>
          ) : (
            /* Filled Cart Table & Order Summary */
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="site-blocks-table table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="product-thumbnail text-center" style={{ width: "120px" }}>
                            <img
                              src={item.img}
                              alt={item.title}
                              className="img-fluid rounded"
                              style={{ maxHeight: "80px", objectFit: "contain" }}
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black mb-0">{item.title}</h2>
                          </td>
                          <td>{formatCurrency(item.price)}</td>
                          <td style={{ width: "160px" }}>
                            <div
                              className="input-group mb-3 d-flex align-items-center quantity-container"
                              style={{ maxWidth: "140px" }}
                            >
                              <button
                                className="btn btn-outline-black decrease"
                                type="button"
                                onClick={() => dispatch(decrementItem(item.id))}
                                title="Decrease quantity"
                              >
                                &minus;
                              </button>
                              <input
                                type="number"
                                min="1"
                                className="form-control text-center quantity-amount"
                                value={item.qty}
                                onChange={(e) =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      qty: parseInt(e.target.value) || 1,
                                    })
                                  )
                                }
                                aria-label="Item quantity"
                              />
                              <button
                                className="btn btn-outline-black increase"
                                type="button"
                                onClick={() => dispatch(incrementItem(item.id))}
                                title="Increase quantity"
                              >
                                &#43;
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">{formatCurrency(item.totalPrice)}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-black btn-sm"
                              onClick={() => dispatch(removeFromCart(item.id))}
                              title="Remove item"
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cart Action Buttons & Subtotal Card */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="row mb-5">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <Link to="/shop" className="btn btn-outline-black btn-sm btn-block w-100">
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm btn-block w-100"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to empty your cart?")) {
                            dispatch(clearCart());
                          }
                        }}
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 pl-5">
                  <div className="row justify-content-end">
                    <div className="col-md-9">
                      <div className="card shadow-sm border-0 bg-light p-4">
                        <h4 className="text-black text-uppercase h5 border-bottom pb-2">
                          Cart Totals
                        </h4>

                        <div className="row mb-3 mt-3">
                          <div className="col-md-6">
                            <span className="text-black">Items count</span>
                          </div>
                          <div className="col-md-6 text-end">
                            <strong className="text-black">{totalQuantity}</strong>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <span className="text-black">Shipping</span>
                          </div>
                          <div className="col-md-6 text-end">
                            <strong className="text-success">Free</strong>
                          </div>
                        </div>

                        <div className="row mb-5 border-top pt-3">
                          <div className="col-md-6">
                            <span className="text-black fw-bold">Order Total</span>
                          </div>
                          <div className="col-md-6 text-end">
                            <strong className="text-black fs-5">
                              {formatCurrency(totalAmount)}
                            </strong>
                          </div>
                        </div>

                        <button
                          className="btn btn-black btn-lg py-3 btn-block w-100"
                          type="button"
                          onClick={handleCheckout}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {orderConfirmation && (
        <div
          className="modal-backdrop-custom d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4 p-md-5 rounded-4 shadow-lg text-center position-relative"
            style={{ maxWidth: "460px", width: "90%" }}
          >
            <div
              className="rounded-circle bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: "70px", height: "70px", fontSize: "2rem" }}
            >
              <i className="fa fa-check"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">Order Confirmed!</h3>
            <p className="text-muted small mb-4">
              Thank you, <strong className="text-dark">{orderConfirmation.customer}</strong>! Your modern interior furnishings order has been received and is being prepared.
            </p>

            <div className="bg-light p-3 rounded-3 text-start mb-4">
              <div className="d-flex justify-content-between mb-1 small">
                <span className="text-muted">Order ID:</span>
                <span className="fw-bold text-dark font-monospace">{orderConfirmation.orderId}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 small">
                <span className="text-muted">Total Items:</span>
                <span className="fw-bold text-dark">{orderConfirmation.totalQuantity} items</span>
              </div>
              <div className="d-flex justify-content-between small border-top pt-2 mt-2">
                <span className="fw-bold text-dark">Amount Paid:</span>
                <span className="fw-bold text-success fs-6">{formatCurrency(orderConfirmation.totalAmount)}</span>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary flex-grow-1 py-2"
                onClick={() => {
                  setOrderConfirmation(null);
                  navigate("/shop");
                }}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary flex-grow-1 py-2"
                onClick={() => {
                  setOrderConfirmation(null);
                  navigate("/");
                }}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

