import React, { useState, useEffect } from "react";
import profile from "../Assets/bg4.jpg";
import { useStopwatch } from "react-timer-hook";
import "./Session.css";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Table,
  Row,
  Col,
} from "reactstrap";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/footer";

const Session = () => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionTime, setSessionTime] = useState(null);
  const handleSessionToggle = () => {
    if (sessionStarted) {
      const sessionEndTime = new Date();
      const sessionDuration = {
        hours,
        minutes,
        seconds,
      };
      setSessionTime(sessionDuration);
      reset();
      setSessionStarted(false);
    } else {
      start();
      setSessionStarted(true);
    }
  };
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    localStorage.setItem("session", hours + ":" + minutes + ":" + seconds);
  }, [seconds, hours, minutes]);
  let timeValue = localStorage.getItem("session");
  return (
    <>
      <div>
        <Sidebar/>
        <Navbar />

      </div>
      <div>

      <Row className="justify-content-center card-container">
        <Col md="auto">
          <Card body outline className="card card-margin">
            <img
              alt="Profile"
              src={userDetails.imageUrl}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "100%",
                marginTop: "5%",
              }}
            />
            <CardBody className="profile">
              <div style={{ textAlign: "center" }}>
                <CardTitle tag="h5">My Profile</CardTitle>
              </div>

              <CardText>
                <Table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <th>-</th>
                      <th>{userDetails.name}</th>{" "}
                    </tr>
                    <tr>
                      <td>Job Title</td>
                      <th>-</th>
                      <th>Software Engineering</th>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <th>-</th>
                      <th>QwikSpark</th>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <th>-</th>
                      <th>9876543210</th>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <th>-</th>
                      <th>{userDetails.email}</th>
                    </tr>
                  </tbody>
                </Table>
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md="auto">
          <Card body outline className="card">
            <CardBody>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={handleSessionToggle}
                  className={sessionStarted ? "session-start" : "session-end"}
                >
                  {sessionStarted ? "End Session" : "Start Session"}
                </button>
                {sessionStarted && (
                  <div style={{ fontSize: " 40px" }}>
                    {/* <span>{hours}</span>:<span>{minutes}</span>:
                    <span>{seconds}</span> */}
                    {timeValue}
                  </div>
                )}
                {!sessionStarted && sessionTime && (
                  <div style={{ fontSize: "20px" }}>
                    Session Duration: {sessionTime.hours}h {sessionTime.minutes}
                    m {sessionTime.seconds}s
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
      <Footer/>
      
    </>
  );
};

export default Session;
