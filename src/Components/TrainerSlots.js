import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import BasicExample from "./Nav";
import Footer from "./Footer";

function AppointmentSlots(props) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const det = localStorage.getItem("trainerdetails");
    const dets = JSON.parse(det);
    const id = dets.id;
    const datas = {
      tid: id,
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("myslots/", datas);

        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching appointment slots: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BasicExample />
      <Typography
        className="d-flex align-items-center"
        variant="h5"
        gutterBottom
        style={{ paddingTop: "100px" }}
      >
        Appointment Slots
      </Typography>
      <Paper elevation={3}>
        <List>
          {slots.map((slot) => (
            <ListItem key={slot.id} divider>
              <ListItemText
                primary={`Date: ${slot.date}`}
                secondary={`Time: ${slot.time}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default AppointmentSlots;
