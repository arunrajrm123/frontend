import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { useContext } from "react";
import Authcontext from "../context/context";
import { useNavigate } from "react-router-dom";
import { Avatar, Paper } from "@mui/material";

function AdminHome() {
  const [values, setValue] = useState("");
  const [userDetails, setuserDetails] = useState([]);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState("block"); // Default action is blocking
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    adminaccessToken,
    setadminAccessToken,
  } = useContext(Authcontext);
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    const data = {
      uid: id,
    };
    axiosInstance.post("usertrainersub/", data).then((res) => {
      console.log(res.data, "halookk");
      console.log(res.data);
      if (res.data.message === "User has no subscriptions") {
        console.log("no subscribers");
      } else {
        setDatas(res.data);
      }
    });

    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const showConfirmModal = (userId, action) => {
    setSelectedUserId(userId);
    setAction(action);
    setShowConfirmationModal(true);
  };

  const hideConfirmModal = () => {
    setShowConfirmationModal(false);
  };

  const performAction = () => {
    const data = {
      id: selectedUserId,
    };

    const endpoint = action === "block" ? "blockuser/" : "unblockuser/";

    axiosInstance
      .put(endpoint, data)
      .then((res) => {
        const updatedUserDetails = userDetails.map((user) => {
          if (user.id === selectedUserId) {
            return {
              ...user,
              isBlocked: action === "block",
            };
          }
          return user;
        });

        localStorage.setItem(
          "alluserdetails",
          JSON.stringify(updatedUserDetails)
        );
        setuserDetails(updatedUserDetails);
        hideConfirmModal();
      })
      .catch((error) => {
        console.error(`Error ${action}ing user: `, error);
        hideConfirmModal();
      });
  };
  const handleLogout = () => {
    setadminAccessToken("");

    navigate("/adminlogin");
  };
  const handlesearch = () => {
    const datas = {
      values: values,
    };
    axiosInstance.post("alluser", datas).then((res) => {
      console.log(values);
      setuserDetails(res.data);
    });
  };
  useEffect(() => {
    axiosInstance.post("alluser").then((res) => {
      setuserDetails(res.data);
    });
    // const storedDetails = localStorage.getItem("alluserdetails");
    // console.log(storedDetails);
    // if (storedDetails) {
    //   const parsedData = JSON.parse(storedDetails);
    //   setuserDetails(parsedData);
    // }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3 col-lg-2 bg-light p-3 vh-100 d-flex flex-column border border-black">
          {/* Sidebar Content Goes Here */}
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
            User Details
          </h1>

          <div>
            <input
              type="text"
              placeholder="Search data..."
              value={values}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button onClick={handlesearch}>search</button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user) => (
                <tr key={user.id}>
                  {!user.is_admin && (
                    <>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>

                      <td>
                        <Button
                          onClick={() =>
                            showConfirmModal(
                              user.id,
                              user.isBlocked ? "unblock" : "block"
                            )
                          }
                          variant={user.isBlocked ? "danger" : "success"}
                        >
                          {user.isBlocked ? "Blocked" : "Block"}
                        </Button>
                        <Button onClick={() => handleShow(user.id)}>
                          Details
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showConfirmationModal} onHide={hideConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to{" "}
              {action === "block" ? "block" : "unblock"} this user?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideConfirmModal}>
                Cancel
              </Button>
              <Button onClick={performAction}>Confirm</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Subscribed Trainers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="col-md-9 col-lg-10 text-center d-flex align-items-center justify-content-center py-5"
                style={{ paddingLeft: "80px" }}
              >
                <Paper elevation={3}>
                  <Table responsive hover>
                    {
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Experience</th>
                          <th>Image</th>

                          <th>Course</th>
                        </tr>
                      </thead>
                    }
                    <tbody>
                      {datas.map((user) => (
                        <tr key={user.id}>
                          {
                            <>
                              <td>{user.trainer_details.trainer_name}</td>
                              <td>{user.trainer_details.trainer_experience}</td>

                              <td>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={user.trainer_details.trainer_image}
                                  sx={{ width: 56, height: 56 }}
                                />
                              </td>

                              <td>{user.course.course_name}</td>
                            </>
                          }
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Paper>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
