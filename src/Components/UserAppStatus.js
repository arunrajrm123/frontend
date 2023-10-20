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
import { useParams } from "react-router-dom";
import { Cookie, SignalCellularNullOutlined } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function UserAappointmentStatus() {
  const [slots, setSlots] = useState([]);
  const [noSlot, setNoslot] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    const parsedData = JSON.parse(storedDetails);
    console.log(parsedData.id);
    const data = { id: parsedData.id };
    axiosInstance.post("mybookinstatus/", data).then((res) => {
      setSlots(res.data);
    });
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        className="text-center justify-content-center"
      >
        Appointment Status
      </Typography>
      <Container>
        <List>
          {slots &&
            slots.map((slot) => (
              <div style={{ border: "3px solid black" }}>
                <ListItem key={slot.id} divider>
                  <ListItemText
                    primary={`Time: ${slot.appointment.appointment_time}`}
                    secondary={`Date: ${slot.appointment.appointment_date}`}
                  />
                  <button
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    Booked
                  </button>
                  <button
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    {slot.trainer.trainer_name}
                  </button>
                </ListItem>
              </div>
            ))}
        </List>
      </Container>
    </div>
  );
}

export default UserAappointmentStatus;
