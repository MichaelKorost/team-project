import "./DonateDetailsModal.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import HospitalMap from "../../HospitalMap/HospitalMap";

const DonateDetailsModal = ({ isOpen, onCloseModal, confirmedDate }) => {
  const handleClose = () => {
    onCloseModal();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        fullscreen="true"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Appointment Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContent variant="body1">
            <div className="modal-details__main">
              <section className="details-box">
                <div className="details-main__info-box">
                  <p className="details-main__question">When:</p>
                  <p className="details-main__answer">{confirmedDate}</p>
                </div>
                <div className="details-main__info-box">
                  <p className="details-main__question">Where:</p>
                  <p className="details-main__answer">hospital</p>
                </div>
              </section>
              <section className="details__map-container">
                <div className="temp-map">
                  <HospitalMap />
                </div>
              </section>
            </div>
          </DialogContent>
          <div className="modal-details__actions">
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonateDetailsModal;
