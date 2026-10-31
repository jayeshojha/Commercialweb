/**
 * Home Page
 *
 * Landing page combining HeroBanner, featured products, Why Choose Us,
 * interior design craftsmanship highlights, popular items, testimonials, and blog previews.
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeroBanner from "../components/common/HeroBanner";
import ProductGrid from "../components/shop/ProductGrid";
import WhyChooseUs from "../components/features/WhyChooseUs";
import WeHelpSection from "../components/features/WeHelpSection";
import PopularProducts from "../components/features/PopularProducts";
import TestimonialSlider from "../components/features/TestimonialSlider";
import BlogSection from "../components/features/BlogSection";
import { setProducts } from "../redux/slices/productSlice";
import { fetchProductsFromFirestore } from "../services/firestoreService";

export function Home() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.items);

  // Load products from Cloud Firestore (or local initial catalog)
  useEffect(() => {
    async function loadData() {
      const items = await fetchProductsFromFirestore();
      dispatch(setProducts(items));
    }
    loadData();
  }, [dispatch]);

  // Personalize title if user is logged in
  const heroTitle = isAuthenticated
    ? `Welcome back, ${user?.displayName || "Friend"}!`
    : "Modern Interior Design Studio";

  return (
    <div className="home-page">
      {/* Dynamic Hero Banner */}
      <HeroBanner
        title={heroTitle}
        subtitle="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."
        primaryBtnText="Shop Now"
        primaryBtnLink="/shop"
        secondaryBtnText="Explore"
        secondaryBtnLink="/services"
      />

      {/* Featured Products Showcase with Intro Column */}
      <ProductGrid
        products={products}
        limit={3}
        showIntro={true}
        introTitle="Crafted with excellent material."
        introText="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."
        introLink="/shop"
        introLinkText="Explore All"
      />

      {/* Why Choose Us Features */}
      <WhyChooseUs showImage={true} />

      {/* Modern Interior Design Craftsmanship Grid */}
      <WeHelpSection />

      {/* Popular Products Row */}
      <PopularProducts />

      {/* Customer Testimonial Slider */}
      <TestimonialSlider />

      {/* Recent Blog Posts */}
      <BlogSection title="Recent Blog" showViewAll={true} />
    </div>
  );
}

export default Home;

