import SendOtpForm from "../_components/authComponents/SendOtpForm";
import { PhonNumberProvider } from "@/app/_context/PhoneNumberContext";

function Page() {
  return (
    <PhonNumberProvider>
      <SendOtpForm />
    </PhonNumberProvider>
  );
}

export default Page;
