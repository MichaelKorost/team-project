import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./HomePage.css";
// import { AuthContext } from '../../AuthContext';
import LoadingPage from "../LoadingPage/LoadingPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { async } from "@firebase/util";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import MissingProfileModal from "../Modals/MissingProfileModal/MissingProfileModal";
// import { useContext } from 'react';

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  // TODO: if profile not filled button pop up modal - please complete profile
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      console.log(docUser.data());
      setUserInfo(docUser.data());
    };
  }, []);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const buttonClickHandler = () => {
    if (userInfo.bloodType) {
      navigate("/donate");
      return;
    }
    onOpenModal();
  };

  return (
    <>
      <Navbar />
      <div className="homepage-page">
        <div className="about">
          <h1 className="about__title">About us</h1>
          <p className="about__desc">
            <span className="about__desc-bold">Blood Buddy</span> is an App that
            makes donating blood effortless. <br /> Pick a date and we'll handle
            the rest 💞
          </p>
        </div>

        <div className="button-container">
          <button className="donate-button" onClick={buttonClickHandler}>
            I want to donate!
          </button>
        </div>
      </div>

      <MissingProfileModal
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default HomePage;
