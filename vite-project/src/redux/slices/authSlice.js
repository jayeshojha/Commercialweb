/**
 * Redux Slice for User Authentication and Login Modal Visibility
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Current logged in user profile (uid, email, displayName, photoURL, etc.)
  user: null,
  // Boolean indicating whether a valid user session is active
  isAuthenticated: false,
  // Controls visibility of the Login/Sign-In popup modal
  isLoginModalOpen: false,
  // Loading spinner indicator for async auth requests
  loading: false,
  // Error message string, if any
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Set user profile upon successful login or registration */
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.error = null;
      state.loading = false;
    },
    /** Clear user profile upon logout */
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    /** Open the login modal */
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    /** Close the login modal */
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
      state.error = null;
    },
    /** Toggle loading state during authentication processes */
    setAuthLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },
    /** Set error message for display */
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  openLoginModal,
  closeLoginModal,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;

