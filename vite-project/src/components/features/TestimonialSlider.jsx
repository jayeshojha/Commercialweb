/**
 * TestimonialSlider Component
 *
 * Modern, responsive testimonial carousel written in pure React.
 * Replaces fragile external unbundled tiny-slider script dependencies.
 */

import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    name: "Maria Jones",
    position: "CEO, Co-Founder, XYZ Inc.",
    img: "/images/person-1.png",
  },
  {
    id: 2,
    quote:
      "Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque. Fusce gravida sapien ac nisi pulvinar.",
    name: "David Smith",
    position: "Lead Architect, Studio M",
    img: "/images/person_2.jpg",
  },
  {
    id: 3,
    quote:
      "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Praesent nec diam eu dolor sodales aliquet. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh.",
    name: "Sophia Taylor",
    position: "Creative Director, DecoLife",
    img: "/images/person_3.jpg",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto text-center">
            <h2 className="section-title">Testimonials</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="testimonial-slider-wrap text-center position-relative">
              {/* Navigation Arrows */}
              <div
                className="testimonial-nav d-flex justify-content-between position-absolute w-100 top-50 start-0 translate-middle-y px-3"
                style={{ zIndex: 10, pointerEvents: "none" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle p-2"
                  style={{ pointerEvents: "auto", width: "45px", height: "45px" }}
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <span className="fa fa-chevron-left"></span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle p-2"
                  style={{ pointerEvents: "auto", width: "45px", height: "45px" }}
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <span className="fa fa-chevron-right"></span>
                </button>
              </div>

              {/* Active Testimonial Item */}
              <div className="item py-4">
                <div className="row justify-content-center">
                  <div className="col-lg-8 mx-auto px-4 px-md-5">
                    <div className="testimonial-block text-center">
                      <blockquote className="mb-5">
                        <p className="fs-5 fst-italic text-secondary">
                          &ldquo;{current.quote}&rdquo;
                        </p>
                      </blockquote>

                      <div className="author-info">
                        <div className="author-pic mb-3">
                          <img
                            src={current.img}
                            alt={current.name}
                            className="img-fluid rounded-circle"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <h3 className="font-weight-bold mb-1">{current.name}</h3>
                        <span className="position d-block mb-3 text-muted">
                          {current.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators / Dots */}
              <div className="d-flex justify-content-center gap-2 mt-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`btn p-0 rounded-circle ${
                      idx === currentIndex ? "bg-primary" : "bg-secondary opacity-50"
                    }`}
                    style={{ width: "12px", height: "12px", border: "none" }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;

