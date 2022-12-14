import React, { useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function RequireProfile({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const get = async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      const data = docUser.data();
      setUserInfo(data);
      setIsLoading(false);
    };
    get();
  }, []);

  return isLoading ? (
    <span></span>
  ) : userInfo.bloodType ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

export default RequireProfile;
