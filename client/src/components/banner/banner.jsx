import React, { useState } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../../assets/images/logos/mental-health.png";

const HeaderBanner = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const backgroundImageStyle = {
    backgroundImage: "url('src/assets/images/therapy.webp')",
    backgroundSize: "120% auto", // Adjust the size as needed
    backgroundPosition: "100% 50%", // Adjust the horizontal and vertical position
    opacity: "70%",
  };

  const containerStyle = {
    //background: "url('src/assets/images/landingpage/banner-bg.jpg')",
    backgroundSize: "auto",
    backgroundPosition: "center",
    color: "white",
    padding: "20px",
    height: "1px", // Adjust the height according to your needs
    overflow: "hidden",
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
    <div>
      <div style={containerStyle}></div>
      <div className="spacer"></div>
      <div className="header1 po-relative">.</div>
      <div>
        <Row class="align-self-center text-center col-md-6">
          <Col lg="8" md="6" className="align-self-center text-center">
            <div style={backgroundImageStyle}>
              <h1
                style={{
                  textAlign: "right",
                  fontFamily: "Lucida console", // Change the font family
                  fontSize: "36px", // Adjust the font size
                  fontWeight: "bold", // Set the font weight to bold
                  color: "#0D3952",
                }}
              >
                Embrace Wellness, Transform Lives: <br /> Your Journey to Mental
                Well-being Starts Here!
                <br />
                Discover a Haven of Support, Empowerment,
                <br /> and Healing.
                <br />
                Your Mental Health Matters – <br />
                Let's Navigate the Path <br /> to Wholeness Together.
              </h1>
            </div>
            <div style={{ height: "1vh" }}></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderBanner;
