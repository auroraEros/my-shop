import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "@/app/_lib/otpServices";

export function useCheckOtp() {
  const { isPending: isChecking, mutateAsync: checkingOtp } = useMutation({
    mutationFn: checkOtp,
  });
  return { isChecking, checkingOtp };
}
