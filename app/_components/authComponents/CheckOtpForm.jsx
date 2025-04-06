"use client";
import { usePhoneContext } from "@/app/_context/PhoneNumberContext";
import { useCheckOtp } from "@/app/_hooks/useCheckOtp";
import { useGetOtp } from "@/app/_hooks/UseGetOtp";
import Button from "@/app/_ui/Button";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { RingLoader } from "react-spinners";
import OtpTimer from "./OtpTimer";
import { RESET_TIME } from "@/app/_utils/constants";

function CheckOtpForm() {
  const [otp, setOtp] = useState("");
  const { phoneNumber, updateNumber, time, setTime, updateStep } =
    usePhoneContext();
  const { isChecking, checkingOtp } = useCheckOtp();
  const { sendOtp } = useGetOtp();
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval((time) => {
      time > 0 && setTime((t) => t - 1);
    }, 1000);
    return clearInterval(timer);
  }, [time]);

  function onBack() {
    updateStep((s) => s - 1);
    updateNumber("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { user, message } = await checkingOtp({ phoneNumber, otp });
      toast.success(message);
      user?.isActive ? router.push("/") : router.push("/profile");
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده");
    }
  }

  function onSendOtpAgain() {
    sendOtp(phoneNumber);
    setOtp("");
    setTime(RESET_TIME);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between text-secondary-800">
        <p>شماره {toPersianDigits(phoneNumber)} اشتباه است؟</p>
        <ButtonIcon variant="outline" onClick={onBack} className="py-1 px-3">
          ویرایش
        </ButtonIcon>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          shouldAutoFocus
          containerStyle="flex gap-x-2 flex-row-reverse ju"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
          }}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} className="" />}
        />

        <Button type="submit">{isChecking ? <RingLoader /> : "تایید"}</Button>
      </form>

      <OtpTimer onClick={onSendOtpAgain} />
    </div>
  );
}

export default CheckOtpForm;
