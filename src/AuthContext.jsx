import {useState, useEffect, createContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";

export const AuthContext = createContext();

export function AuthProvider({children}) {

	const register = async (email, password) => {
		console.log("trying to register", auth, email, password);
		createUserWithEmailAndPassword(auth, email, password);
	}

	const login = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
	}

	const logout = async () => {
		signOut(auth);
	}

	const [isLoading, setIsLoading] = useState(true);

	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (credentials) => {
			setIsLoading(false);
			console.log("onAuthStateChanged :: new user data is:", credentials);
			setUser(credentials);
		});
		return () => {
			unsubscribe();
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{user, register, login, logout, isLoading}}>
			{children}
		</AuthContext.Provider>
	);
}