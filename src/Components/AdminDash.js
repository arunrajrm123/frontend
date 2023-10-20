import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";
import { useContext } from "react";
import Authcontext from "../context/context";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Title, Legend);

function AdminDash() {
  const [userDetails, setuserDetails] = useState([]);
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState("block"); // Default action is blocking
  const { setadminAccessToken } = useContext(Authcontext);

  const [graph, setGraph] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Amount",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [0, 0], // Initialize with default values
        backgroundColor: ["red", "blue"],
      },
    ],
    labels: ["Trainers", "Users"],
  });
  const showConfirmModal = (userId, action) => {
    setSelectedUserId(userId);
    setAction(action);
    setShowConfirmationModal(true);
  };

  const hideConfirmModal = () => {
    setShowConfirmationModal(false);
  };

  const performAction = () => {
    const data = {
      id: selectedUserId,
    };

    const endpoint = action === "block" ? "blockuser/" : "unblockuser/";

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
          "alluserdetails",
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
  const handleLogout = () => {
    setadminAccessToken("");

    navigate("/adminlogin");
  };

  useEffect(() => {
    axiosInstance.get("admindashboard").then((res) => {
      const { m, n } = res.data;
      const data = {
        datasets: [
          {
            data: [m, n],
            backgroundColor: ["red", "blue"],
          },
        ],
        labels: ["Trainers", "Users"],
      };
      setChartData(data);

      const { months, total_amounts } = res.data.data;
      console.log(months, total_amounts);

      //   const labels = months.map((entry) => entry["month"].strftime("%B %Y"));
      //   const datas = total_amounts.map((entry) => entry["total_amount"]);
      setGraph({
        labels: months,
        datasets: [
          {
            label: "Total Amount",
            data: total_amounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3 col-lg-2 bg-light p-3 vh-100 d-flex flex-column border border-black">
          {/* Sidebar Content Goes Here */}
          <Button className="my-2">Dashboard</Button>
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
        <div className="col-md-9 col-lg-10 justify-content-center">
          <h1 className="mb-4" style={{ fontSize: "2rem" }}>
            Dashboard
          </h1>
          <div className="d-flex justify-content-center">
            <div style={{ width: "30%", height: "30%" }}>
              <Pie data={chartData}>Total Users&Trainers</Pie>
            </div>
            <div style={{ width: "30%", height: "30%" }}>
              <Pie data={graph}>Cash Recevied in Each month</Pie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
