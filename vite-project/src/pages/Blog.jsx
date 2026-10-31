/**
 * Blog Page
 *
 * Article listings and design inspirations for modern interior living.
 */

import React from "react";
import HeroBanner from "../components/common/HeroBanner";
import BlogSection from "../components/features/BlogSection";
import TestimonialSlider from "../components/features/TestimonialSlider";

export function Blog() {
  return (
    <div className="blog-page">
      {/* Hero Header */}
      <HeroBanner
        title="Interior Design & Living Blog"
        subtitle="Insights, arrangement guides, and decor tips from our master craftsmen and interior stylists."
        primaryBtnText="Shop Trends"
        primaryBtnLink="/shop"
        secondaryBtnText="Explore Services"
        secondaryBtnLink="/services"
      />

      {/* Blog Articles Grid */}
      <BlogSection title="Latest Editorial Stories" showViewAll={false} />

      {/* Testimonials */}
      <TestimonialSlider />
    </div>
  );
}

export default Blog;

