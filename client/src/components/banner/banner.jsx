import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../../views/components/sections/login";

const HeaderBanner = () => {
  const handleClick = () => {
    <Router>
      <Routes>
        <Route
          path="../../views/components/sections/login"
          element={<LoginForm />}
        />
      </Routes>
    </Router>;
  };
  return (
    <div className="static-slider-head">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <h4 className="title" style={{ fontSize: "35px", lineHeight: "1" }}>
              NLP-Integrated Smart Web System for E-Mental Health
            </h4>
            <h4 className="subtitle font-light">
              Your Path to Mental Wellness: Where AI Meets Empathy
            </h4>

            <Link to="/login">
              <button className="btn btn-outline-light m-r-20 btn-md m-t-30 font-14">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-md m-t-30 btn-info-gradiant font-14">
                Sign Up
              </button>
            </Link>
            {/* <Link to="/#coming" className="btn btn-md m-t-30 btn-info-gradiant font-14">Upgrade To Pro</Link> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBanner;
