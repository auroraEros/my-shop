"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "@/app/_ui/RHFTextField";
import { usePhoneContext } from "@/app/_context/PhoneNumberContext";
import Button from "@/app/_ui/Button";
import { useEffect } from "react";

const schema = Yup.object({
  phoneNumber: Yup.string()
    .required("شماره تلفن اجباری است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

function SendOtpForm() {
  const { phoneNumber, setPhoneNumber } = usePhoneContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    initialValue: {phoneNumber},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({ phoneNumber })
  }, [phoneNumber, reset])


  function onSubmit(data) {
    setPhoneNumber(data.phoneNumber);
    reset();
  }
  return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          type="text"
          name="phoneNumber"
          label="شماره تلفن همراه خود را وارد کنید:"
          register={register}
          errors={errors}
         
        />
        <Button type="submit">ارسال</Button>
      </form>
    
  );
}

export default SendOtpForm;
