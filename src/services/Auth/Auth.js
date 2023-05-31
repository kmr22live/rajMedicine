// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNaCqO50fQICJGHf4bV6QaqNNOboT1fjo",
  authDomain: "ecommerse-medicine.firebaseapp.com",
  projectId: "ecommerse-medicine",
  storageBucket: "ecommerse-medicine.appspot.com",
  messagingSenderId: "390711638329",
  appId: "1:390711638329:web:b375ceb3b09e101e5e50e8",
  measurementId: "G-VS6KCCR31J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
