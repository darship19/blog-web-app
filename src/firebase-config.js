// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtsB2A13dG0CQXgor3NhFObmPPl9ktzmY",
  authDomain: "blog-ca61b.firebaseapp.com",
  projectId: "blog-ca61b",
  storageBucket: "blog-ca61b.appspot.com",
  messagingSenderId: "191381051283",
  appId: "1:191381051283:web:0d174823f133f3713bba66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app); // Authentication
export const provider = new EmailAuthProvider(); // Email provider
export const storage = getStorage(app); // Firebase Storage
