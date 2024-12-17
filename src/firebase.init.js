// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdV4HuBJfCdOcvuww2UvH4NyCYvAfrqYs",
  authDomain: "email-password-authentic-b6534.firebaseapp.com",
  projectId: "email-password-authentic-b6534",
  storageBucket: "email-password-authentic-b6534.firebasestorage.app",
  messagingSenderId: "848761914794",
  appId: "1:848761914794:web:7dc9b53a261062b58ad7d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;