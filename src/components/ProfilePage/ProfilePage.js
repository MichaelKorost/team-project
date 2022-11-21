import "./ProfilePage.css";
import { Button, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfilePage = () => {
  const [file, setFile] = useState("");
  return (
    <>
      <Navbar />
      <div className="profile-page-page">
        <section className="left-pane">
          <div className="profile-image-container">
            <img
              className="profile__image"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profile picture"
            />
            <Button
              variant="contained"
              component="label"
              className="profile__image-button"
            >
              <CameraAltIcon />
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
          <Button
            disabled={false}
            variant="contained"
            className="profile__appointment-button"
            style={{ margin: "auto" }}
          >
            View appointment details
          </Button>
        </section>
        <section className="right-pane"></section>
      </div>
    </>
  );
};

export default ProfilePage;
