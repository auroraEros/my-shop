import http from "./httpService";

export async function getdOtp(data){
  return await http.post("/user/get-otp",data).then(({data})=>data.data)
}