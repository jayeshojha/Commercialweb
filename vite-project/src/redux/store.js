/**
 * Redux Store Configuration
 *
 * Configures the central state store using modern Redux Toolkit (`configureStore`)
 * and registers auth, cart, and product slices.
 *
 * It also automatically syncs shopping cart updates to Cloud Firestore
 * whenever the authenticated user modifies their cart!
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import { syncCartToFirestore } from "../services/firestoreService";

// Custom Redux Middleware to automatically sync cart state to Cloud Firestore
const firestoreSyncMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // If action relates to modifying cart items, sync to Firestore
  if (action.type.startsWith("cart/")) {
    const state = store.getState();
    const currentUser = state.auth.user;
    if (currentUser?.uid) {
      syncCartToFirestore(currentUser.uid, state.cart.items);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allows Firebase User & Timestamp objects without false warnings
    }).concat(firestoreSyncMiddleware),
});

export default store;

