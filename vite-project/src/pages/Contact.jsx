/**
 * Contact Us Page
 *
 * Contact details (address, email, phone) and an interactive customer inquiry form.
 */

import React, { useState } from "react";
import HeroBanner from "../components/common/HeroBanner";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <HeroBanner
        title="Contact Us"
        subtitle="Have questions about custom orders, dimensions, or shipping timelines? Reach out to our design consultants."
        showButtons={false}
      />

      <div className="untree_co-section">
        <div className="container">
          <div className="block">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8 pb-4">
                {/* Contact Info Badges */}
                <div className="row mb-5 text-center">
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="service no-shadow p-3 border rounded bg-white">
                      <div className="service-icon mb-3 text-primary fs-3">
                        <i className="fa fa-map-marker-alt"></i>
                      </div>
                      <div className="service-contents">
                        <p className="mb-0 small">
                          43 Raymouth Rd. Baltemoer, London 3910
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="service no-shadow p-3 border rounded bg-white">
                      <div className="service-icon mb-3 text-primary fs-3">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <div className="service-contents">
                        <p className="mb-0 small">info@yourfurnidomain.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="service no-shadow p-3 border rounded bg-white">
                      <div className="service-icon mb-3 text-primary fs-3">
                        <i className="fa fa-phone"></i>
                      </div>
                      <div className="service-contents">
                        <p className="mb-0 small">+1 294 3925 3922</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Success Alert */}
                {submitted && (
                  <div className="alert alert-success" role="alert">
                    Thank you for your message! Our customer support team will reply within 24 hours.
                  </div>
                )}

                {/* Inquiry Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="text-black mb-1">First name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label className="text-black mb-1">Last name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black mb-1">Email address</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="text-black mb-1">Message</label>
                    <textarea
                      required
                      className="form-control"
                      rows="5"
                      placeholder="Tell us about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary-hover-outline">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

