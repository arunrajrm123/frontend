import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import { Table, Image } from "react-bootstrap";
import BasicExample from "./Nav";
import Footer from "./Footer";
import { Button, Card, Form } from "react-bootstrap";
import { storage } from "../fireconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar, Paper, Typography } from "@mui/material";

export default function Subscribedtrains() {
  const [details, setuserDetails] = useState("");
  const [rating, setRating] = useState("");
  const [tid, setTid] = useState();
  const [reviewText, setReviewText] = useState("");
  const [imageupload, setimageUplaod] = useState(null);
  const [datas, setDatas] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sub, setSub] = useState(true);
  const [cato, setCato] = useState(false);
  const navigate = useNavigate();
  const handleVideoButtonClick = (video) => {
    setSelectedVideo(video);
  };
  const numbers = [1, 2, 3, 4, 5];
  const handleSubmits = (e) => {
    e.preventDefault();
    const Det = localStorage.getItem("details");
    const par = JSON.parse(Det);
    const data = {
      tid: tid,
      uid: par.id,
      rating: rating,
      review: reviewText,
    };
    console.log(data);
    axiosInstance.post("review/", data).then((res) => {
      console.log(res.data);
      alert("succesfully added");
    });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };
  const handlereview = () => {};

  const handleUpload = () => {
    if (imageupload == null) return;
    const imageRef = ref(storage, `images/${imageupload.name + v4()}`);
    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef); // Return the download URL promise
      })
      .then((url) => {
        console.log(url);
        const parsit = JSON.parse(localStorage.getItem("details"));
        const userid = parsit.id;
        console.log(userid);
        const datas = {
          imageurl: url,
          userid: userid,
        };
        axiosInstance
          .post("uploadimage/", datas)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("details", JSON.stringify(res.data.userdatas));
            setuserDetails(res.data.userdatas);
            // setimageUplaod(url); // Set the image URL to display in your component
          })
          .catch((err) => alert("Error in calling the Django view"));
      })
      .catch((err) => alert("Error on downloading URL"));
  };
  const handleid = (id) => {
    navigate(`/slots/${id}`);
  };

  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    const par = JSON.parse(localStorage.getItem("details"));
    console.log(par, "dey njn ane");
    // const cookie = Cookies.get("subscriptiondetials");
    // const par = localStorage.JSON.parse(cookie);
    // console.log("userdetails", par);
    console.log(par.id, "id anne nokkiko");
    const data = {
      uid: par.id,
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
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      setuserDetails(parsedData);
      setimageUplaod(`http://127.0.0.1:8000${parsedData.image}`);
      console.log("hai parsed", storedDetails);
      console.log("image", parsedData.image);
    }
  }, []);
  const handles = (id) => {
    const datas = { id: id };
    axiosInstance.post("sdetails/", datas).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <BasicExample />
      <Typography
        variant="h5"
        gutterBottom
        className="text-center justify-content-center"
      >
        My Appointments
      </Typography>
      {cato && (
        <Card border="primary">
          <Card.Body>
            <Form onSubmit={handleSubmits}>
              <Form.Group controlId="review">
                <Form.Label>review</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="categorySelect">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedCategory"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option value="">Select rating</option>
                  {numbers.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Add
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

      <div
        className="col-md-9 col-lg-10 text-center d-flex align-items-center justify-content-center py-5"
        style={{ paddingLeft: "180px" }}
      >
        <Paper elevation={3} sx={{ padding: "1rem", paddingRight: "1rem" }}>
          <Table responsive hover>
            {
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Image</th>
                  <th>Video</th>
                  <th>Course</th>
                  <th>Appointments</th>
                  <th>Review&Rating</th>
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
                      <td>
                        {user.videos.map((video) => (
                          <div key={video.video_name}>
                            <button
                              variant="primary"
                              onClick={() => handleVideoButtonClick(video)}
                            >
                              Show Details
                            </button>
                          </div>
                        ))}
                      </td>

                      <td>{user.course.course_name}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleid(user.trainer_details.trainer_id)
                          }
                          className="btn btn-primary"
                        >
                          Book an Appointment
                        </button>
                      </td>
                      <td>
                        {!cato && (
                          <Button
                            onClick={() => {
                              setCato(true);
                              setTid(user.trainer_details.trainer_id);
                            }}
                          >
                            {" "}
                            Add
                          </Button>
                        )}
                      </td>
                    </>
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
        <Modal show={!!selectedVideo} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Video Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVideo && (
              <div>
                <p>Video Name: {selectedVideo.video_name}</p>
                <p>Description: {selectedVideo.video_description}</p>
                <video
                  controls
                  width="100%"
                  height="auto"
                  onClick={(e) => {
                    e.target.classList.toggle("video-expanded");
                  }}
                >
                  <source src={selectedVideo.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
