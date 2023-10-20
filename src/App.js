import Footer from "./Components/Footer";
import Loginuser from "./Components/Loginuser";
import BasicExample from "./Components/Nav";
import SignUpuser from "./Components/SignUpuser";
import Home from "./Components/Home";
import Authcontext from "./context/context";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import Dashboard from "./Components/Dashboard";
import AdminLogg from "./Components/AdminLogin";
import AdminHome from "./Components/AdminHome";
import Trainersignup from "./Components/Trainersignup";
import Trainerlogin from "./Components/Trainerlogin";
import Adminapproval from "./Components/admapproval";
import Admintrainer from "./Components/AdmTrainer";
import Category from "./Components/Catogery";
import TrainerDashboard from "./Components/TrainerDash";
import Courses from "./Components/Course";
import TrainerVideoupload from "./Components/videoupload";
import Trainerallvideos from "./Components/Trainerallvideo";
import UserCourse from "./Components/Trainerallvideo";
import UserCourseview from "./Components/usercourseview";
import UserTrainerView from "./Components/TrainerView";
import UserTrainerViews from "./Components/UserAdminview";
import Admincatogery from "./Components/AdminCatogery";
import Subscribedtrainers from "./Components/Subscribedtrains";
import Email from "./Components/Email";
import { Payment } from "./Components/payment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Subscribedtrains from "./Components/Subscribedtrains";
import SlotAdder from "./Components/Slotadding";
import AppointmentSlots from "./Components/TrainerSlots";
import Avilableslots from "./Components/avilableslots";
import UserAappointmentStatus from "./Components/UserAppStatus";
import MyuerSlots from "./Components/Bookingstatuschange";
import AdminAppointmentView from "./Components/AdminAppointmentView";
import AdminBookingView from "./Components/AdminBookingView";
import Mysub from "./Components/MYsubscribers";
import AdminDash from "./Components/AdminDash";
import App1 from "./Components/videocall";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
  );
  const [userDecode, setUserDecode] = useState(
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : ""
  );
  const [adminaccessToken, setadminAccessToken] = useState(
    localStorage.getItem("adminaccessToken")
      ? localStorage.getItem("adminaccessToken")
      : ""
  );

  const [traineraccesstoken, setTarinerAccessToken] = useState(
    localStorage.getItem("trainerauthToken")
      ? localStorage.getItem("trainerauthToken")
      : ""
  );
  const [tarinerDecode, setTrainerDecode] = useState(
    localStorage.getItem("trainerauthToken")
      ? jwt_decode(localStorage.getItem("trainerauthToken"))
      : ""
  );

  return (
    <Router>
      <div>
        <PayPalScriptProvider
          options={{
            clientId:
              "ASpXvcbUiQwYFynq7a3Zcq_6wl01RCjs8bWLrK6qnS0849faRnajyygp5sKfuAW2ITAE7EP7FeK7US9T",
          }}
        >
          <Authcontext.Provider
            value={{
              accessToken,
              setAccessToken,
              userDecode,
              setUserDecode,
              adminaccessToken,
              setadminAccessToken,
              traineraccesstoken,
              setTarinerAccessToken,
              tarinerDecode,
              setTrainerDecode,
            }}
          >
            <Routes>
              <Route path="/payment" element={<Payment />} />
              <Route path="/admindash" element={<AdminDash />} />
              <Route path="/myuserstatus" element={<MyuerSlots />} />
              <Route path="/myusers" element={<Mysub />} />
              <Route path="/videocall" element={<App1 />} />
              <Route
                path="/adminappointview"
                element={<AdminAppointmentView />}
              />
              <Route path="/adminbookingview" element={<AdminBookingView />} />
              {<Route path="/" exact element={<Home />} />}
              <Route path="/signup" element={<SignUpuser />} />
              <Route path="/slot/:id" element={<SlotAdder />} />
              <Route path="/slots/:id" element={<Avilableslots />} />
              <Route path="/myslots" element={<AppointmentSlots />} />
              <Route path="/appstatus" element={<UserAappointmentStatus />} />
              <Route path="/subscribedt" element={<Subscribedtrainers />} />
              <Route path="/specificcourse" element={<UserCourseview />} />
              <Route path="/subscribedtrains" element={<Subscribedtrains />} />
              <Route path="/trainerfulldetail" element={<UserTrainerViews />} />
              <Route path="/allvideos" element={<Trainerallvideos />} />
              <Route path="/specifictriner" element={<UserTrainerView />} />
              <Route path="/videoupload" element={<TrainerVideoupload />} />
              <Route path="/admincato" element={<Admincatogery />} />
              {<Route path="/adminlogin" element={<AdminLogg />} />}
              {<Route path="/adminhome" element={<AdminHome />} />}
              {<Route path="/login" element={<Loginuser />} />}
              {<Route path="/trainerdash" element={<TrainerDashboard />} />}
              {<Route path="/cato" element={<Category />} />}
              {<Route path="/course" element={<Courses />} />}
              {<Route path="/email" element={<Email />} />}
              {/* {<Route path="/course" element={<C />} />} */}
              {<Route path="/trainerapproval" element={<Adminapproval />} />}
              {<Route path="/trainersignup" element={<Trainersignup />} />}
              {<Route path="/trainerlogin" element={<Trainerlogin />} />}
              {<Route path="/trainerdetails" element={<Admintrainer />} />}
              {<Route path="/dash" element={<Dashboard />} />}
            </Routes>
          </Authcontext.Provider>
        </PayPalScriptProvider>
      </div>
    </Router>
  );
}

export default App;
