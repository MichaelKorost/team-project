import "./DonateDetailsModal.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import HospitalMap from "../../HospitalMap/HospitalMap";
import { AppointmentContext } from "../../../contexts/AppointmentContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../AuthContext";

const DonateDetailsModal = ({ isOpen, onCloseModal }) => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useContext(AuthContext);
  const { hospitalName } = useContext(AppointmentContext);

  useEffect(() => {
    return async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      setUserInfo(docUser.data());
    };
  }, []);

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
                  <p className="details-main__answer">{userInfo.appointment}</p>
                </div>
                <div className="details-main__info-box">
                  <p className="details-main__question">Where:</p>
                  <p className="details-main__answer">{hospitalName}</p>
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
