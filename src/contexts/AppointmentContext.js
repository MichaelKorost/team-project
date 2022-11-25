import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [dateString, setDateString] = useState(""); //ctx
  const [timeString, setTimeString] = useState(""); //ctx
  const [isConfirmed, setIsConfirmed] = useState(false); //ctx
  const [confirmedDate, setConfirmedDate] = useState(""); //ctx
  const value = {
    dateString,
    setDateString,
    timeString,
    setTimeString,
    isConfirmed,
    setIsConfirmed,
    confirmedDate,
    setConfirmedDate,
  };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
