import { useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  db,
  doc,
  serverTimestamp,
  setDoc,
} from "./firebase/firebaseConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        firstName: null,
        lastName: null,
        dob: null,
        bloodType: null,
        phoneNumber: null,
        bloodType: null,
        hmo: null,
        photoURL: null,
        appointment: null,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsLoading(false);
  };
  // david's method
  // const logout = async() => {
  // await auth.signOut()
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(false);
      // console.log("onAuthStateChanged :: new user data is:", currentUser);
      setUser(currentUser);
      //   localstorage to keep to user in session instantly instead of awaiting
      localStorage.setItem("user", JSON.stringify(currentUser));
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
