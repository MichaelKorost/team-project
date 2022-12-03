import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [dateString, setDateString] = useState(""); //ctx
  const [timeString, setTimeString] = useState(""); //ctx
  const [isConfirmed, setIsConfirmed] = useState(false); //ctx
  const [confirmedDate, setConfirmedDate] = useState(""); //ctx
  const [hospitalName, setHospitalName] = useState("*hospital name*"); // using useState here to pass down setHospitalName to HospitalMap. only going down 1lvl so i guess it's pretty pointless to use context just for that...
  const [isEditOpen, setIsEditOpen] = useState(false);
  const value = {
    dateString,
    setDateString,
    timeString,
    setTimeString,
    isConfirmed,
    setIsConfirmed,
    confirmedDate,
    setConfirmedDate,
    hospitalName,
    setHospitalName,
    isEditOpen,
    setIsEditOpen,
  };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
