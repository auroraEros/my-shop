"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { usePhoneContext } from "@/app/_context/PhoneNumberContext";
import Button from "@/app/_ui/Button";
import { useState } from "react";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";

function OtpTimer({ onClick }) {
  const { time } = usePhoneContext();
  const [remainingTime, setRemainingTime] = useState(0);
  return (
    <div className="flex flex-col gap-y-2 items-center mt-4">
      <CountdownCircleTimer
        isPlaying={time > 0}
        duration={Math.floor(time / 1000)}
        colors={["#3b82f6", "#ef4444"]}
        colorsTime={[90, 0]}
        size={50}
        strokeWidth={4}
        onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col gap-y-2 items-center">
            <span className="text-sm font-bold text-secondary-700">
              {toPersianDigits(Math.floor(remainingTime / 60))}:
              {remainingTime % 60 < 10 ? `${toPersianDigits(0)}` : ""}
              {toPersianDigits(remainingTime % 60)}
            </span>
          </div>
        )}
      </CountdownCircleTimer>
      <Button
        disabled={remainingTime > 0}
        onClick={onClick}
        className="py-1 px-3"
      >
        ارسال مجدد کد
      </Button>
    </div>
  );
}
export default OtpTimer;
