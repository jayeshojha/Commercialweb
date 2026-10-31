/**
 * About Us Page
 *
 * Details company story, core values, team leadership, and client testimonials.
 */

import React from "react";
import HeroBanner from "../components/common/HeroBanner";
import WhyChooseUs from "../components/features/WhyChooseUs";
import TeamSection from "../components/features/TeamSection";
import TestimonialSlider from "../components/features/TestimonialSlider";

export function About() {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <HeroBanner
        title="About Us"
        subtitle="We build timeless, sustainable furniture that turns every living space into a warm, modern sanctuary."
        primaryBtnText="Explore Shop"
        primaryBtnLink="/shop"
        secondaryBtnText="Our Services"
        secondaryBtnLink="/services"
      />

      {/* Why Choose Us Values */}
      <WhyChooseUs showImage={true} />

      {/* Leadership & Design Team */}
      <TeamSection />

      {/* Client Testimonials */}
      <TestimonialSlider />
    </div>
  );
}

export default About;

