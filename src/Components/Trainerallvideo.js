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
import BasicExample from "./Nav";
import Footer from "./Footer";
import { storage } from "../fireconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import Authcontext from "../context/context";
import { json, useNavigate } from "react-router-dom";
export default function UserCourse() {
  const [details, setuserDetails] = useState({});

  useEffect(() => {
    const parsit = localStorage.getItem("trainerdetails");
    const pr = JSON.parse(parsit);
    const data = {
      id: pr.id,
    };
    axiosInstance.post("myvideos/", data).then((res) => {
      setuserDetails(res.data);
      console.log(details);
    });
  }, []);

  return (
    <>
      <BasicExample />
      <div
        className="d-flex justify-content-center place-items-column"
        style={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        <iframe
          title={details.video}
          width="250"
          height="250"
          src={details.video}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <Footer />
    </>
  );
}
