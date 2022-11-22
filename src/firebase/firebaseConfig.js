import { initializeApp } from 'firebase/app'; // V9
import {
  getAuth,
  createUserWithEmailAndPassword, // BUILT-IN SIGNUP
  signInWithEmailAndPassword, // BUILT-IN LOGIN
} from 'firebase/auth'; // V9

import {
  serverTimestamp,
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init auth

const auth = getAuth(app);
const db = getFirestore();

export default app;

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  serverTimestamp,
};
