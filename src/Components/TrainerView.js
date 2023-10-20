import Footer from "./Footer";

import "../Components/UserTrainerView.css";
import { useEffect, useState } from "react";
import BasicExample from "./Nav";
import { Card, Row, Col, Image, Button, Alert } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { AlertTitle } from "@mui/material";
const UserTrainerView = () => {
  const [catodetails, setCatodetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedDetails = localStorage.getItem("trianersofcor");
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      setCatodetails(parsedData);
    }
  }, []);
  const handletrainer = (id) => {
    const data = {
      id: id,
    };
    axiosInstance.post("trainerfulldetails/", data).then((res) => {
      console.log(res.data);
      localStorage.setItem("usertrainerview", JSON.stringify(res.data));
      navigate("/trainerfulldetail");
      // setimageUplaod(url); // Set the image URL to display in your component
    });
  };
  return (
    <div>
      <BasicExample />
      <div style={{ display: "flex", alignItems: "center" }}></div>
      <div
        style={{
          flex: 1,
          fontSize: "50px",
          fontWeight: "bolder",
          color: "green",
          paddingTop: "80px",
        }}
      >
        Here We Can Provide High Standard Health Care
      </div>
      <h2 style={{ color: "red" }}>Trainers</h2>
      <Row>
        {/* First Card */}
        {catodetails.length > 0 ? (
          catodetails.map((cato) => (
            <Col
              className="d-flex flex-column align-items-center"
              md={4}
              key={cato.id}
            >
              <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="square-image-container">
                    <Image
                      src={cato.image}
                      alt="User Profile"
                      className="square-image"
                    />
                  </div>
                  <Card.Title>{cato.name}</Card.Title>
                  <Button onClick={() => handletrainer(cato.id)}>View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Alert severity="info">No trainers available</Alert>
        )}
      </Row>

      <Footer />
    </div>
  );
};

export default UserTrainerView;
