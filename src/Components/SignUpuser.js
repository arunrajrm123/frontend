import React from "react";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import "../Components/SignUpuser.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Footer from "./Footer";
import BasicExample from "./Nav";
import {
  changeEmail,
  changeName,
  changePassword,
  changePhone,
  resetUser,
} from "../Slices/UserSignup";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function SignUpuser() {
  const user = useSelector((state) => state.usersignup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    phone: true,
    password: true,
  });
  const handleValidation = () => {
    const updateValidation = {
      name: user.value.name.trim() !== "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email),
      phone: user.value.phone.length == 10,
      password: user.value.password.length >= 6,
    };
    setValidation(updateValidation);
    return Object.values(updateValidation).every((isValid) => isValid);
  };
  const handleSubmit = (e) => {
    if (!handleValidation()) {
      console.log(user.value.phone);
      return;
    }
    e.preventDefault();

    const data = {
      name: user.value.name,
      email: user.value.email,
      phonenumber: user.value.phone,
      password: user.value.password,
    };

    axiosInstance
      .post("signup/", data)
      .then((res) => {
        console.log(res.data);
        navigate("/email");
        Cookies.set("signupotpdatas", JSON.stringify(res.data), { expires: 7 });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <BasicExample />
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
            />
            <label htmlFor="form1">Email</label>
            <MDBInput
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
            <label htmlFor="form1">Phone</label>
            <MDBInput
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
            <label htmlFor="form1">Password</label>
            <MDBInput
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

            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>
            {/* <MDBBtn
              onClick={handleSubmit}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Register
            </MDBBtn> */}

            <Button
              onClick={handleSubmit}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Sent Otp
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default SignUpuser;
