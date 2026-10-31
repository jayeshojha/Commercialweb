/**
 * Services Page
 *
 * Highlights white-glove shipping, custom interior design consultation,
 * 24/7 client support, and product offerings.
 */

import React from "react";
import { useSelector } from "react-redux";
import HeroBanner from "../components/common/HeroBanner";
import WhyChooseUs from "../components/features/WhyChooseUs";
import ProductGrid from "../components/shop/ProductGrid";
import TestimonialSlider from "../components/features/TestimonialSlider";

export function Service() {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="services-page">
      {/* Hero Header */}
      <HeroBanner
        title="Our Services"
        subtitle="From space planning and interior design consultations to white-glove doorstep delivery."
        primaryBtnText="Shop Now"
        primaryBtnLink="/shop"
        secondaryBtnText="Contact Us"
        secondaryBtnLink="/contact"
      />

      {/* Full 4-Column Service Feature Cards */}
      <WhyChooseUs
        showImage={false}
        title="Comprehensive Interior & Furnishing Services"
        subtitle="Every service is calibrated to provide seamless end-to-end luxury from workshop to living room."
      />

      {/* Featured Products Showcase */}
      <ProductGrid
        products={products}
        limit={3}
        showIntro={true}
        introTitle="Crafted with excellent material."
        introText="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."
      />

      {/* Client Testimonials */}
      <TestimonialSlider />
    </div>
  );
}

export default Service;

