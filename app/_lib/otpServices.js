import http from "./httpService";

export async function getOtp(phoneNumber) {
  return await http
    .post("/user/get-otp", { phoneNumber })
    .then(({ data }) => data.data);
}

// export async function checkOtp(data) {
//   return await http.post("/user/check-otp", data).then(({ data }) => data.data);
// }
export async function checkOtp(data) {
  return await http.post("/user/check-otp", data).then(({ data }) => data.data);
}
