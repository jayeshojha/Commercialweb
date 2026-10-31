/**
 * Redux Slice for Product Catalog
 *
 * Stores loaded products, category filtering, search, and loading states.
 */

import { createSlice } from "@reduxjs/toolkit";
import { initialProducts } from "../../data/initialProducts";

const initialState = {
  items: initialProducts,
  filteredItems: initialProducts,
  selectedCategory: "All",
  searchTerm: "",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /** Set loaded products from Firestore */
    setProducts: (state, action) => {
      state.items = action.payload || [];
      state.filteredItems = action.payload || [];
      state.loading = false;
    },
    /** Set loading spinner state */
    setProductsLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },
    /** Set error message */
    setProductsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    /** Filter products by category (All, Chairs, Sofas, Tables) */
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    /** Search products by title keyword */
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
  },
});

function applyFilters(state) {
  let list = state.items;
  if (state.selectedCategory && state.selectedCategory !== "All") {
    list = list.filter((item) => item.category === state.selectedCategory);
  }
  if (state.searchTerm && state.searchTerm.trim() !== "") {
    const term = state.searchTerm.toLowerCase().trim();
    list = list.filter((item) =>
      item.title.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  }
  state.filteredItems = list;
}

export const {
  setProducts,
  setProductsLoading,
  setProductsError,
  setCategory,
  setSearchTerm,
} = productSlice.actions;

export default productSlice.reducer;

