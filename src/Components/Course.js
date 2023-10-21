import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Table, Card, ModalBody, ModalTitle } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { useContext } from "react";
import Authcontext from "../context/context";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { changeCatogery, changeName } from "../Slices/courseSlice";
import { toast } from "react-toastify";

function Courses() {
  const [catodetails, setCatodetails] = useState([]);

  const [cato, setCato] = useState(false);
  const user = useSelector((state) => state.courseslice);
  const dispatch = useDispatch();
  const [cat, setCat] = useState("");
  const [values, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState([]);
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

  const handleview = (id) => {
    const data = {
      id: id,
    };
    axiosInstance.post("admincoursefull/", data).then((res) => {
      // const det = JSON.stringify(res.data.ser);
      // console.log("det", det);
      setCat(res.data);
      console.log(res.data);
      setShowModal(true);
    });
  };

  const handleCloseModal = () => {
    // Close the modal when needed
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: user.value.name,
      catogery: user.value.catogery,
    };
    console.log(data);
    axiosInstance.post("addcourse/", data).then((res) => {
      console.log("this is respose", res.data);
      if (res.data.message) {
        toast.error(res.data.message);
      } else {
        setCatodetails(res.data);
      }

      const Det = localStorage.getItem("catodetails");
      const par = JSON.parse(Det);
      console.log(par);
      setCategories(par);
    });
  };

  const handlesearch = () => {
    const data = {
      value: values,
    };
    axiosInstance.post("allcour/", data).then((res) => {
      setCatodetails(res.data);
    });
  };
  useEffect(() => {
    axiosInstance.post("allcour/").then((res) => {
      setCatodetails(res.data);
    });
    axiosInstance.post("allcato/").then((res) => {
      setCategories(res.data);
      axiosInstance.get("fullcatogery/").then((res) => {
        setCategorie(res.data);
        console.log(res.data);
      });
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
            Course
          </h1>
          {cato && (
            <Card border="primary">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="categoryName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.value.name}
                      onChange={(e) => dispatch(changeName(e.target.value))}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="categorySelect">
                    <Form.Label>Select Course</Form.Label>
                    <Form.Control
                      as="select"
                      name="selectedCourse"
                      value={user.value.course}
                      onChange={(e) => dispatch(changeCatogery(e.target.value))}
                    >
                      <select>
                        <option value="">Select a catogery</option>
                        {categorie.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Add Course
                  </Button>

                  <Button
                    onClick={() => {
                      setCato(false);
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          {!cato && (
            <Button
              onClick={() => {
                setCato(true);
              }}
            >
              {" "}
              Add Course
            </Button>
          )}
          <div>
            <input
              type="text"
              placeholder="Search course..."
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
                <th>id</th>
                <th>Name</th>
                <th>catogery</th>
              </tr>
            </thead>
            <tbody>
              {catodetails.map((use) => (
                <tr key={use.id}>
                  <td>{use.id}</td>
                  <td>{use.c_name}</td>
                  <td>
                    <Button onClick={() => handleview(use.catogery)}>
                      view Full detials
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <ModalTitle>Category Details</ModalTitle>
          </Modal.Header>
          <ModalBody>
            {/* Display category details here */}
            {cat && (
              <div>
                <p>ID: {cat.id}</p>
                <p>Name: {cat.name}</p>
                <p>Description: {cat.description}</p>
                {/* Add more category details as needed */}
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default Courses;
