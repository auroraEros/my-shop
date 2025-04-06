"use client";

import { createContext, useContext, useState } from "react";
import { RESET_TIME } from "../_utils/constants";

export const PhoneNumberContext = createContext();

export function PhonNumberProvider({ children }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESET_TIME);

  const settingPhoneNumber = (n) => setPhoneNumber(n);
  const updateStep = (s) => setStep(s);
  const updateOtpMessage = (m) => setOtpMessage(m);
  return (
    <PhoneNumberContext.Provider
      value={{
        phoneNumber,
        settingPhoneNumber,
        step,
        updateStep,
        otpMessage,
        updateOtpMessage,
        setTime,
        time,
      }}
    >
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
