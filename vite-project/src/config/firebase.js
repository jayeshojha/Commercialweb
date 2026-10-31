/**
 * Firebase Configuration and Initialization Module
 *
 * Configures Firebase Authentication and Cloud Firestore for Commercial Web.
 * Loads credentials from .env with fallback to project defaults.
 *
 * Firebase console link: https://console.firebase.google.com/
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read configuration from Vite environment variables with project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCvcKkAPQkKPlbYYD1YmbQBbmlvKvUGFq0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "commercial-web-2de0c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "commercial-web-2de0c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "commercial-web-2de0c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "587238263307",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:587238263307:web:da16740f76be4598d9d50e",
};

export const isFirebaseConfigured = true;

// Initialize Firebase App as a singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

export default app;
