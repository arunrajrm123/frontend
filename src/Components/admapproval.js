import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import Authcontext from "../context/context";

function Adminapproval() {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    adminaccessToken,
    setadminAccessToken,
  } = useContext(Authcontext);
  const [trainers, setTrainers] = useState([]);
  const [showNoTrainerMessage, setShowNoTrainerMessage] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setadminAccessToken("");

    navigate("/adminlogin");
  };
  const handleApproval = (id) => {
    const data = {
      id: id,
    };

    axiosInstance
      .put("trainercertificate/", data)
      .then((res) => {
        setTrainers((prevTrainers) =>
          prevTrainers.map((trainer) =>
            trainer.id === id
              ? { ...trainer, is_approved: !trainer.is_approved }
              : trainer
          )
        );
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error in updating approval status:", err);
      });
  };

  useEffect(() => {
    axiosInstance
      .get("trainerapproval/")
      .then((res) => {
        const trainersData = res.data.trainers;
        const hasUnapprovedTrainers = trainersData.some(
          (trainer) => !trainer.is_approved
        );
        setTrainers(trainersData);
        setShowNoTrainerMessage(!hasUnapprovedTrainers);
      })
      .catch((err) => {
        console.error("Error in calling the Django view:", err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3 col-lg-2 bg-light p-3 vh-100 d-flex flex-column border border-black">
          <Button className="my-2">
            <Link to="/admindash" style={{ color: "white" }} className="my-2">
              Dashboard
            </Link>
          </Button>
          <Button className="my-2">
            <Link to="/adminhome" style={{ color: "white" }} className="my-2">
              User
            </Link>
          </Button>

          <Button className="my-2">
            {" "}
            <Link to="/cato" style={{ color: "white" }} className="my-2">
              Category
            </Link>
          </Button>
          <Button className="my-2">
            {" "}
            <Link
              to="/trainerdetails"
              style={{ color: "white" }}
              className="my-2"
            >
              Trainer
            </Link>
          </Button>

          <Button className="my-2">
            {" "}
            <Link to="/course" style={{ color: "white" }} className="my-2">
              Courses
            </Link>
          </Button>
          <Button className="my-2">
            <Link
              to="/trainerapproval"
              style={{ color: "white" }}
              className="my-2"
            >
              Trainer Verification
            </Link>
          </Button>
          <Button className="my-2">
            {" "}
            <Link
              to="/adminappointview"
              style={{ color: "white" }}
              className="my-2"
            >
              Appointment added by trainer
            </Link>
          </Button>
          <Button className="my-2">
            {" "}
            <Link
              to="/adminbookingview"
              style={{ color: "white" }}
              className="my-2"
            >
              Slot Bookings
            </Link>
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {/* Main Content Column */}
        <div className="col-md-9 col-lg-10 text-center">
          <h1 className="mb-4" style={{ fontSize: "2rem" }}>
            Trainer Details
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Certificate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {showNoTrainerMessage ? (
                <tr>
                  <td colSpan="5">No unapproved trainers found.</td>
                </tr>
              ) : (
                trainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>{trainer.id}</td>
                    <td>{trainer.name}</td>
                    <td>{trainer.email}</td>
                    <td>
                      <img
                        className="profileimage"
                        src={trainer.certificate}
                        alt="Certificate"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedImage(trainer.certificate);
                          setShowImageModal(true);
                        }}
                      />
                    </td>
                    <Modal
                      show={showImageModal}
                      onHide={() => setShowImageModal(false)}
                      centered
                    >
                      <Modal.Body>
                        <img
                          src={selectedImage}
                          alt="Full Certificate"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </Modal.Body>
                    </Modal>
                    <td>
                      <Button
                        onClick={() => handleApproval(trainer.id)}
                        variant={trainer.is_approved ? "success" : "danger"}
                        className="my-2"
                      >
                        {trainer.is_approved ? "Approved" : "Approve"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Adminapproval;
