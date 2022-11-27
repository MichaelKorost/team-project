import { initializeApp } from "firebase/app"; // V9
import {
  getAuth,
  createUserWithEmailAndPassword, // BUILT-IN SIGNUP
  signInWithEmailAndPassword, // BUILT-IN LOGIN
} from "firebase/auth"; // V9

import {
  serverTimestamp,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init auth

const auth = getAuth(app);
const db = getFirestore(); //if doesnt work add\remove app not as parameter it crashes not finding firebase...
export const storage = getStorage(app); //added for image uploading
export default app;

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  setDoc,
  updateDoc,
};
