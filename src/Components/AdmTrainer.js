import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { List, ListItem, ListItemText } from "@mui/material";
import Authcontext from "../context/context";
function Admintrainer() {
  const [userDetails, setuserDetails] = useState([]);
  const [show, setShow] = useState(false);
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    adminaccessToken,
    setadminAccessToken,
  } = useContext(Authcontext);
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    setadminAccessToken("");

    navigate("/adminlogin");
  };
  const handleCloses = () => {
    setShow(false);
  };
  const handleShows = (id) => {
    const datas = {
      tid: id,
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
    setShow(true);
  };
  const [cato, setCato] = useState(false);
  const [values, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [video, setVideo] = useState([]);
  const [action, setAction] = useState("block");
  const [trainers, setTrainers] = useState([]); // Your array of trainers
  const datas = [
    "experience>=1years&fees<2000",
    "experience>=2years&fees<=1600",
    "experience>=2years&fees<=2000",
    "experience>=3years&fees<=3000",
  ];
  const [filter, setFilter] = useState("");
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = (id) => {
    setShowModal(true);
    const data = {
      id: id,
    };
    axiosInstance.post("trainervideosfull/", data).then((res) => {
      const s = localStorage.setItem("videodetails", JSON.stringify(res.data));
      setVideo(res.data);
      const storedDetails = localStorage.getItem("alltrainerdetails");
      if (storedDetails) {
        const parsedData = JSON.parse(storedDetails);
        const arr = [];
        arr.push(parsedData);
        if (parsedData) {
          setuserDetails(parsedData);
        }
      }
    });
  };
  const showConfirmModal = (userId, action) => {
    setSelectedUserId(userId);
    setAction(action);
    setShowConfirmationModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const datas = {
      data: filter,
    };
    axiosInstance.post("alltrainers/", datas).then((res) => {
      setuserDetails(res.data);
    });
  };
  const hideConfirmModal = () => {
    setShowConfirmationModal(false);
  };

  const performAction = () => {
    const data = {
      id: selectedUserId,
    };
    const endpoint = action === "block" ? "blocktrainer/" : "unblocktrainer/";
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
          "alltrainerdetails",
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
  const handlesearch = () => {
    const data = {
      value: values,
    };
    axiosInstance.post("alltrainers/", data).then((res) => {
      setuserDetails(res.data);
    });
  };
  useEffect(() => {
    axiosInstance.post("alltrainers/").then((res) => {
      setuserDetails(res.data);
    });
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
            Trainer Details
          </h1>
          <div>
            <input
              type="text"
              placeholder="Search Trainer..."
              value={values}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button onClick={handlesearch}>search</button>
            <div className="d-flex align-items-center">
              <div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="categorySelect">
                    <Form.Control
                      as="select"
                      name="selected"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      style={{ width: "150px", height: "30px" }}
                    >
                      <option value="">select</option>
                      {datas.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <div className="ml-2">
                    {" "}
                    <Button variant="primary" type="submit">
                      Filter
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>profile image</th>
                <th>Experiece</th>
                <th>Fees</th>
                <th>Video</th>
                <th>Certificate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetails &&
                userDetails.map((user) => (
                  <tr key={user.id}>
                    {!user.is_admin && (
                      <>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <img
                            className="profileimage"
                            src={user.image}
                            alt="loading"
                            style={{
                              width: "100px", // Adjust the width to your desired size
                              height: "100px", // Adjust the height to your desired size
                              borderRadius: "50%", // Makes the image round
                              objectFit: "cover", // Keeps the aspect ratio and covers the container
                            }}
                          />
                        </td>
                        <td>{user.experience}</td>
                        <td>{user.course_fee}</td>
                        <td>
                          <Button onClick={() => handleShow(user.id)}>
                            View Videos
                          </Button>
                        </td>
                        <td>
                          <img
                            className="profileimage"
                            src={user.certificate}
                            alt="loading"
                            style={{
                              width: "100px", // Adjust the width to your desired size
                              height: "100px", // Adjust the height to your desired size
                              borderRadius: "50%", // Makes the image round
                              objectFit: "cover", // Keeps the aspect ratio and covers the container
                            }}
                          />
                        </td>
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
                          <Button onClick={() => handleShows(user.id)}>
                            Subscribers
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
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Embed the video here */}
              {video.map((user) => (
                <iframe
                  title={user.video}
                  width="250"
                  height="250"
                  src={user.video}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show} onHide={handleCloses}>
            <Modal.Header closeButton>
              <Modal.Title>Subscribers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloses}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Admintrainer;
