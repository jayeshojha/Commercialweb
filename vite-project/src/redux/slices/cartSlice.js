/**
 * Redux Slice for Shopping Cart State Management
 *
 * Tracks cart items, total quantity badge count, total monetary cost,
 * and handles adding, updating, and removing items.
 */

import { createSlice } from "@reduxjs/toolkit";
import { parsePrice } from "../../utils/formatters";

/**
 * Recomputes total quantity and total dollar sum from current items
 */
function recalculate(state) {
  let qty = 0;
  let sum = 0;
  state.items.forEach((item) => {
    const itemQty = Number(item.qty) || 0;
    const unitPrice = parsePrice(item.price);
    qty += itemQty;
    sum += unitPrice * itemQty;
    item.totalPrice = unitPrice * itemQty;
  });
  state.totalQuantity = qty;
  state.totalAmount = sum;
}

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add product to cart or increment quantity if already in cart
     */
    addToCart: (state, action) => {
      const product = action.payload;
      const unitPrice = parsePrice(product.price);
      const existing = state.items.find((item) => String(item.id) === String(product.id));

      if (existing) {
        existing.qty = (Number(existing.qty) || 1) + 1;
        existing.totalPrice = unitPrice * existing.qty;
      } else {
        state.items.push({
          id: String(product.id),
          title: product.title,
          price: unitPrice,
          img: product.img,
          qty: 1,
          totalPrice: unitPrice,
        });
      }
      recalculate(state);
    },

    /**
     * Update quantity of an existing item in the cart
     * Payload: { id: string|number, qty: number }
     */
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const target = state.items.find((item) => String(item.id) === String(id));
      if (target) {
        const newQty = Number(qty);
        if (newQty <= 0) {
          state.items = state.items.filter((item) => String(item.id) !== String(id));
        } else {
          target.qty = newQty;
          const unitPrice = parsePrice(target.price);
          target.totalPrice = unitPrice * newQty;
        }
        recalculate(state);
      }
    },

    /**
     * Increment item quantity by 1
     */
    incrementItem: (state, action) => {
      const id = String(action.payload);
      const target = state.items.find((item) => String(item.id) === id);
      if (target) {
        target.qty += 1;
        const unitPrice = parsePrice(target.price);
        target.totalPrice = unitPrice * target.qty;
        recalculate(state);
      }
    },

    /**
     * Decrement item quantity by 1 (removes if reaches 0)
     */
    decrementItem: (state, action) => {
      const id = String(action.payload);
      const target = state.items.find((item) => String(item.id) === id);
      if (target) {
        if (target.qty > 1) {
          target.qty -= 1;
          const unitPrice = parsePrice(target.price);
          target.totalPrice = unitPrice * target.qty;
        } else {
          state.items = state.items.filter((item) => String(item.id) !== id);
        }
        recalculate(state);
      }
    },

    /**
     * Remove an item from the cart entirely
     * Payload: id
     */
    removeFromCart: (state, action) => {
      const id = String(action.payload);
      state.items = state.items.filter((item) => String(item.id) !== id);
      recalculate(state);
    },

    /**
     * Replace cart items with synchronized data (e.g. from Firestore or LocalStorage)
     */
    setCartFromFirebase: (state, action) => {
      const raw = Array.isArray(action.payload) ? action.payload : [];
      state.items = raw.map((item) => {
        const unitPrice = parsePrice(item.price);
        const qty = Number(item.qty) || 1;
        return {
          id: String(item.id),
          title: item.title,
          price: unitPrice,
          img: item.img,
          qty,
          totalPrice: unitPrice * qty,
        };
      });
      recalculate(state);
    },

    /**
     * Empty all items in the cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  incrementItem,
  decrementItem,
  removeFromCart,
  setCartFromFirebase,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

