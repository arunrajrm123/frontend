// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZeHZ4fJ3OoAxX4NdE2tlpi0oNlBaeF8U",
  authDomain: "frontend-435a7.firebaseapp.com",
  projectId: "frontend-435a7",
  storageBucket: "frontend-435a7.appspot.com",
  messagingSenderId: "168668695072",
  appId: "1:168668695072:web:2e01561e814b19b28f4a45",
  measurementId: "G-JLL3YQ4RLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
