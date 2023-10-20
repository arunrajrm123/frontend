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

function Avilableslots() {
  const [slots, setSlots] = useState([]);
  const [noSlot, setNoslot] = useState(false);
  const { id } = useParams();
  const handlebook = (aid) => {
    const det = localStorage.getItem("details");
    const dets = JSON.parse(det);
    const id = dets.id;
    const data = {
      id: id,
      apid: aid,
    };
    console.log(data);
    axiosInstance.post("bookingslots/", data).then((res) => {
      alert("successfully booked");
    });
  };
  useEffect(() => {
    const datas = {
      tid: id,
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("userslotview/", datas);
        if (response.data.message == "no slots available") {
          setNoslot(true);
          console.log("No slots are available");
        } else {
          setNoslot(false);
          setSlots(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointment slots: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        className="text-center justify-content-center"
      >
        Appointment Slots
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
                    primary={`Date: ${slot.date}`}
                    secondary={`Time: ${slot.time}`}
                  />
                  <button onClick={() => handlebook(slot.id)}>Book</button>
                </ListItem>
              </div>
            ))}
          </List>
        )}
      </Container>
    </div>
  );
}

export default Avilableslots;
