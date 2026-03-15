// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Correct spelling

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3U8cHCNsmarpTfjrUNOdUrrJsT_narBc",
  authDomain: "ai-trip-planner-2fc8f.firebaseapp.com",
  projectId: "ai-trip-planner-2fc8f",
  storageBucket: "ai-trip-planner-2fc8f.appspot.com",
  messagingSenderId: "775179138590",
  appId: "1:775179138590:web:4e5a172ccdc84d9274e00f",
  measurementId: "G-5QWZVET6XQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Correct spelling