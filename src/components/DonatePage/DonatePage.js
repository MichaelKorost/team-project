import './DonatePage.css';
import ResponsiveAppBar from '../Navbar/Navbar';
import Calendar from '../Calendar/Calender';
import { useContext, useEffect, useState } from 'react';
import TimeInput from '../TimeInput/TimeInput';
import { Button } from '@mui/material';
import AppointmentModal from '../Modals/AppointmentModal/AppointmentModal';
import DonateDetailsModal from '../Modals/DonateDetailsModal/DonateDetailsModal';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { useNavigate } from 'react-router-dom';
import HospitalMap from '../HospitalMap/HospitalMap';


// TODO: local storage date and time, so refresh wont reload appointment
// TODO: appnt saved into db or localStorage and is init val to date string
// TODO: add view donation details modal
// TODO: add navigation to back button
// TODO: add edit button for the chosen date

import "./DonatePage.css";
import ResponsiveAppBar from "../Navbar/Navbar";
import Calendar from "../Calendar/Calender";
import { useContext, useEffect, useState } from "react";
import TimeInput from "../TimeInput/TimeInput";
import { Button } from "@mui/material";
import AppointmentModal from "../Modals/AppointmentModal/AppointmentModal";
import DonateDetailsModal from "../Modals/DonateDetailsModal/DonateDetailsModal";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// TODO: add cancel appointment button
// save appointment string to userInfo
// replace left & right pane dependedcy state to userInfo.appointment
// profile page change button disabled state IAW userInfo.appointment
// merge the two panes

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

  const navigate = useNavigate();

  const [selectedDate, SetSelectedDate] = useState("");
  const [time, setTime] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hospitalName, setHospitalName] = useState("*hospital name*"); // using useState here to pass down setHospitalName to HospitalMap. only going down 1lvl so i guess it's pretty pointless to use context just for that...
  // view appointment details button
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { user } = useContext(AuthContext);
  // view appointment details button

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsOpen(true);
  };
  //   end if appointment details

  const updateProfile = async (confirmedAppointment) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { appointment: confirmedAppointment });
      setUserInfo({ ...userInfo, appointment: confirmedAppointment });
      console.log(docRef);
    }
  };
  useEffect(() => {
    console.log(user);
  }, []);

  const cancelHandler = () => {
    updateProfile(null);
  };

  useEffect(() => {
    return async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      console.log(docUser.data(), docUser.id);
      setUserInfo(docUser.data());
      console.log(userInfo);
    };
  }, [userInfo.appointment]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const profileButtonHandler = () => {
    navigate("/profile");
  };

  const modalAcceptHandler = () => {
    closeModal();
    setIsDateValid(false);
    // setIsConfirmed(true); //remove
    // updateProfile(appointment);
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
          {!userInfo.appointment ? (
            <>
              <h1 className='donate__title'>
                Available dates at {hospitalName}.
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
              <Button variant="text" onClick={cancelHandler}>
                Cancel
              </Button>
            </div>
          )}
        </section>
        <section className='donate-right-pane'>
          {isConfirmed ? (
            <>
              <h1 className='appointment__title'>
                {confirmedDate + ' AT ' + timeString}
              </h1>
              <div className='appointment__location'>
                <HospitalMap setHospitalName={setHospitalName} />
              </div>
              <Button onClick={profileButtonHandler}>Go to profile</Button>
            </>
          ) : (
            <>
              <h1 className='appointment__title'>No Appointment set, yet.</h1>
              <div className='appointment__location'>
                <HospitalMap setHospitalName={setHospitalName} />
              </div>
            </>
          )}
        </section>
        {userInfo.appointment && (
          <section className="donate-right-pane">
            {userInfo.appointment ? (
              <>
                <h1 className="appointment__title">
                  {/* {confirmedDate + " AT " + timeString} */}
                  {userInfo?.appointment || ""}
                </h1>
                <div className="appointment__location"></div>
                <Button onClick={profileButtonHandler}>Go to profile</Button>
              </>
            ) : (
              <>
                <h1 className="appointment__title">No Appointment set, yet.</h1>
                <div className="appointment__location"></div>
              </>
            )}
          </section>
        )}
        {isOpen && (
          <AppointmentModal
            isOpen={isOpen}
            onOpenModal={openModal}
            onCloseModal={closeModal}
            onAcceptModal={modalAcceptHandler}
            appointedDate={dateString}
            onUpdateProfile={updateProfile}
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
