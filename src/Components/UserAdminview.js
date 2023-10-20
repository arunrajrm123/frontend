import Footer from "./Footer";
import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Rating } from "semantic-ui-react";
import { useEffect, useState } from "react";
import BasicExample from "./Nav";
import "../Components/UserTrainerView.css";
import axiosInstance from "../axios/axios";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserTrainerViews = () => {
  const navigate = useNavigate();
  const [num, setNum] = useState();
  const [trainer, setTrainer] = useState();
  const [users, setUser] = useState("");
  const [details, setCatodetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rayz, setRaz] = useState(false);

  const [reviews, SetReviws] = useState([]);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const dispalyRazorpay = async (amount, trainer_id) => {
    const det = localStorage.getItem("details");
    if (det) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("You are offline.. failed to laod razorpay");
        return;
      }
      const options = {
        key: "rzp_test_VdGdvprTKB8u1w",
        currency: "INR",
        amount: amount * 100,
        name: "User",
        description: "Thanks for purchasing",

        handler: function (response) {
          alert(response.razorpay_payment_id);
          const paymentData = {
            paymentId: response.razorpay_payment_id,
          };
          const cookieData = localStorage.getItem("details");
          console.log("haiis", cookieData);
          const parsedData = JSON.parse(cookieData);
          console.log("haiim", parsedData.id, trainer_id);
          const datas = {
            userid: parsedData.id,
            trainerid: trainer_id,
            paymentId: response.razorpay_payment_id,
          };

          axiosInstance
            .post("suscription/", datas)
            .then((res) => {
              if (res.data.message === "already subscribed") {
                alert("Already subscribed");
                console.log("already");
              } else {
                alert("successfully subscribed");
              }
            })
            .catch((error) => {
              console.error("Error sending payment data to backend:", error);
            });
          alert("payment Succesful");
        },
        prefill: {
          name: "Arun",
        },
      };
      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    } else {
      navigate("/login");
    }
  };
  const handlesub = (id) => {
    const tr = localStorage.getItem("details");
    if (tr) {
      const pr = JSON.parse(tr);
      const data = {
        userid: pr.id,
        trianerid: id,
      };
      Cookies.set("subscriptiondetials", JSON.stringify(data), { expires: 7 });
      setRaz(true);
    } else {
      navigate("/login");
    }
  };
  const stars = [];
  const filledStars = Math.round(num);

  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(
        <span key={i} className="star filled">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star">
          &#9734;
        </span>
      );
    }
  }
  useEffect(() => {
    const storedDetails = localStorage.getItem("usertrainerview");
    const user = localStorage.getItem("details");
    if (storedDetails) {
      if (user) {
        const userdata = JSON.parse(user);
        const parsedData = JSON.parse(storedDetails);
        const data = {
          id: parsedData.id,
          uid: userdata.id,
        };

        axiosInstance.post("getreview/", data).then((res) => {
          console.log(res.data.sub);
          setUser(res.data.sub);
          setNum(res.data.message);
          SetReviws(res.data.data);
        });
        setCatodetails(parsedData);
      } else {
        const parsedData = JSON.parse(storedDetails);
        const data = {
          id: parsedData.id,
        };

        axiosInstance.post("getreview/", data).then((res) => {
          console.log(res.data);
          setNum(res.data.message);
          SetReviws(res.data.data);
        });
        setCatodetails(parsedData);
      }
    }
    const stars = [];
    const filledStars = Math.round(num);

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(
          <span key={i} className="star filled">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
  }, []);

  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <BasicExample />

      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{
                        width: "180px",
                        height: "180px", // Set the height to the same value as width for a fixed square size
                        borderRadius: "10px",
                        border: "1px solid black", // Add a border
                      }}
                      src={details.image}
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>
                      {details.name}-----
                      <button onClick={handleModalToggle}>Reviews</button>
                    </MDBCardTitle>
                    {console.log(stars, "aaaaaaaaaaaaaaaaaaaaaaaa")}
                    {stars[0] == <span className="star">&#9734;</span> ? (
                      ""
                    ) : (
                      <div style={{ color: "red" }} className="star-rating">
                        Rating:{stars}
                      </div>
                    )}
                    <MDBCardText>{details.email}</MDBCardText>
                    <div
                      className="d-flex justify-content-between rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Experience</p>
                        <p className="mb-0">{details.experience}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1"></p>
                        <p className="mb-0"></p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Phone</p>
                        <p className="mb-0">{details.phone}</p>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between rounded-3 p-2 mb-2"
                      style={{
                        backgroundColor: "#efefef",
                        borderColor: "1px solid black",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                          Course Fee
                        </p>
                        <p style={{ fontSize: "15px", fontWeight: "bolder" }}>
                          {details.course_fee}
                        </p>
                      </div>
                    </div>
                    <div style={{ color: "purple", borderRadius: "0px" }}>
                      {!users ? (
                        <Button
                          style={{ borderRadius: "0px" }}
                          onClick={() =>
                            dispalyRazorpay(details.course_fee, details.id)
                          }
                        >
                          {" "}
                          Subscribe
                        </Button>
                      ) : (
                        <Button style={{ borderRadius: "0px" }}>
                          {" "}
                          Subscribed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Modal show={showModal} onHide={handleModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Trainer Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews && reviews.length > 0 ? ( // Check if reviews array is not empty
            reviews.map((review) => (
              <div key={review.id}>
                <p>
                  {review.user.name}:-
                  {review.review_text}
                </p>
                {/* Add additional review details */}
              </div>
            ))
          ) : (
            // Render a message if there are no reviews
            <p>No reviews available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalToggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default UserTrainerViews;
