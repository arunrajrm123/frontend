import React from "react";
import { useContext } from "react";
import Authcontext from "../context/context";
import jwt_decode from "jwt-decode";
import { changePassword, changeEmail } from "../Slices/Trainerlogslice";
import "../Components/SignUpuser.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import BasicExample from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
function TrainerLogin() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.trainerlog);
  const dispatch = useDispatch();
  const {
    traineraccesstoken,
    setTarinerAccessToken,
    tarinerDecode,
    setTrainerDecode,
  } = useContext(Authcontext);
  const handleLoginSubmit = () => {
    const data = {
      email: user.value.email,
      password: user.value.password,
    };
    console.log(data);

    axiosInstance
      .post("trainerlogin/", data)
      .then((res) => {
        console.log(res.data);

        if (res.data.message === "You are blocked by admin") {
          // Display an alert for blocked users
          toast.error("you are blocked");
        } else if (res.data.message === "You are Not approved by admin") {
          // Display an alert for blocked users
          console.log(res.data);
          toast.error("You are Not approved by admin");
        } else {
          const tokens = {
            refresh: res.data.refresh,
            access: res.data.access,
          };

          setTarinerAccessToken(tokens);
          const reqdatas = jwt_decode(res.data.access);
          setTrainerDecode(reqdatas);
          localStorage.setItem(
            "trainerauthToken",
            JSON.stringify(res.data.access)
          );
          localStorage.setItem(
            "trainerdetails",
            JSON.stringify(res.data.alldatas)
          );
          localStorage.setItem(
            "alltrainerdetails",
            JSON.stringify(res.data.alltrainer)
          );
          localStorage.setItem(
            "trainercatogery",
            JSON.stringify(res.data.trainerscato)
          );

          localStorage.setItem(
            "trainercourse",
            JSON.stringify(res.data.traincor)
          );

          navigate("/trainerdash");

          toast.success("Logged in successfully");
        }
      })
      .catch((err) => toast.error(err.message));
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
            <h2 className="text-uppercase text-center mb-5">Login</h2>

            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              id="form2"
              type="email"
              required
              value={user.value.email}
              onChange={(e) => dispatch(changeEmail(e.target.value))}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form3"
              type="password"
              required
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
            <Button
              onClick={handleLoginSubmit}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Login
            </Button>

            <ToastContainer />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default TrainerLogin;
