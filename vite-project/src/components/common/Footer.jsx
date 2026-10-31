/**
 * Reusable Footer Component
 *
 * Provides newsletter subscription form, quick links,
 * social media links, and copyright info.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
      setNewsletterName("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer-section">
      <div className="container relative">
        {/* Decorative Sofa Image */}
        <div className="sofa-img">
          <img src="/images/sofa.png" alt="Sofa Decoration" className="img-fluid" />
        </div>

        {/* Newsletter Subscription Form */}
        <div className="row">
          <div className="col-lg-8">
            <div className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-1">
                  <img
                    src="/images/envelope-outline.svg"
                    alt="Envelope"
                    className="img-fluid"
                  />
                </span>
                <span>Subscribe to Newsletter</span>
              </h3>

              {subscribed ? (
                <div className="alert alert-success mt-3" role="alert">
                  Thank you for subscribing to our newsletter!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="row g-3">
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={newsletterName}
                      onChange={(e) => setNewsletterName(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary" title="Subscribe">
                      <span className="fa fa-paper-plane"></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <Link to="/" className="footer-logo">
                Furni<span>.</span>
              </Link>
            </div>
            <p className="mb-4">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl
              dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet
              dolor tempor tristique. Pellentesque habitant
            </p>

            <ul className="list-unstyled custom-social">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <span className="fa fa-brands fa-facebook-f"></span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <span className="fa fa-brands fa-twitter"></span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <span className="fa fa-brands fa-instagram"></span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <span className="fa fa-brands fa-linkedin"></span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="row links-wrap">
              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to="/about">About us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact us</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><a href="#support">Support</a></li>
                  <li><a href="#knowledge">Knowledge base</a></li>
                  <li><a href="#livechat">Live chat</a></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><a href="#jobs">Jobs</a></li>
                  <li><Link to="/about">Our team</Link></li>
                  <li><a href="#leadership">Leadership</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to="/shop">Nordic Chair</Link></li>
                  <li><Link to="/shop">Kruzo Aero</Link></li>
                  <li><Link to="/shop">Ergonomic Chair</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright notice - using dynamic React year */}
        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-6">
              <p className="mb-2 text-center text-lg-start">
                Copyright &copy; {new Date().getFullYear()}. All Rights Reserved. &mdash;
                Crafted with love for modern web standards.
              </p>
            </div>

            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto">
                <li className="me-4"><a href="#terms">Terms &amp; Conditions</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

