import "./DonatePage.css";
import ResponsiveAppBar from "../Navbar/Navbar";
import Calendar from "../Calendar/Calender";
import { useEffect, useState } from "react";
import TimeInput from "../TimeInput/TimeInput";
import { Button } from "@mui/material";
import AppointmentModal from "../Modals/AppointmentModal/AppointmentModal";

const DonatePage = () => {
  const [selectedDate, SetSelectedDate] = useState("");
  const [dateString, setDateString] = useState("");
  const [time, setTime] = useState(null);
  const [timeString, setTimeString] = useState("");
  const [isDateValid, setIsDateValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalAcceptHandler = () => {};

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
          <h1 className="donate__title">Available dates at *hospital name*.</h1>
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
        </section>
        <section className="donate-right-pane"></section>
        {isOpen && (
          <AppointmentModal
            isOpen={isOpen}
            onOpenModal={openModal}
            onCloseModal={closeModal}
            onAcceptModal={modalAcceptHandler}
            appointedDate={dateString}
          />
        )}
      </div>
    </>
  );
};

export default DonatePage;
