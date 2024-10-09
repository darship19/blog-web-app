// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,EmailAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new EmailAuthProvider();


