import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserSignupslice from "./Slices/UserSignup";
import UserLogin from "./Slices/UserLogin";
import AdLog from "./Slices/AdmLog";
import AdmHome from "./Slices/AdmHome";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import SignupTrainer from "./Slices/SignupTrainer";
import Trainerlogslice from "./Slices/Trainerlogslice";
import Catoslice from "./Slices/catogerySlice";
import courseSlice from "./Slices/courseSlice";
import Videouplaod from "./Slices/videouploadslice";
import { ToastContainer } from "react-toastify";

// Import the dotenv package

// Load environment variables from .env file

// Your other imports and application code go here...

const root = ReactDOM.createRoot(document.getElementById("root"));
const appstore = configureStore({
  reducer: {
    usersignup: UserSignupslice,
    userLogin: UserLogin,
    admlog: AdLog,
    admhome: AdmHome,
    signuptrainer: SignupTrainer,
    trainerlog: Trainerlogslice,
    catoslice: Catoslice,
    courseslice: courseSlice,
    videoupload: Videouplaod,
  },
});
export default appstore;
root.render(
  <React.StrictMode>
    <Provider store={appstore}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
