import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axios";
import BasicExample from "./Nav";
import Footer from "./Footer";

function SlotAdder() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const { id } = useParams();
  const handleAddSlot = () => {
    if (selectedDate && startTime) {
      const slot = {
        date: moment(selectedDate).format("YYYY-MM-DD"),
        startTime: moment(startTime, "HH:mm").format("HH:mm"),
      };
      const data = {
        uid: id,
        time: moment(startTime, "HH:mm").format("HH:mm"),
        date: moment(selectedDate).format("YYYY-MM-DD"),
      };
      axiosInstance.post("slot/", data).then((res) => {
        console.log(res.data);
        alert("Time slot added successfully");
      });
      // Add the slot to the list
      setTimeSlots([...timeSlots, slot]);

      // Clear the input fields
      setSelectedDate(null);
      setStartTime(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <BasicExample />
      <h1 style={{ paddingTop: "100px" }}>Add Date and Time Slots</h1>
      <div>
        <label>Select Date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>
      <div>
        <label>Start Time: </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <button onClick={handleAddSlot} style={{ margin: "20px 0" }}>
        Add Slot
      </button>

      <div>
        <h2>Time Slots</h2>
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>
              Date: {slot.date}, Start Time: {slot.startTime}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default SlotAdder;
