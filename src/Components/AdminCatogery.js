import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axiosInstance from "../axios/axios";

function Admincatogery() {
  const [userDetails, setuserDetails] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState("block"); // Default action is blocking

  useEffect(() => {
    const storedDetails = localStorage.getItem("catodetails");
    if (storedDetails) {
      const parsedData = JSON.parse(storedDetails);
      const arr = [];
      arr.push(parsedData);
      if (parsedData) {
        setuserDetails(parsedData);
      }
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3 col-lg-2 bg-light p-3 vh-100 d-flex flex-column border border-black">
          {/* Sidebar Content Goes Here */}
          <Button className="my-2">Dashboard</Button>
          <Button className="my-2">User</Button>
          <Button className="my-2">Trainer</Button>
          <Button className="my-2">Catogery</Button>
          <Button className="my-2">
            <Link
              to="/trainerapproval"
              style={{ color: "white" }}
              className="my-2"
            >
              Adminapproval
            </Link>
          </Button>
        </div>
        {/* Main Content Column */}
        <div className="col-md-9 col-lg-10 text-center">
          <h1 className="mb-4" style={{ fontSize: "2rem" }}>
            Catogery
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {userDetails &&
                userDetails.map((user) => (
                  <tr key={user.id}>
                    {
                      <>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.description}</td>
                      </>
                    }
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Admincatogery;
