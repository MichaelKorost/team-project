import "./ProfilePage.css";
import { Button, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="profile-page-page">
        <section className="left-pane"></section>
        <section className="right-pane"></section>
      </div>
    </>
  );
};

export default ProfilePage;
