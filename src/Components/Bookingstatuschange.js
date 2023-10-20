import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { SignalCellularNullOutlined } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
function isToday(appointmentDate) {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  return formattedToday === appointmentDate;
}
function isDateGreaterThanOrEqualToToday(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  return inputDate >= currentDate;
}

function MyuerSlots() {
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const [noSlot, setNoslot] = useState(false);
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(" ");
  const handleStatusChange = () => {
    const det = localStorage.getItem("trainerdetails");
    const dets = JSON.parse(det);
    const id = dets.id;
    const data = {
      id: id,
    };
    axiosInstance.post("trainerdetails/").then((res) => {
      setSlots(res.data);
    });
  };

  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const handlefalse = (e) => {
    e.preventDefault();
    setFormVisible(false);
  };
  const handleSendLink = () => {
    setFormVisible(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      link: link,
    };
    axiosInstance.post("videochatlink/", data).then((res) => {
      alert("sucessfully send email");
    });
    setEmail("");
    setLink("");
    setFormVisible(false);
  };
  const handle = () => {
    const det = localStorage.getItem("trainerdetails");
    const dets = JSON.parse(det);
    const id = dets.id;
    const data = {
      id: id,
    };

    axiosInstance.post("trainerstatuschange", data).then((res) => {
      setSlots(res.data);
    });
  };
  const handlevideo = () => {
    navigate("/videocall");
  };
  useEffect(() => {
    const det = localStorage.getItem("trainerdetails");
    const dets = JSON.parse(det);
    const id = dets.id;
    const data = {
      id: id,
    };
    console.log(data);
    axiosInstance.post("myuserstatus/", data).then((res) => {
      if (res.data.message) {
        console.log("this is", res.data.message);
      } else {
        console.log(res.data);
        setSlots(res.data);
      }
    });
  }, []);
  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        className="text-center justify-content-center"
      >
        Bookings
      </Typography>

      <Container>
        {slots.length > 0 && (
          <button onClick={handleSendLink}>Send Link</button>
        )}
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Link:
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
            <button type="submit">Send</button>
            <button onClick={handlefalse}>cancel</button>
          </form>
        )}
        {slots.length === 0 ? (
          <Alert className="text-center justify-content-center" severity="info">
            No Bookings
          </Alert>
        ) : (
          <List>
            {slots &&
              slots.map((slot) => (
                <div style={{ border: "3px solid black" }} key={slot.id}>
                  <ListItem divider>
                    <ListItemText
                      primary={`Date: ${slot.appointment_date}`}
                      secondary={`Time: ${slot.appointment_time}`}
                    />
                    {isToday(slot.appointment_date) ? (
                      <button
                        onClick={handlevideo}
                        style={{ background: "blue" }}
                      >
                        Video Call
                      </button>
                    ) : (
                      <button style={{ background: "green" }}>Booked</button>
                    )}
                    <button style={{ background: "green" }}>
                      {slot.user_name}
                    </button>
                  </ListItem>
                </div>
              ))}
          </List>
        )}
      </Container>
    </div>
  );
}

export default MyuerSlots;
