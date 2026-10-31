/**
 * WhyChooseUs Component
 *
 * Renders the brand highlights (Fast Shipping, Easy Shopping, 24/7 Support, Returns)
 * with an optional side graphic.
 */

import React from "react";

const features = [
  {
    icon: "/images/truck.svg",
    title: "Fast & Free Shipping",
    description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: "/images/bag.svg",
    title: "Easy to Shop",
    description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: "/images/support.svg",
    title: "24/7 Support",
    description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
  {
    icon: "/images/return.svg",
    title: "Hassle Free Returns",
    description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.",
  },
];

export function WhyChooseUs({
  showImage = true,
  imageSrc = "/images/why-choose-us-img.jpg",
  title = "Why Choose Us",
  subtitle = "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.",
}) {
  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className={showImage ? "col-lg-6" : "col-lg-12"}>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}

            <div className="row my-5">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={`col-6 col-md-6 ${
                    !showImage ? "col-lg-3" : ""
                  } mb-4`}
                >
                  <div className="feature">
                    <div className="icon">
                      <img src={item.icon} alt={item.title} className="img-fluid" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showImage && (
            <div className="col-lg-5">
              <div className="img-wrap">
                <img
                  src={imageSrc}
                  alt="Why Choose Us"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;

