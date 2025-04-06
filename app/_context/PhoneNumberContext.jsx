"use client";

import { createContext, useContext, useState } from "react";

export const PhoneNumberContext = createContext();

export function PhonNumberProvider({ children }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
}

export function usePhoneContext() {
  const context = useContext(PhoneNumberContext);
  if (context === undefined)
    throw new Error("phoneContext was used outside of PhoneNumberContext");
  return context;
}
