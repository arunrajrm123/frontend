/* <MDBContainer
fluid
className="d-flex place-item-column align-items-center justify-content-center bg-image"
>
<div className="mask gradient-custom-3"></div>
<MDBCard className="m-5" style={{ maxWidth: "600px" }}>
  <MDBCardBody className="px-5">
    <h2 className="text-uppercase text-center mb-5">Upload Video</h2>
    <MDBInput
      wrapperClass="mb-4"
      label="Video Name"
      size="lg"
      id="form1"
      type="text"
      value={user.value.name}
      onChange={(e) => dispatch(changeName(e.target.value))}
    />
    <MDBInput
      wrapperClass="mb-4"
      label="Description"
      size="lg"
      id="form2"
      type="text"
      value={user.value.email}
      onChange={(e) => dispatch(changeDescription(e.target.value))}
    />

    <MDBInput
      wrapperClass="mb-4"
      label="Upload Video"
      size="lg"
      id="form5"
      type="file"
      onChange={(e) => {
        dispatch(changeVideo(e.target.files[0]));
        setimageUpload(e.target.files[0]);
      }}
    />

    <div className="d-flex flex-row justify-content-center mb-4">
      <MDBCheckbox
        name="flexCheck"
        id="flexCheckDefault"
        label="I agree all statements in Terms of service"
      />
    </div>

    <p>{uploadMessage}</p>
    <div className="d-flex ">
      <progress value={uploadProgress} max="100" />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  </MDBCardBody>
</MDBCard>
</MDBContainer> */

import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axiosInstance from "../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDescription,
  changeName,
  changeVideo,
} from "../Slices/videouploadslice";

import { useNavigate } from "react-router-dom";
import Authcontext from "../context/context";
import BasicExample from "./Nav";
import Footer from "./Footer";
import { storage } from "../fireconfig/firebase";

function TrainerVideoupload() {
  const [imageupload, setimageUpload] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.videoupload);
  const { userDecode } = useContext(Authcontext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleSubmit = () => {
    if (imageupload == null) {
      console.log("No image selected");
      return;
    }

    const imageRef = ref(storage, `videos/${imageupload.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageupload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setUploadMessage(`Uploading: ${Math.round(progress)}%`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploadMessage("Error uploading image");
      },
      () => {
        console.log("Upload completed");
        setUploadMessage("Upload completed");

        getDownloadURL(imageRef)
          .then((url) => {
            const parsit = JSON.parse(localStorage.getItem("trainerdetails"));
            const userid = parsit.id;
            const datas = {
              id: userid,
              name: user.value.name,
              description: user.value.description,
              video: url,
            };

            axiosInstance
              .post("uploadvideo/", datas)
              .then((res) => {
                console.log(res.data);
                localStorage.setItem(
                  "videooftrain",
                  JSON.stringify(res.data.vid)
                );
                navigate("/trainerdash");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.error("Error getting download URL:", err);
            setUploadMessage("Error getting download URL");
          });
      }
    );

    uploadTask.then(() => {});
  };

  return (
    <>
      <BasicExample />
      <MDBContainer
        fluid
        className="d-flex place-item-column align-items-center justify-content-center bg-image"
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Upload Video</h2>
            <label htmlFor="form1">Video Name</label>
            <MDBInput
              wrapperClass="mb-4"
              size="lg"
              id="form1"
              type="text"
              value={user.value.name}
              onChange={(e) => dispatch(changeName(e.target.value))}
            />
            <label htmlFor="form1">Description</label>
            <MDBInput
              wrapperClass="mb-4"
              size="lg"
              id="form2"
              type="text"
              value={user.value.email}
              onChange={(e) => dispatch(changeDescription(e.target.value))}
            />
            <label htmlFor="form1">uplaod video</label>
            <MDBInput
              wrapperClass="mb-4"
              size="lg"
              id="form5"
              type="file"
              onChange={(e) => {
                dispatch(changeVideo(e.target.files[0]));
                setimageUpload(e.target.files[0]);
              }}
            />

            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree to all statements in Terms of Service"
              />
            </div>
            <div className="d-flex flex-row justify-content-center mb-4">
              <progress value={uploadProgress} max="100" />
            </div>
            <p>{uploadMessage}</p>
            <div className="d-flex flex-row justify-content-center">
              <button onClick={handleSubmit}>Upload</button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <Footer />
    </>
  );
}

export default TrainerVideoupload;

// import React, { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import "./Dashboard.css";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBCheckbox,
// } from "mdb-react-ui-kit";

// import BasicExample from "./Nav";
// import Footer from "./Footer";
// import { storage } from "../fireconfig/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import axiosInstance from "../axios/axios";
// import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
// import { useContext } from "react";
// import Authcontext from "../context/context";
// import { useNavigate } from "react-router-dom";
// import {
//   changeDescription,
//   changeName,
//   changeVideo,
// } from "../Slices/videouploadslice";
// import { useDispatch, useSelector } from "react-redux";
// function TrainerVideoupload() {
//   const [imageupload, setimageUpload] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.videoupload);
//   const {
//     userDecode,
//     setUserDecode,
//     accessToken,
//     setAccessToken,
//     setadminAccessToken,
//     traineraccesstoken,
//     setTrainerDecode,
//   } = useContext(Authcontext);
//   const handleSubmit = () => {
//     console.log("Handle submit function called");

//     if (imageupload == null) {
//       console.log("No image selected");
//       return;
//     }

//     const imageRef = ref(storage, `videos/${imageupload.name + v4()}`);

//     // Upload the image to Firebase Storage
//     uploadBytes(imageRef, imageupload)
//       .then((res) => {
//         console.log(res, "imageres");
//         return getDownloadURL(imageRef); // Return the download URL promise
//       })
//       .then((url) => {
//         console.log(url);
//         const parsit = JSON.parse(localStorage.getItem("trainerdetails"));
//         const userid = parsit.id;
//         console.log(userid);
//         const datas = {
//           id: userid,
//           name: user.value.name,
//           description: user.value.description,
//           video: url,
//         };

//         // Send the data with the image URL to your server
//         axiosInstance
//           .post("uploadvideo/", datas)
//           .then((res) => {
//             console.log(res.data);
//             localStorage.setItem("videooftrain", JSON.stringify(res.data.vid));
//             navigate("/trainerdash");
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => {
//         console.error("Error uploading image:", err);
//         // Handle the error appropriately
//       });
//   };
//   return (
//     <>
//       <BasicExample />
//       <MDBContainer
//         fluid
//         className="d-flex align-items-center justify-content-center bg-image"
//       >
//         <div className="mask gradient-custom-3"></div>
//         <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
//           <MDBCardBody className="px-5">
//             <h2 className="text-uppercase text-center mb-5">Upload Video</h2>
//             <MDBInput
//               wrapperClass="mb-4"
//               label="Video Name"
//               size="lg"
//               id="form1"
//               type="text"
//               value={user.value.name}
//               onChange={(e) => dispatch(changeName(e.target.value))}
//             />
//             <MDBInput
//               wrapperClass="mb-4"
//               label="Description"
//               size="lg"
//               id="form2"
//               type="text"
//               value={user.value.email}
//               onChange={(e) => dispatch(changeDescription(e.target.value))}
//             />

//             <MDBInput
//               wrapperClass="mb-4"
//               label="Upload Viedo"
//               size="lg"
//               id="form5"
//               type="file"
//               onChange={(e) => {
//                 dispatch(changeVideo(e.target.files[0]));
//                 setimageUpload(e.target.files[0]);
//               }}
//             />

//             <div className="d-flex flex-row justify-content-center mb-4">
//               <MDBCheckbox
//                 name="flexCheck"
//                 id="flexCheckDefault"
//                 label="I agree all statements in Terms of service"
//               />
//             </div>

//             <button onClick={handleSubmit}> Upload</button>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBContainer>
//       <Footer />
//     </>
//   );
// }

// export default TrainerVideoupload;
