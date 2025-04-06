import { useMutation } from "@tanstack/react-query";
import { getOtp } from "@/app/_lib/otpServices";
import { usePhoneContext } from "../_context/PhoneNumberContext";
import toast from "react-hot-toast";
import { RESET_TIME } from "../_utils/constants";

export function useGetOtp() {
  const { setTime } = usePhoneContext();
  const { isPending, mutate: sendOtp } = useMutation({
    mutationFn: getOtp,
    onSuccess: (data) => {
      toast.success(data.message);

      setTime(RESET_TIME);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطایی رخ داده");
    },
  });
  return { isPending, sendOtp };
}
