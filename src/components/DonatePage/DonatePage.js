import "./DonatePage.css";
import ResponsiveAppBar from "../Navbar/Navbar";
import Calendar from "../Calendar/Calender";
import { useContext, useEffect, useState } from "react";
import TimeInput from "../TimeInput/TimeInput";
import { Button } from "@mui/material";
import AppointmentModal from "../Modals/AppointmentModal/AppointmentModal";
import DonateDetailsModal from "../Modals/DonateDetailsModal/DonateDetailsModal";
import { AppointmentContext } from "../../contexts/AppointmentContext";

// TODO: local storage date and time, so refresh wont reload appointment
// TODO: appnt saved into db or localStorage and is init val to date string
// TODO: add view donation details modal
// TODO: add navigation to back button

const DonatePage = () => {
  const {
    dateString,
    setDateString,
    timeString,
    setTimeString,
    isConfirmed,
    setIsConfirmed,
    confirmedDate,
    setConfirmedDate,
  } = useContext(AppointmentContext);

  const [selectedDate, SetSelectedDate] = useState("");
  const [time, setTime] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // view appointment details button
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsOpen(true);
  };
  //   end if appointment details
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const backButtonHandler = () => {};

  const modalAcceptHandler = () => {
    closeModal();
    setIsDateValid(false);
    setIsConfirmed(true);
  };

  const calendarSelectedDate = (date) => {
    SetSelectedDate(date);

    const year = date?.getFullYear() || "";
    const month = date?.toLocaleString("en-US", { month: "numeric" }) || "";
    const day = date?.toDateString().slice(0, 3) || "";
    const dayNum = date?.toLocaleString("en-US", { day: "2-digit" }) || "";
    setDateString(
      `An appointment was set on ${day}, ${dayNum}/${month}/${year}.
      Confirm?`
    );
    setConfirmedDate(`${day}, ${dayNum}/${month}/${year}`);
  };

  const timeSelect = (timeData) => {
    setTime(timeData);
    const timeString = timeData.toLocaleString().slice(12, 17);
    setTimeString(timeString);
  };

  useEffect(() => {
    setIsDateValid(dateString !== "" && timeString !== "");
  }, [dateString, timeString]);

  return (
    <>
      <ResponsiveAppBar />
      <div className="donate-page-page">
        <section className="donate-left-pane">
          {!isConfirmed ? (
            <>
              <h1 className="donate__title">
                Available dates at *hospital name*.
              </h1>
              <Calendar onCalenderSelect={calendarSelectedDate} />
              <TimeInput onTimeSelect={timeSelect} />
              <Button
                disabled={!isDateValid}
                variant="text"
                className="donate__button"
                onClick={openModal}
              >
                Set appointment
              </Button>
            </>
          ) : (
            <div className="donate__confirm-message">
              <h1>An Appointment was set successfully!</h1>
              <Button
                variant="contained"
                className="donate__confirm-button"
                onClick={openDetailsModal}
              >
                view Appointment Details
              </Button>
            </div>
          )}
        </section>
        <section className="donate-right-pane">
          {isConfirmed ? (
            <>
              <h1 className="appointment__title">
                {confirmedDate + " AT " + timeString}
              </h1>
              <div className="appointment__location"></div>
              <Button onClick={backButtonHandler}>Back</Button>
            </>
          ) : (
            <>
              <h1 className="appointment__title">No Appointment set, yet.</h1>
              <div className="appointment__location"></div>
              <Button onClick={backButtonHandler}>Back</Button>
            </>
          )}
        </section>
        {isOpen && (
          <AppointmentModal
            isOpen={isOpen}
            onOpenModal={openModal}
            onCloseModal={closeModal}
            onAcceptModal={modalAcceptHandler}
            appointedDate={dateString}
          />
        )}
        {isDetailsOpen && (
          <DonateDetailsModal
            isOpen={isDetailsOpen}
            onCloseModal={closeDetailsModal}
            confirmedDate={confirmedDate}
            timeString={timeString}
            onOpenModal={openDetailsModal}
          />
        )}
      </div>
    </>
  );
};

export default DonatePage;
