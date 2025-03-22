import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCIFd4tPwytclktjpQcsNsK8Amqfpeu0ac",
    authDomain: "techkisan-cb8d6.firebaseapp.com",
    projectId: "techkisan-cb8d6",
    storageBucket: "techkisan-cb8d6.firebasestorage.app",
    messagingSenderId: "593306424455",
    appId: "1:593306424455:web:763e69ae4c5ac3b9a61422",
    measurementId: "G-0HN0E8CQT2"
};

// Initialize Firebase (For React)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
