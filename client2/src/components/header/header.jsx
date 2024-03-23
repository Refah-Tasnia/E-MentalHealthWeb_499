/* eslint-disable */
import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
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
import { useNavigation } from "react-router-dom";
import logo from "../../assets/images/logos/mental-health.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const titleStyle = {
    fontSize: "10px",
    lineHeight: "1",
    textAlign: "center",
  };
  const subtitleStyle = {
    fontSize: "18px",
    fontLight: "font-light",
    textAlign: "center",
  };
  const backgroundImageStyle = {
    backgroundImage: "url('src/assets/images/landingpage/banner-bg.jpg')",
    backgroundSize: "cover",

    backgroundPosition: "center",
  };

  const navbarStyle = {
    height: "80px", // Adjust the height as needed
  };
  return (
    <div className="topbar" id="top">
      <div className="header6">
        <div style={backgroundImageStyle}>
          <div class="align-self-center text-center col-md-6">
            <div className="align-self-center text-center">
              <h1>NLP-Integrated Smart Web System for E-Mental Health</h1>
              <h6> Your Path to Mental Wellness: Where AI Meets Empathy</h6>
              <div className="text-right">
                <Link to={"/login"} className="ml-auto mr-2">
                  <a href="/login">Login</a>
                </Link>

                <Link to={"/register"} className="ml-auto">
                  <a href="/register">Register</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "1vh" }}></div>
        <Container>
          <Navbar className="navbar-expand-lg h1-nav" style={navbarStyle}>
            <Collapse isOpen={isOpen} navbar id="header1">
              <img src={logo} alt="wrapkit" />
              <Nav navbar className="ms-auto">
                <NavItem className="active">
                  <NavLink
                    style={{
                      fontSize: "14px",
                      padding: "5px 10px",
                    }}
                    href="/psychologists"
                  >
                    Psychologists
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ fontSize: "14px", padding: "5px 10px" }}
                    href="/chat"
                  >
                    Chatbot
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle
                    nav
                    style={{ fontSize: "14px", padding: "5px 10px" }}
                  >
                    Psychiatrist services
                    <i className="fa fa-angle-down m-l-5"></i>
                  </DropdownToggle>
                  <DropdownMenu className="b-none animated fadeInUp">
                    <DropdownItem>
                      <Link to="/videoHome">Video Conferencing </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/psychologists">Book Psychologists </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink
                    style={{ fontSize: "14px", padding: "5px 10px" }}
                    href="/about"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ fontSize: "14px", padding: "5px 10px" }}
                    href="/blog"
                  >
                    Blog Posts
                  </NavLink>
                </NavItem>
              </Nav>

              <div className="act-buttons">
                {/* <Link to="/#coming" className="btn btn-success-gradiant font-14">Upgrade To Pro</Link> */}
              </div>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};
export default Header;
