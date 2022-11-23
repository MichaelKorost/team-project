import "./AppointmentModal.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AppointmentModal({
  onOpenModal,
  onCloseModal,
  onAcceptModal,
  isOpen,
  appointedDate,
}) {
  const openModalHandler = () => {
    onOpenModal();
  };

  const modalCancel = () => {
    onCloseModal();
  };

  const modalAccept = () => {
    onAcceptModal();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={modalCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Date"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {appointedDate}
          </DialogContentText>
          <div className="modal__actions">
            <Button onClick={modalCancel}>Go back</Button>
            <Button onClick={modalAccept} autoFocus>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
