import React, { createContext, useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDom2Uzz959IUgISyr8Ok9Qnl0PZM7PyyA",
  authDomain: "smartsciar-c97f9.firebaseapp.com",
  projectId: "smartsciar-c97f9",
  storageBucket: "smartsciar-c97f9.firebasestorage.app",
  messagingSenderId: "113364804691",
  appId: "1:113364804691:web:2283bdfe1a029ee885d2a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

// Create Context
const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch user profile from Firestore
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      if (initializing) setInitializing(false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Sign up function with profile creation
  const signup = async (email, password, name, studentClass) => {
    try {
      setLoading(true);

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user display name
      await updateProfile(user, {
        displayName: name,
      });

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        name: name,
        class: studentClass,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        profileComplete: true,
      });

      // Fetch the newly created profile
      await fetchUserProfile(user.uid);

      setLoading(false);
      return { success: true, user };
    } catch (error) {
      setLoading(false);
      let errorMessage = "An error occurred during signup";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        default:
          errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user profile
      await fetchUserProfile(user.uid);

      setLoading(false);
      return { success: true, user };
    } catch (error) {
      setLoading(false);
      let errorMessage = "An error occurred during login";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        default:
          errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (!user) {
        return { success: false, error: "No user logged in" };
      }

      setLoading(true);

      // Update Firestore document
      await updateDoc(doc(db, "users", user.uid), {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // If name is being updated, also update Firebase Auth profile
      if (updates.name) {
        await updateProfile(user, {
          displayName: updates.name,
        });
      }

      // Refresh user profile
      await fetchUserProfile(user.uid);

      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      return { success: false, error: error.message };
    }
  };

  // Get current user profile
  const getUserProfile = async (uid = null) => {
    try {
      const userId = uid || user?.uid;
      if (!userId) {
        return { success: false, error: "No user ID provided" };
      }

      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: "User profile not found" };
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    initializing,
    signup,
    login,
    logout,
    updateUserProfile,
    getUserProfile,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
