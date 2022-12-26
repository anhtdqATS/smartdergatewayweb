import axios from "axios";
import { BASE_URL } from "../Constants";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
let dataLogin = JSON.parse(localStorage.getItem("dataLogin"));
if (dataLogin !== null) {
  axiosInstance.defaults.headers.common["Authorization"] =
    "Bearer " + dataLogin.token;
}

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 ) {

//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
