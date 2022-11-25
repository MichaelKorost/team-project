import { createContext } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const msg = "hi";
  const value = { msg };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
