import React, { useEffect } from "react";

import "../Components/SignUpuser.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import { Form } from "react-bootstrap";
import { changeCourse, changeExperience } from "../Slices/SignupTrainer";
import Footer from "./Footer";
import BasicExample from "./Nav";
import { storage } from "../fireconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCertificate,
  changeEmail,
  changeName,
  changePassword,
  changeCourseFee,
  changePhone,
  changeCatogery,
} from "../Slices/SignupTrainer";

function SignUpuser() {
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    certificate: "",
    fee: "",
    experience: "",
  });

  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState([]);
  const user = useSelector((state) => state.signuptrainer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageupload, setimageUplaod] = useState(null);
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    phone: true,
    password: true,
  });

  // Fetch the list of categories from your API
  useEffect(() => {
    axiosInstance.post("allcour/").then((res) => {
      setCourse(res.data);
    });
    axiosInstance.post("allcato/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleValidation = () => {
    const updateValidation = {
      name: user.value.name.trim() !== "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email),
      phone: user.value.phone.length == 10,
      password: user.value.password.length >= 6,
      certificate: user.value.certificate !== null,
      experience: user.value.experience !== null,
      fee: user.value.fee !== null,
      experience: user.value.experience != null,
      course: user.value.course != null,
    };
    const errorMessages = {
      name: !updateValidation.name ? "Name is required" : "",
      email: !updateValidation.email ? "Invalid email address" : "",
      phone: !updateValidation.phone ? "Phone number must be 10 digits" : "",
      password: !updateValidation.password
        ? "Password must be at least 6 characters"
        : "",
      certificate: !updateValidation.certificate
        ? "Certificate is required"
        : "",
      fee: !updateValidation.fee ? "Course fee is required" : "",
      experience: !updateValidation.experience ? "Experience is required" : "",
      course: !updateValidation.course ? "please choose a course" : "",
    };
    setValidation(updateValidation);
    setValidationErrors(errorMessages);

    return Object.values(updateValidation).every((isValid) => isValid);
  };
  const handleSubmit = (e) => {
    if (!handleValidation()) {
      console.log(user.value.phone);
      return;
    }
    e.preventDefault();

    if (imageupload == null) {
      // Handle the case when no image is selected
      console.log("No image selected");
      return;
    }

    const imageRef = ref(storage, `certificates/${imageupload.name + v4()}`);

    // Upload the image to Firebase Storage
    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef); // Return the download URL promise
      })
      .then((url) => {
        console.log("url", user.value.experience);

        const datas = {
          name: user.value.name,
          email: user.value.email,
          phonenumber: user.value.phone,
          password: user.value.password,
          certificate: url,
          course_fee: user.value.fee,
          course: user.value.course,
          experience: user.value.experience,
          image: user.value.image,
        };

        // Send the data with the image URL to your server
        axiosInstance
          .post("trainersignup/", datas)
          .then((res) => {
            console.log(res.data);
            navigate("/trainerlogin");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        // Handle the error appropriately
      });
  };

  return (
    <>
      <BasicExample className="navbar navbar-expand-lg navbar-light bg-light fixed-top" />
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
          paddingTop: "30px",
        }}
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>
            <label htmlFor="form1">Name</label>
            <MDBInput
              wrapperClass="mb-4"
              size="lg"
              id="form1"
              type="text"
              className={`form-control ${!validation.name ? "is-invalid" : ""}`}
              value={user.value.name}
              onChange={(e) => dispatch(changeName(e.target.value))}
              required
            />
            {<div style={{ color: "red" }}>{validationErrors.name}</div>}

            <label htmlFor="form1">Email</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form2"
              type="email"
              className={`form-control ${
                !validation.email ? "is-invalid" : ""
              }`}
              value={user.value.email}
              onChange={(e) => dispatch(changeEmail(e.target.value))}
            />
            {<div style={{ color: "red" }}>{validationErrors.email}</div>}
            <label htmlFor="form1">Phone</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form3"
              type="text"
              className={`form-control ${
                !validation.phone ? "is-invalid" : ""
              }`}
              value={user.value.phone}
              onChange={(e) => dispatch(changePhone(e.target.value))}
            />
            {<div style={{ color: "red" }}>{validationErrors.phone}</div>}
            <label htmlFor="form1">Password</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form4"
              type="password"
              className={`form-control ${
                !validation.password ? "is-invalid" : ""
              }`}
              value={user.value.password}
              onChange={(e) => dispatch(changePassword(e.target.value))}
            />
            {<div style={{ color: "red" }}>{validationErrors.password}</div>}
            <label htmlFor="form1">Experience</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form4"
              type="text"
              value={user.value.experience}
              onChange={(e) => dispatch(changeExperience(e.target.value))}
            />
            {<div style={{ color: "red" }}>{validationErrors.experience}</div>}
            <label htmlFor="form1">Coursefee</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form4"
              type="number"
              value={user.value.fee}
              onChange={(e) => dispatch(changeCourseFee(e.target.value))}
            />
            {<div style={{ color: "red" }}>{validationErrors.fee}</div>}
            <Form.Group controlId="categorySelect">
              <Form.Label>Select Course</Form.Label>
              <Form.Control
                as="select"
                name="selectedCategory"
                value={user.value.course}
                onChange={(e) => dispatch(changeCourse(e.target.value))}
              >
                <option value="">Select a course</option>
                {course.map((category) => (
                  <option key={category.id} value={category.c_name}>
                    {category.c_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <label htmlFor="form1">Certificate</label>
            <MDBInput
              required
              wrapperClass="mb-4"
              size="lg"
              id="form5"
              type="file"
              onChange={(e) => {
                dispatch(changeCertificate(e.target.files[0]));
                setimageUplaod(e.target.files[0]);
              }}
            />

            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Register
            </button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default SignUpuser;
