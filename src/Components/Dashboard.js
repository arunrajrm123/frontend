import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBBtn,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import BasicExample from "./Nav";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import { storage } from "../fireconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [details, setuserDetails] = useState("");
  const [imageupload, setimageUplaod] = useState(null);
  const navigate = useNavigate();
  const handleapp = () => {
    const storedDetails = localStorage.getItem("details");
    const parsedData = JSON.parse(storedDetails);
    console.log(parsedData.id);
    const data = { id: parsedData.id };
    axiosInstance.post("mybookinstatus/", data).then((res) => {
      Cookies.set("mybookingstatus", JSON.stringify(res.data), { expires: 7 });
    });
    navigate("/appstatus");
  };
  const handleUpload = () => {
    if (imageupload == null) return;
    const imageRef = ref(storage, `images/${imageupload.name + v4()}`);
    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef); // Return the download URL promise
      })
      .then((url) => {
        console.log(url);
        const parsit = JSON.parse(localStorage.getItem("details"));
        const userid = parsit.id;
        console.log(userid);
        const datas = {
          imageurl: url,
          userid: userid,
        };
        axiosInstance
          .post("uploadimage/", datas)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("details", JSON.stringify(res.data.userdatas));
            setuserDetails(res.data.userdatas);
            // setimageUplaod(url); // Set the image URL to display in your component
          })
          .catch((err) => alert("Error in calling the Django view"));
      })
      .catch((err) => alert("Error on downloading URL"));
  };
  const handleImageError = (e) => {
    console.error("Error loading image:", e);
    console.log("Image source:", e.target.src);
  };

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      setuserDetails(parsedData);
      setimageUplaod(`http://127.0.0.1:8000${parsedData.image}`);
      console.log("hai parsed", storedDetails);
      console.log("image", parsedData.image);
    }
  }, []);
  const handles = (id) => {
    const datas = { id: id };
    axiosInstance.post("sdetails/", datas).then((res) => {
      console.log(res.data);
      Cookies.set("usersubscription", JSON.stringify(res.data), { expires: 7 });
    });
    navigate("/subscribedtrains");
  };
  return (
    <>
      <BasicExample />
      <div
        item
        xs={12}
        sm={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F8ECF9",
          paddingTop: "40px",
        }}
      >
        <Paper
          elevation={3}
          style={{ borderRadius: "0.5rem", padding: "16px", width: "80%" }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sm={4}
              style={{
                backgroundColor: "darkcyan",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                height: "80vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    className="profileimage"
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt="loading"
                    style={{
                      width: "100%", // Use a percentage value for the width
                      maxWidth: "100px", // Set a maximum width to prevent it from growing too large
                      height: "auto", // Maintain the aspect ratio while resizing
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Typography
                  variant="h3"
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "2rem",
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    overflow: "hidden", // Hide text overflow
                    textOverflow: "ellipsis",
                  }}
                >
                  {details.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => handleapp()}
                    type="button"
                    class="btn btn-sm btn-primary"
                  >
                    Button
                  </button>

                  <Button
                    onClick={() => handleapp()}
                    variant="contained"
                    style={{
                      marginTop: "1rem",
                      backgroundColor: "white",
                    }}
                    className="btn btn-sm"
                  >
                    My Appointments
                  </Button>
                  <Button
                    onClick={() => handles(details.id)}
                    variant="contained"
                    style={{ marginTop: "1rem", backgroundColor: "white" }}
                  >
                    My Subscriptions
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Information</Typography>
                  <hr style={{ margin: "0", marginTop: "0.5rem" }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6} style={{ wordWrap: "break-word" }}>
                      <Typography>Email</Typography>
                      <Typography className="text-muted">
                        {details.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ wordWrap: "break-word" }}>
                      <Typography>Phone</Typography>
                      <Typography className="text-muted">
                        {details.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Footer />
    </>
  );
}
