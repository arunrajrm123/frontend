import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SignalCellularNullOutlined } from "@mui/icons-material";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Authcontext from "../context/context";
import ReactPaginate from "react-paginate";
function AdminAppointmentView() {
  const [slots, setSlots] = useState([]);
  const [noSlot, setNoslot] = useState(false);
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(" ");
  const {
    userDecode,
    setUserDecode,
    accessToken,
    setAccessToken,
    adminaccessToken,
    setadminAccessToken,
  } = useContext(Authcontext);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const navigate = useNavigate();
  const handleLogout = () => {
    setadminAccessToken("");

    navigate("/adminlogin");
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displaySlots = slots
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((slot) => (
      <div style={{ border: "3px solid black" }}>
        <ListItem key={slot.id} divider>
          <ListItemText
            primary={`Date: ${slot.date}`}
            secondary={`Time: ${slot.time}`}
          />
          <button>{slot.trainer_data.name}</button>
        </ListItem>
      </div>
    ));
  useEffect(() => {
    axiosInstance.get("adminappoint/").then((res) => {
      setSlots(res.data);
    });
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-3 col-lg-2 bg-light p-3 d-flex flex-column border border-black"
            style={{ height: "100vh" }}
          >
            {/* Content */}

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
          <div className="col-md-9 col-lg-10 text-center">
            <Typography
              variant="h5"
              gutterBottom
              className="text-center justify-content-center"
            >
              Appointment Slots
            </Typography>
            <Container>
              {noSlot ? (
                <Alert
                  className="text-center justify-content-center"
                  severity="info"
                >
                  No Slots Available
                </Alert>
              ) : (
                <div>
                  <List>{displaySlots}</List>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(slots.length / itemsPerPage)}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                  />
                </div>
              )}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAppointmentView;
