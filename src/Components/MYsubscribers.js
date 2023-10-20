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

function Mysub() {
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
    const store = localStorage.getItem("trainerdetails");
    const par = JSON.parse(store);

    const datas = {
      tid: par.id,
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("mysubscribers/", datas);
        setSlots(response.data);
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
        MY subscribers
      </Typography>
      <Container>
        {
          <List>
            {slots.map((slot) => (
              <div style={{ border: "3px solid black" }}>
                <ListItem key={slot.id} divider>
                  <ListItemText
                    primary={`user: ${slot.user.user_name}`}
                    secondary={`email: ${slot.user.user_email}`}
                  />
                </ListItem>
              </div>
            ))}
          </List>
        }
      </Container>
    </div>
  );
}

export default Mysub;
