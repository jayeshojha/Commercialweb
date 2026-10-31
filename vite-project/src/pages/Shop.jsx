/**
 * Shop Page
 *
 * Full product catalog page featuring live category filtering,
 * instant keyword search, and responsive product grids.
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeroBanner from "../components/common/HeroBanner";
import ProductCard from "../components/shop/ProductCard";
import {
  setProducts,
  setCategory,
  setSearchTerm,
} from "../redux/slices/productSlice";
import { fetchProductsFromFirestore } from "../services/firestoreService";

const categories = ["All", "Chairs", "Sofas", "Tables"];

export function Shop() {
  const dispatch = useDispatch();
  const { filteredItems, selectedCategory, searchTerm } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    async function loadData() {
      const items = await fetchProductsFromFirestore();
      dispatch(setProducts(items));
    }
    loadData();
  }, [dispatch]);

  return (
    <div className="shop-page">
      {/* Hero Header */}
      <HeroBanner
        title="Shop Modern Furniture"
        subtitle="Explore our curated collection of Scandinavian chairs, studio sofas, and handcrafted tables."
        showButtons={false}
      />

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          {/* Controls Bar: Search & Category Filters */}
          <div className="row align-items-center mb-5 g-3">
            {/* Category Filter Buttons */}
            <div className="col-12 col-md-7">
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => dispatch(setCategory(cat))}
                    className={`btn btn-sm ${
                      selectedCategory === cat
                        ? "btn-secondary text-white"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword Search Input */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fa fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search furniture by name..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Product Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="row">
              {filteredItems.map((product) => (
                <div
                  key={product.id}
                  className="col-6 col-md-4 col-lg-3 mb-4 mb-md-5"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">No furniture matches found.</h4>
              <p className="text-muted small">
                Try searching for a different keyword or selecting &quot;All&quot; categories.
              </p>
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() => {
                  dispatch(setCategory("All"));
                  dispatch(setSearchTerm(""));
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
