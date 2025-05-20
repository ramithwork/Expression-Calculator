import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXf12eBsccKUn2Iiwbvx1azSSkJkGReOI",
  authDomain: "expressioncal.firebaseapp.com",
  projectId: "expressioncal",
  storageBucket: "expressioncal.firebasestorage.app",
  messagingSenderId: "232300139247",
  appId: "1:232300139247:web:7b99655e91742abea5811a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);