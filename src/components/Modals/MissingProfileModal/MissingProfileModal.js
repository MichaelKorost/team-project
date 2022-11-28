import "./MissingProfileModal.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Link } from "react-router-dom";
// console.log("missing profile information, Please update profile");
const MissingProfileModal = ({ onCloseModal, isModalOpen }) => {
  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={onCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Missing Profile Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Before donating, please fill your profile information.
          </DialogContentText>
        </DialogContent>
        <div className="missingProfile__actions">
          <Button onClick={onCloseModal}>Close</Button>
          <Link className="missingProfile-actions__link" to="/profile">
            <Button onClick={onCloseModal} autoFocus>
              Go to profile
            </Button>
          </Link>
        </div>
      </Dialog>
    </>
  );
};

export default MissingProfileModal;
