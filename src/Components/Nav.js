import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Authcontext from "../context/context";
import "../Components/Nav.css";

function BasicExample() {
  const location = useLocation();
  const isadminlogin = location.pathname === "/adminlogin";
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    setadminAccessToken,
    traineraccesstoken,
    setTrainerDecode,
  } = useContext(Authcontext);
  const navigate = useNavigate();
  const [details, setuserDetails] = useState("");
  const handleLogout = () => {
    if (accessToken) {
      setAccessToken("");
      setUserDecode("");
      localStorage.removeItem("authToken");
      localStorage.removeItem("details");
      navigate("/login");
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showModals, setShowModals] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModals = () => {
    setShowModals(false);
  };
  const handleShowModals = () => {
    setShowModals(true);
  };
  const handleUserClick = () => {
    setUserType("user");
    navigate("/signup");
    handleCloseModal();
  };
  const handleUserloginClick = () => {
    setUserType("user");
    navigate("/login");
  };

  const handleTrainerClick = () => {
    setUserType("trainer");
    navigate("/trainersignup");
    handleCloseModal();
  };
  const handleTrainerloginClick = () => {
    setUserType("trainer");
    navigate("/trainerlogin");
    handleCloseModal();
  };
  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      setuserDetails(parsedData);
      console.log(parsedData);
    }
  }, []);
  return (
    <Navbar
      expand="lg"
      className="navbar navbar-expand-lg  fixed-top text-light"
      style={{ backgroundColor: "darkcyan" }}
    >
      <Container>
        <Navbar.Brand className="logo" href="#home">
          FitnessHP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!accessToken && !traineraccesstoken && (
              <Nav.Link
                onClick={handleShowModals}
                style={{ color: "white" }}
                href=""
              >
                Login
              </Nav.Link>
            )}
            <Nav.Link style={{ color: "white", paddingLeft: "10px" }} href="/">
              Home
            </Nav.Link>
            {accessToken ? (
              <Nav.Link style={{ color: "white" }} href="dash">
                Dashboard
              </Nav.Link>
            ) : (
              traineraccesstoken && (
                <Nav.Link style={{ color: "white" }} href="trainerdash">
                  Trainer Dashboard
                </Nav.Link>
              )
            )}
            {!accessToken && !traineraccesstoken && (
              <Nav.Link
                onClick={handleShowModal}
                style={{ color: "white" }}
                href=""
              >
                SignUp
              </Nav.Link>
            )}
          </Nav>
          {accessToken != "" ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout {details.name}
            </Button>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you a User or a Trainer?</p>
          <Button variant="primary" onClick={handleUserClick}>
            User
          </Button>
          <Button variant="primary" onClick={handleTrainerClick}>
            Trainer
          </Button>
        </Modal.Body>
      </Modal>
      {userType === "user" && <Link to="/signup">User Sign Up</Link>}
      {userType === "trainer" && (
        <Link to="/trainersignup">Trainer Sign Up</Link>
      )}
      <Modal show={showModals} onHide={handleCloseModals} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you a User or a Trainer?</p>
          <Button variant="primary" onClick={handleUserloginClick}>
            User
          </Button>
          <Button variant="primary" onClick={handleTrainerloginClick}>
            Trainer
          </Button>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default BasicExample;
