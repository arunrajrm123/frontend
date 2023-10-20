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
import { SignalCellularNullOutlined } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminBookingView() {
  const [slots, setSlots] = useState([]);
  const [noSlot, setNoslot] = useState(false);

  useEffect(() => {
    axiosInstance.get("adminbooking/").then((res) => {
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
        Bookings
      </Typography>
      <Container>
        {noSlot ? (
          <Alert className="text-center justify-content-center" severity="info">
            No Slots Available
          </Alert>
        ) : (
          <List>
            {slots.map((slot) => (
              <div style={{ border: "3px solid black" }}>
                <ListItem key={slot.id} divider>
                  <ListItemText
                    primary={`Date: ${slot.appointment.appointment_date}`}
                    secondary={`Time: ${slot.appointment.appointment_time}`}
                  />

                  <button style={{ backgroundColor: "green" }}>
                    {" "}
                    {`Trainer: ${slot.trainer.trainer_name}`}
                  </button>
                  <button
                    style={{
                      backgroundColor: "blue",
                      textColor: "black",
                    }}
                  >
                    {" "}
                    {`User: ${slot.user_data.name}`}
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

export default AdminBookingView;
