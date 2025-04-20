import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
    authDomain: "techkisan-c0700.firebaseapp.com",
    projectId: "techkisan-c0700",
    storageBucket: "techkisan-c0700.firebasestorage.app",
    messagingSenderId: "90972175432",
    appId: "1:90972175432:web:1934c39c8109d01babac7d",
    measurementId: "G-9S7W9G8Z2Y"
  };

// Initialize Firebase (For React)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
