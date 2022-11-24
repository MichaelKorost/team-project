import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ProfileForm from "../../profileForm/ProfileForm";

const DonateDetailsModal = ({ onOpenModal, onCloseModal, isOpen }) => {
  const cancelHandler = () => {
    onCloseModal();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={cancelHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Profile"}</DialogTitle>
        <DialogContent
          style={{
            maxWidth: "500px",
            width: "90%",
            minHeight: "560px",
          }}
        >
          <DialogContent>
            <div className="">
              <ProfileForm onCloseModal={cancelHandler} />
            </div>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonateDetailsModal;
