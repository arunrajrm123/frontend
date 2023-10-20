import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicExample from "./Nav";
import Footer from "./Footer";
import axiosInstance from "../axios/axios";
import { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const catodetails = JSON.parse(localStorage.getItem("catodetails")) || [];
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCategory = (cato) => {
    const data = {
      id: cato,
    };
    console.log("haii", data);
    axiosInstance.post("usercatoview/", data).then((res) => {
      console.log(res.data);
      const f = localStorage.setItem("specificato", JSON.stringify(res.data));
      console.log("hello", localStorage.getItem("specificato"));
      navigate("/specificcourse");
    });
  };

  return (
    <div className="home-container">
      <BasicExample />
      <div className="hero-section">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/968/374/desktop-wallpaper-bodybuilding-motivation-fullscreen-bodybuilding.jpg"
          alt="Fitness Image"
          className="img-fluid"
          width="100%"
        />
      </div>
      <div className="intro-section">
        <div className="intro-text">
          <h2 style={{ color: "pink", padding: "40px", fontWeight: "bold" }}>
            Here We Can Provide High Standard Health Care
          </h2>
          <h2 style={{ color: "blue", padding: "40px", fontWeight: "bold" }}>
            OUR SERVICES
          </h2>
        </div>
        <Row style={{ padding: "40px" }}>
          {catodetails.map((cato) => (
            <Col
              className="d-flex flex-column align-items-center"
              md={4}
              key={cato.id}
            >
              <Card
                onMouseEnter={() => setHoveredCard(cato.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform:
                    hoveredCard === cato.id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.2s ease",
                  boxShadow:
                    hoveredCard === cato.id
                      ? "0 0 20px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title>{cato.name}</Card.Title>
                  <Card.Text>{cato.description}</Card.Text>
                </Card.Body>
                <Button onClick={() => handleCategory(cato.id)}>
                  Click here
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="intro-image">
          <img
            src="https://cdn1.vectorstock.com/i/1000x1000/07/50/bodybuilding-emblem-and-gym-logo-design-template-vector-45430750.jpg"
            alt="Fitness Image"
            width="100%"
            className="img-fluid"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
