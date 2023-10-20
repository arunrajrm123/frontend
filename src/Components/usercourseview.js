import Footer from "./Footer";
import { useEffect, useState } from "react";
import BasicExample from "./Nav";
import { Card, Row, Col, Button } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";

const UserCourseview = () => {
  const [catodetails, setCatodetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = localStorage.getItem("specificato");
    console.log("haiii", storedDetails);
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      console.log(parsedData);
      setCatodetails(parsedData);
    }
  }, []);

  const [hoveredCard, setHoveredCard] = useState(null);

  const handletrainer = (id) => {
    const data = {
      id: id,
    };

    axiosInstance.post("trinerview/", data).then((res) => {
      console.log(res.data);
      localStorage.setItem("trianersofcor", JSON.stringify(res.data));
      navigate("/specifictriner");
    });
  };

  return (
    <div>
      <BasicExample />
      <div style={{ display: "flex", alignItems: "center" }}></div>
      <div
        style={{
          flex: 1,
          paddingTop: "100px",
          fontSize: "50px",
          fontWeight: "bolder",
          color: "green",
        }}
      >
        Here We Can Provide High Standard Health Care
      </div>
      <h2 style={{ color: "red" }}>Courses</h2>
      <Row style={{ paddingBottom: "100px" }}>
        <div className="d-flex justify-content-center">
          {catodetails.length > 0 ? (
            catodetails.map((cato) => (
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
                    <Card.Title>{cato.c_name}</Card.Title>
                    <Card.Text>{cato.email}</Card.Text>
                    <Button onClick={() => handletrainer(cato.id)}>
                      {cato.c_name}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </Row>
      <Footer />
    </div>
  );
};

export default UserCourseview;
