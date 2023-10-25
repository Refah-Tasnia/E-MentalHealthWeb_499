import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  Nav,
} from "reactstrap";
import { HashLink as Link } from "react-router-hash-link";

const HeaderBanner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerStyle = {
    background: "url('src/assets/images/landingpage/banner-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "20px",
  };
  const header2Style = {
    backgroundPosition: "center",
    color: "white",
    padding: "20px",
  };
  const titleStyle = {
    fontSize: "35px",
    lineHeight: "1",
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "18px",
    fontLight: "font-light",
    textAlign: "center",
  };

  const sectionTitleStyle = {
    fontSize: "35px",
    lineHeight: "1",
    textAlign: "justify",
    color: "white",
  };

  const sectionSubtitleStyle = {
    fontSize: "18px",
    fontLight: "font-light",
    textAlign: "justify",
    color: "white",
  };

  const missionPointStyle = {
    fontSize: "18px",
    lineHeight: "1",
    fontLight: "font-light",
    textAlign: "justify",
    color: "white",
    fontWeight: "bold",
  };

  const missionDescriptionStyle = {
    fontSize: "18px",
    marginBottom: "15px",
    textAlign: "justify",
    color: "white",
  };

  const navLinkStyle = {
    fontSize: "24px",
    color: "white", // Set the color to white
    padding: "10px",
    textDecoration: "none",
    position: "relative",
  };

  const navLinkSquareStyle = {
    display: "inline-block",
    border: "1px solid white",
    borderRadius: "20px",
    padding: "5px 15px",
    opacity: "0.9",
    color: "white", // Set the color to white
  };

  Object.assign(navLinkStyle, navLinkSquareStyle);

  // Handle the dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div style={containerStyle} className="static-slider-head">
      <Container>
        <div style={header2Style}>
          <Navbar expand="lg" className="justify-content-end">
            <div style={{ height: "35vh" }}></div>
            <Nav className="ml-auto">
              <Link to="/" className="nav-link" style={navLinkStyle}>
                Psychologists
              </Link>

              <Link to="/blog" className="nav-link" style={navLinkStyle}>
                Blog Post
              </Link>
              <Link to="/chat" className="nav-link" style={navLinkStyle}>
                Chatbot
              </Link>
              <Link to="/VideoHome" className="nav-link" style={navLinkStyle}>
                Video Call
              </Link>
              <UncontrolledDropdown
                nav
                inNavbar
                isOpen={dropdownOpen}
                toggle={toggleDropdown}
                style={{ ...navLinkStyle, color: "white" }}
              >
                <DropdownToggle
                  nav
                  className="fa fa-angle-down m-l-5"
                  style={{ color: "white" }}
                >
                  Our Services
                </DropdownToggle>
                <DropdownMenu className="b-none animated fadeInUp">
                  <DropdownItem>Psychological Counseling</DropdownItem>
                  <DropdownItem>Free Mental Health Test</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Link to="/about" className="nav-link" style={navLinkStyle}>
                About Us
              </Link>
            </Nav>
          </Navbar>
        </div>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <div style={{ height: "1vh" }}></div>

            <h1 className="title font-bold" style={titleStyle}>
              NLP-Integrated Smart Web System for E-Mental Health
            </h1>
            <p className="subtitle font-light" style={subtitleStyle}>
              Your Path to Mental Wellness: Where AI Meets Empathy
            </p>
            <div style={{ height: "1vh" }}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBanner;
