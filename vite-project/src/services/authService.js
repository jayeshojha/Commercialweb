/**
 * Authentication Service
 *
 * Handles user sign-up, login, logout, and auth state listeners
 * using Firebase Authentication and Firestore user profiles.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../config/firebase";
import { saveUserToFirestore, getUserFromFirestore } from "./firestoreService";

// Local storage key for fallback session when Firebase is still being configured
const LOCAL_STORAGE_USER_KEY = "furni_active_user";

/**
 * Register a new user with Name, Email, and Password
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function registerWithFirebase(name, email, password) {
  try {
    if (!isFirebaseConfigured) {
      const mockUser = createLocalUser(name, email);
      return { user: mockUser, error: null };
    }

    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // 2. Update Firebase auth profile with display name
    await updateProfile(firebaseUser, { displayName: name });

    // 3. Create user document in Cloud Firestore
    const userProfile = {
      uid: firebaseUser.uid,
      displayName: name,
      email: firebaseUser.email,
      cart: [],
      createdAt: new Date().toISOString(),
    };

    await saveUserToFirestore(firebaseUser.uid, userProfile);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userProfile));

    return { user: userProfile, error: null };
  } catch (err) {
    console.error("Error registering user with Firebase:", err);

    // If API key is not activated or Authentication is not started in Firebase console yet,
    // allow user to continue in offline preview mode with their entered details
    if (isApiKeyOrAuthNotReady(err)) {
      console.warn("Firebase Auth is not enabled in Firebase Console yet. Using local session.");
      const localUser = createLocalUser(name, email);
      return { user: localUser, error: null };
    }

    return { user: null, error: formatAuthError(err) };
  }
}

/**
 * Sign in existing user with Email and Password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function loginWithFirebase(email, password) {
  try {
    if (!isFirebaseConfigured) {
      const demoUser = getOrCreateLocalUser(email);
      return { user: demoUser, error: null };
    }

    // 1. Sign in via Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // 2. Fetch extended user profile and cart from Cloud Firestore
    let userDoc = await getUserFromFirestore(firebaseUser.uid);

    if (!userDoc) {
      userDoc = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || email.split("@")[0],
        email: firebaseUser.email,
        cart: [],
      };
      await saveUserToFirestore(firebaseUser.uid, userDoc);
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userDoc));
    return { user: userDoc, error: null };
  } catch (err) {
    console.error("Error logging in with Firebase:", err);

    if (isApiKeyOrAuthNotReady(err)) {
      console.warn("Firebase Auth is not enabled in Firebase Console yet. Logging in with local session.");
      const localUser = getOrCreateLocalUser(email);
      return { user: localUser, error: null };
    }

    return { user: null, error: formatAuthError(err) };
  }
}

/**
 * Sign in with Google Popup
 * @returns {Promise<{user: object, error: string|null}>}
 */
export async function loginWithGoogle() {
  try {
    if (!isFirebaseConfigured) {
      const demoUser = createLocalUser("Google User", "user@gmail.com");
      return { user: demoUser, error: null };
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    let userDoc = await getUserFromFirestore(firebaseUser.uid);
    if (!userDoc) {
      userDoc = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "Google User",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || null,
        cart: [],
        createdAt: new Date().toISOString(),
      };
      await saveUserToFirestore(firebaseUser.uid, userDoc);
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userDoc));
    return { user: userDoc, error: null };
  } catch (err) {
    console.error("Error signing in with Google:", err);

    if (isApiKeyOrAuthNotReady(err)) {
      console.warn("Google Auth is not enabled in Firebase Console yet. Logging in via guest mode.");
      const demoUser = createLocalUser("Google User", "user@gmail.com");
      return { user: demoUser, error: null };
    }

    return { user: null, error: formatAuthError(err) };
  }
}

/**
 * Sign out the currently logged in user
 */
export async function logoutFirebase() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    return { success: true };
  } catch (err) {
    console.error("Error signing out:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribe to Auth state changes
 * Keeps user session active across page reloads
 * @param {Function} callback - Receives user profile or null
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuthChanges(callback) {
  const localSaved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (localSaved) {
    try {
      callback(JSON.parse(localSaved));
    } catch {
      // Ignore parse error
    }
  }

  if (!isFirebaseConfigured) {
    return () => {};
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDoc = await getUserFromFirestore(firebaseUser.uid);
        const resolved = userDoc || {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          cart: [],
        };
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(resolved));
        callback(resolved);
      } catch (err) {
        callback({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          cart: [],
        });
      }
    } else if (!localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      callback(null);
    }
  });
}

function createLocalUser(name, email) {
  const user = {
    uid: "user-" + Date.now(),
    displayName: name || email.split("@")[0],
    email: email,
    cart: [],
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  return user;
}

function getOrCreateLocalUser(email) {
  const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.email.toLowerCase() === email.toLowerCase()) {
        return parsed;
      }
    } catch {
      // Ignore parse error
    }
  }
  return createLocalUser(email.split("@")[0], email);
}

function isApiKeyOrAuthNotReady(err) {
  const msg = err?.message || "";
  const code = err?.code || "";
  return (
    code.includes("api-key-not-valid") ||
    code.includes("invalid-api-key") ||
    code.includes("operation-not-allowed") ||
    code.includes("unauthorized-domain") ||
    msg.includes("API key not valid") ||
    msg.includes("CONFIGURATION_NOT_FOUND")
  );
}

/**
 * Format error codes into clean user-facing alerts
 */
function formatAuthError(error) {
  const code = error?.code || "";
  const msg = error?.message || "";

  if (code.includes("api-key-not-valid") || msg.includes("API key not valid")) {
    return "Firebase Authentication is not activated yet in Firebase Console. Please click 'Get started' under Authentication in Firebase Console.";
  }
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled in your Firebase console.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completion.";
    case "auth/unauthorized-domain":
      return "This domain (localhost) is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.";
    default:
      return error.message || "An authentication error occurred. Please try again.";
  }
}
