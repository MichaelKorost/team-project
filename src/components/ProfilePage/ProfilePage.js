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
            disabled={true}
            variant="contained"
            className="profile__appointment-button"
            style={{ margin: "auto" }}
          >
            View nearest appointment details
          </Button>
        </section>
        <section className="right-pane">
          <div className="profile-info">
            <h1 className="profile-info__fullname">Moti luchim, 39</h1>
            <div className="profile-info-box">
              <div className="profile-info-snippet">
                <label className="profile-info__category">First Name: </label>
                <p className="profile-info__output">Moti</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Last Name: </label>
                <p className="profile-info__output">Luchim</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Date of birth:</label>
                <p className="profile-info__output">14/08/1999</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Phone number: </label>
                <p className="profile-info__output">(+796) 50-796-2228</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Blood Type: </label>
                <p className="profile-info__output">A+</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Location: </label>
                <p className="profile-info__output">Tel-aviv, Israel</p>
              </div>
            </div>
            <Button variant="contained">Edit</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
