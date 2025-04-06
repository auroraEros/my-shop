"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "@/app/_ui/RHFTextField";
import { usePhoneContext } from "@/app/_context/PhoneNumberContext";
import Button from "@/app/_ui/Button";
import { useEffect } from "react";
import { useGetOtp } from "@/app/_hooks/UseGetOtp";

const schema = Yup.object({
  phoneNumber: Yup.string()
    .required("شماره تلفن اجباری است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

function SendOtpForm() {
  const { phoneNumber, settingPhoneNumber, updateStep } =
    usePhoneContext();
  const { isPending, sendOtp } = useGetOtp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { phoneNumber },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({ phoneNumber });
  }, [phoneNumber, reset]);

  function onSubmit(data) {
    settingPhoneNumber(data.phoneNumber);
    sendOtp(data.phoneNumber, {
      onSuccess: () => {
        reset({ phoneNumber: "" });
        updateStep(2);
      },
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        type="tel"
        name="phoneNumber"
        label="شماره تلفن همراه خود را وارد کنید:"
        register={register}
        errors={errors}
        inputMode="numeric"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "در حال ارسال..." : "ارسال کد تایید"}
      </Button>
    </form>
  );
}

export default SendOtpForm;
