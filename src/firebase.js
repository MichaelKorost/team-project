import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where} from "firebase/firestore";

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
export const db = getFirestore(app);

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
// const setCollection = async (collectionName, documentKey, data) => {
// 	const collectionRef = collection(db, collectionName);
// 	// setDoc can be awaited but returns undefined anyway
// 	try {
// 		await setDoc(doc(collectionRef, documentKey), data);
// 		return true;
// 	} catch (err) {
// 		return false;
// 	}
// }

// const getCollection = async (collectionName, documentKey) => {
// 	const docRef = doc(db, collectionName, documentKey);
// 	const docSnap = await getDoc(docRef);
// 	return docSnap.data();
// }

// export const setProfile = async (uid, data) => {
// 	console.log("setProfile ::", uid, data);
// 	return setCollection("profiles", uid, data);
// }

// export const getProfile = async (uid) => {
// 	return getCollection("profiles", uid);
// }

async function setCollection(collectionName, documentKey, data) {
	const collectionRef = collection(db, collectionName);
	// setDoc can be awaited but returns undefined anyway
	try {
		await setDoc(doc(collectionRef, documentKey), data);
		return true;
	} catch (err) {
		return false;
	}
}

async function getCollection(collectionName, documentKey) {
	const docRef = doc(db, collectionName, documentKey);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
}

async function queryCollection(collectionName, rule) {
	const ref = collection(db, collectionName);
	const results = await getDocs(query(ref, rule));
	const output = [];
	results.forEach(result => output.push(result.data()));
	return output;
}

export async function setProfile(user, data) {
	if (!user) {
		console.error("setProfile :: setProfile called but user was not defined");
		return false;
	}
	return await setCollection("profiles", user.uid, data);
}

export async function getProfile(user) {
	if (!user) {
		return false;
	}
	const data = await getCollection("profiles", user.uid);
	return data;
}

export async function queryProfiles(prop, relation, value) {
	return queryCollection("profiles", where(prop, relation, value));
}

// async function foo() {
// 	const ref = collection(db, "profiles");
// 	const q = query(ref, where("kupat_holim", "==", "Masterschool"));
// 	const results = await getDocs(q);
// 	results.forEach(result => console.log(result.data()));
// }foo();