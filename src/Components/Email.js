import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../axios/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import "./Email.css"; // Import the CSS file for styling
import "./Nav.css";
function Email() {
  const [otp, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    const cookieData = Cookies.get("signupotpdatas");
    const parsedData = JSON.parse(cookieData);

    try {
      if (parsedData.data.otp === otp) {
        const data = {
          otp: otp,
          name: parsedData.data.name,
          email: parsedData.data.email,
          phone: parsedData.data.phonenumber,
          password: parsedData.data.password,
        };

        // Make an API request to send OTP
        const response = await axiosInstance.post("mail/", data);
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setMessage("Entered OTP does not match the one sent");
      }
    } catch (error) {
      setMessage("Error sending OTP");
    }
  };

  return (
    <div className="email-container">
      <h1>Send OTP via Email</h1>
      <input
        type="number"
        placeholder="Enter your OTP"
        value={otp}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      <p className="message">{msg}</p>
    </div>
  );
}

export default Email;
