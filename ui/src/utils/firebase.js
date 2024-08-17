// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD83tlMn73r9da0SY7bwo0Vl-ghHW22xw",
  authDomain: "oauth-curd.firebaseapp.com",
  projectId: "oauth-curd",
  storageBucket: "oauth-curd.appspot.com",
  messagingSenderId: "310034893071",
  appId: "1:310034893071:web:873550a15264880e78167a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
