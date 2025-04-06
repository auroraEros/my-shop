"use client";

import SendOtpForm from "@/app/_components/authComponents/SendOtpForm";
import { usePhoneContext } from "@/app/_context/PhoneNumberContext";
import CheckOtpForm from "@/app/_components/authComponents/CheckOtpForm";

function Page() {
  const { step } = usePhoneContext();
  return (
    <div className="w-full sm:maw-w-sm flex justify-center items-center  ">
      {step === 1 ? <SendOtpForm />:step === 2 ?<CheckOtpForm />:null}
     
    </div>
  );
}

export default Page;
