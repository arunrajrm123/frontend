import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBBtn,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import BasicExample from "./Nav";
import Footer from "./Footer";
import { storage } from "../fireconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Toast,
  Modal,
} from "react-bootstrap";
import { useContext } from "react";
import Authcontext from "../context/context";
import { useNavigate } from "react-router-dom";
// import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TrainerDashboard() {
  const [details, setuserDetails] = useState("");
  const [shows, setShows] = useState(false);
  const [money, setMoney] = useState();
  const user = useSelector((state) => state.usersignup);
  const [image, setImage] = useState();
  const [catogery, setCategory] = useState("");
  const [course, setCourse] = useState("");
  const [video, setVideo] = useState("");
  const dispatch = useDispatch();
  const [imageupload, setimageUplaod] = useState(null);
  const navigate = useNavigate();

  const handleShow = () => setShows(true);
  const handleFileUpload = (e) => {
    // Handle the file upload logic here
    // You can access the uploaded file from e.target.files
    // For example, you can use FormData to send the file to a server.
    // const formData = new FormData();
    // formData.append('file', e.target.files[0]);
    // Then, make an API call to upload the file.
    if (imageupload == null) {
      console.log("No image selected");
      return;
    }

    const imageRef = ref(storage, `certificates/${imageupload.name + v4()}`);

    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        console.log(url);
        const det = localStorage.getItem("trainerdetails");
        const dets = JSON.parse(det);
        const id = dets.id;
        const datas = {
          id: id,
          image: url,
        };

        axiosInstance
          .post("trainerimage/", datas)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("trainerdetails", JSON.stringify(res.data));
            const storedDetails = localStorage.getItem("trainerdetails");
            const parsedData = JSON.parse(storedDetails);
            setuserDetails(parsedData);
            navigate("/trainerdash");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  };
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    setadminAccessToken,
    traineraccesstoken,
    setTrainerDecode,
  } = useContext(Authcontext);
  const handleLogout = () => {
    if (traineraccesstoken) {
      setadminAccessToken("");
      setTrainerDecode("");
      localStorage.removeItem("trainerauthToken");
      localStorage.removeItem("trainerdetails");
      navigate("/trainerlogin");
    }
  };

  const imageuploading = () => {
    if (imageupload == null) {
      console.log("No image selected");
      return;
    }

    const imageRef = ref(storage, `certificates/${imageupload.name + v4()}`);

    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        console.log(url);
        const det = localStorage.getItem("trainerdetails");
        const dets = JSON.parse(det);
        const id = dets.id;
        const datas = {
          id: id,
          image: url,
        };

        axiosInstance
          .post("trainerimage/", datas)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("trainerdetails", JSON.stringify(res.data));
            const storedDetails = localStorage.getItem("trainerdetails");
            const parsedData = JSON.parse(storedDetails);
            setuserDetails(parsedData);
            navigate("/trainerdash");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  };
  const handlevideoupload = () => {
    if (imageupload == null) return;
    const imageRef = ref(storage, `images/${imageupload.name + v4()}`);
    uploadBytes(imageRef, imageupload)
      .then((res) => {
        console.log(res, "imageres");
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        console.log(url);
        const parsit = JSON.parse(localStorage.getItem("trainerdetails"));
        const userid = parsit.id;
        console.log(userid);
        const datas = {
          videourl: url,
          userid: userid,
        };
        axiosInstance
          .post("uploadvideo/", datas)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem(
              "trainerdetails",
              JSON.stringify(res.data.trainerdatas)
            );
            setuserDetails(res.data.userdatas);
          })
          .catch((err) => alert("Error in calling the Django view"));
      })
      .catch((err) => alert("Error on downloading URL"));
  };
  const handleid = (id) => {
    navigate(`/slot/${id}`);
  };
  const handlevideo = () => {
    navigate("/videoupload");
  };
  const videouploads = () => {
    const parsit = JSON.parse(localStorage.getItem("trainerdetails"));
    const userid = parsit.id;
    console.log(userid);
    const datas = {
      id: userid,
    };
    axiosInstance.post("videos/", datas).then((res) => {
      console.log(res.data);
      if (res.data.message) {
        toast.error(res.data.message);
      } else {
        localStorage.setItem("allvideosoftrianer", res.data.vid);
        navigate("/allvideos");
      }
    });
  };
  const handleshow = async (id) => {
    setShow(true);
    const datas = {
      id: id,
    };
    const res = await axiosInstance.post("earnings/", datas);
    setMoney(res.data.money);
  };
  const Bookingstatus = () => {
    navigate("/myuserstatus");
  };
  const Myslots = () => {
    navigate("/myslots");
  };
  const handleaa = () => {
    navigate("/myusers");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShows(false);
  const handleCloses = () => setShow(false);

  useEffect(() => {
    console.log("enterd to useeffect");
    const storedDetails = localStorage.getItem("trainerdetails");
    console.log(storedDetails);

    const corDetails = localStorage.getItem("trainercourse");
    console.log(corDetails);

    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      const cors = JSON.parse(corDetails);
      const im = parsedData.image;
      console.log(im);
      setuserDetails(parsedData);
      setCourse(cors);
      if (im) {
        setimageUplaod(im);
      }
      console.log("hai parsed", storedDetails);
      console.log("image", parsedData.image);
    }
  }, []);
  return (
    <>
      <BasicExample />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F8ECF9",
          paddingTop: "40px",
        }}
      >
        <Paper
          elevation={3}
          style={{ borderRadius: "0.5rem", padding: "16px", width: "80%" }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              style={{
                backgroundColor: "darkcyan",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                height: "80vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {
                    <img
                      className="profileimage"
                      src={details.image}
                      alt="loading"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  }
                </div>
                <Typography
                  variant="h3"
                  style={{ color: "white", fontWeight: "bolder" }}
                >
                  {details.name}
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Revenue
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "30px",
                  }}
                >
                  {
                    <img
                      className="profileimage"
                      src="https://static-00.iconduck.com/assets.00/wallet-icon-1964x2048-g8f5z6u3.png"
                      alt="loading"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "0px",
                        objectFit: "cover",
                        backgroundColor: "darkcyan",
                      }}
                      onClick={() => handleshow(details.id)}
                    />
                  }
                </div>
                {traineraccesstoken && (
                  <Button
                    variant="contained"
                    style={{ marginTop: "1rem", backgroundColor: "white" }}
                    onClick={handleLogout}
                  >
                    Logout {details.name}
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Information</Typography>
                  <hr style={{ margin: "0", marginTop: "0.5rem" }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>Email</Typography>
                      <Typography className="text-muted">
                        {details.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Phone</Typography>
                      <Typography className="text-muted">
                        {details.phone}
                      </Typography>
                    </Grid>
                    {
                      <Button
                        variant="outline-danger"
                        onClick={() => setShows(true)}
                      >
                        image upload
                      </Button>
                    }
                    {traineraccesstoken && (
                      <Button variant="outline-danger" onClick={handlevideo}>
                        video upload
                      </Button>
                    )}
                    {
                      <Button variant="outline-danger" onClick={videouploads}>
                        My video
                      </Button>
                    }
                    {
                      <Button variant="outline-danger" onClick={Myslots}>
                        My Slot
                      </Button>
                    }
                    {
                      <Button
                        variant="outline-danger"
                        onClick={() => handleid(details.id)}
                      >
                        Add time slot
                      </Button>
                    }
                    {
                      <Button
                        variant="outline-danger"
                        onClick={() => handleaa()}
                      >
                        Mysubscribers
                      </Button>
                    }
                    {
                      <Button variant="outline-danger" onClick={Bookingstatus}>
                        Booking
                      </Button>
                    }
                  </Grid>
                  {shows && (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => {
                          // handleFileChange(e.target.files[0]);
                          setimageUplaod(e.target.files[0]);
                        }}
                      />
                      <br />
                      <Button variant="primary" onClick={handleFileUpload}>
                        Upload
                      </Button>
                      <Button variant="primary" onClick={() => setShows(false)}>
                        cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        {/* <Button variant="primary" onClick={handleShows}>
          Upload File
        </Button> */}

        <Modal show={show} onHide={handleCloses} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>My Revenue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img
                    className="profileimage"
                    src="https://static-00.iconduck.com/assets.00/wallet-icon-1964x2048-g8f5z6u3.png"
                    alt="Wallet"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="col-md-6">
                  <h2>Amount: ₹{money}</h2>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloses}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
