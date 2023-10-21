import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/backend/",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: localStorage.getItem("authToken")
//   //       ? "Bearer " + JSON.parse(localStorage.getItem("authToken"))
//   //       : null,
//   //     accept: "application/json",
//   //   },
// });
const axiosInstance = axios.create({
  baseURL: "https://ant-space-fitness.azurewebsites.net/backend/",
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: localStorage.getItem("authToken")
  //     ? "Bearer " + JSON.parse(localStorage.getItem("authToken"))
  //     : null,
  //   accept: "application/json",
  // },
});

export default axiosInstance;
