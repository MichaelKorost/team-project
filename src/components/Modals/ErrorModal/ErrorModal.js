import "./ErrorModal.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ErrorModal = ({ onCloseModal, isModalOpen, errorMessage }) => {
  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={onCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Oops!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage.slice(16)}
          </DialogContentText>
        </DialogContent>
        <div>
          <Button onClick={onCloseModal}>Close</Button>
        </div>
      </Dialog>
    </>
  );
};

export default ErrorModal;
