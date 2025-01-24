import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3S4HMEjA43lQXzRLUcG0O0fN578XwYDY",
  authDomain: "elitefit-4ef76.firebaseapp.com",
  projectId: "elitefit-4ef76",
  storageBucket: "elitefit-4ef76.firebasestorage.app",
  messagingSenderId: "1003812769819",
  appId: "1:1003812769819:web:ebe1f6ef32dca2c47e68be",
  measurementId: "G-RHNXYVFL4W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export {
  app,
  auth,
  firestore,
  database,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  set,
};
