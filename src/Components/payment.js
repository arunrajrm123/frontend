import React from "react";
import { Button, Card } from "react-bootstrap";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axiosInstance from "../axios/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export function Payment() {
  const handlesubsc = () => {
    const cookieData = Cookies.get("subscriptiondetials");
    console.log("haii", cookieData);
    const parsedData = JSON.parse(cookieData);
    console.log("haii", parsedData);
    const datas = {
      userid: parsedData.userid,
      trainerid: parsedData.trianerid,
    };
    console.log(datas);
    axiosInstance.post("suscription/", datas).then((res) => {
      console.log(res.data.message);
      if (res.data.message === "already subscribed") {
        alert("Already subscribed");
        console.log("already");
      } else {
        toast.success("successfully subscribed");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Center vertically on the screen
      }}
    >
      <Card style={{ width: "300px" }}>
        <Card.Body>
          <Card.Title className="align-items-center">Payment</Card.Title>
          <PayPalButtons
            onClick={handlesubsc}
            style={{
              layout: "horizontal",
              color: "gold", // Customize the button color
              shape: "rect", // Customize the button shape
              label: "paypal", // Customize the button label
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "10.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              const cookieData = Cookies.get("subscriptiondetial");
              const parsedData = JSON.parse(cookieData);
              const datas = {
                userid: parsedData.userid,
                trainerid: parsedData.trianerid,
              };
              return actions.order.capture().then(function (details) {
                alert("Payment completed. Thank you, ");
                const pid = details.id;
                axiosInstance.post("suscription/", datas).then((res) => {
                  console.log(details.id, details.payer.payment_method);
                });
              });
            }}
          />
        </Card.Body>
        <Button>click</Button>
      </Card>
    </div>
  );
}
