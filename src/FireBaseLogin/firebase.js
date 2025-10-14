// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYamLrP4ZlWMD-6EI0R_xqlaN4GeN0Uto",
  authDomain: "ecom-site-470c6.firebaseapp.com",
  projectId: "ecom-site-470c6",
  storageBucket: "ecom-site-470c6.firebasestorage.app",
  messagingSenderId: "644823307875",
  appId: "1:644823307875:web:4447fbf8dda261789a8a56",
//   measurementId: "G-GPF3386R52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}