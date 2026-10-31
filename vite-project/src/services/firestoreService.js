/**
 * Cloud Firestore Database Service
 *
 * Handles persistent database storage for:
 * - User profiles
 * - User cart synchronization across sessions
 * - Product catalog (reading from Firestore or fallback dataset)
 *
 * To enable Cloud Firestore after clicking 'Create database' in Firebase Console,
 * set VITE_ENABLE_FIRESTORE=true in your .env file.
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import { initialProducts } from "../data/initialProducts";

const USERS_COLLECTION = "users";
const PRODUCTS_COLLECTION = "products";

// Cloud Firestore is only called if explicitly enabled in .env, avoiding CORS & 404 connection loops
export const isFirestoreEnabled =
  isFirebaseConfigured && import.meta.env.VITE_ENABLE_FIRESTORE === "true";

/**
 * Save or update user profile document in Firestore (or local storage)
 * @param {string} uid - Firebase user ID
 * @param {object} userData - Profile information
 */
export async function saveUserToFirestore(uid, userData) {
  if (!uid) return;

  // Always persist locally
  try {
    localStorage.setItem(`furni_user_${uid}`, JSON.stringify(userData));
  } catch {
    // Ignore storage quota
  }

  if (!isFirestoreEnabled) return;

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(userRef, userData, { merge: true });
  } catch (err) {
    console.warn("Firestore: saveUser:", err?.message || err);
  }
}

/**
 * Fetch user document by user ID
 * @param {string} uid - Firebase user ID
 * @returns {Promise<object|null>}
 */
export async function getUserFromFirestore(uid) {
  if (!uid) return null;

  if (!isFirestoreEnabled) {
    try {
      const local = localStorage.getItem(`furni_user_${uid}`);
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  } catch {
    return null;
  }
}

/**
 * Synchronize the user's cart in Firestore
 * @param {string} uid - Firebase user ID
 * @param {Array} cartItems - Array of cart item objects
 */
export async function syncCartToFirestore(uid, cartItems) {
  if (!uid) return;

  // Always save locally
  try {
    localStorage.setItem(`furni_cart_${uid}`, JSON.stringify(cartItems));
  } catch {
    // Ignore storage quota
  }

  if (!isFirestoreEnabled) return;

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      cart: cartItems,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Firestore: syncCart:", err?.message || err);
  }
}

/**
 * Fetch products from Firestore `products` collection or local catalog
 * @returns {Promise<Array>} List of products
 */
export async function fetchProductsFromFirestore() {
  if (!isFirestoreEnabled) {
    return initialProducts;
  }

  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snap = await getDocs(productsRef);

    if (snap.empty) {
      await seedInitialProducts(productsRef);
      return initialProducts;
    }

    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    return items;
  } catch (err) {
    console.warn("Firestore: using fallback catalog:", err?.message || err);
    return initialProducts;
  }
}

/**
 * Helper to populate initial products in Firestore
 * @param {CollectionReference} productsRef
 */
async function seedInitialProducts(productsRef) {
  try {
    for (const item of initialProducts) {
      const itemDoc = doc(productsRef, String(item.id));
      await setDoc(itemDoc, item);
    }
    console.info("Firestore: Seeded initial products catalog successfully.");
  } catch (err) {
    console.warn("Firestore: Could not seed products:", err?.message || err);
  }
}
