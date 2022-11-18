import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, collection, doc, setDoc, getDoc} from "firebase/firestore";

// configs from /.env.local
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);

/* authentication functions */

export async function register(email, password) {
	try {
		const authData = await createUserWithEmailAndPassword(auth, email, password);
		return authData;
	} catch (err) {
		alert(err.message);
	}
}

export async function login(email, password) {
	try {
		const authData = await signInWithEmailAndPassword(auth, email, password);
		return authData;
	} catch (err) {
		alert(err.message);
	}
}

export async function logout() {
	try {
		const authData = await signOut(auth);
		return authData;
	} catch (err) {
		alert(err.message);
	}
}

/* database functions */

// generic set/get functions
const setCollection = async (collectionName, documentKey, entryData) => {
	const collectionRef = collection(db, collectionName);
	// setDoc can be awaited but returns undefined anyway
	try {
		await setDoc(doc(collectionRef, documentKey), entryData);
		return true;
	} catch (err) {
		return false;
	}
}

const getCollection = async (collectionName, documentKey) => {
	const docRef = doc(db, collectionName, documentKey);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
}

export const setProfile = async (uid, entry) => {
	return setCollection("profiles", uid, entry);
}

export const getProfile = async (uid) => {
	return getCollection("profiles", uid);
}