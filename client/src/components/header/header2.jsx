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

const Header2 = () => {
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
                  <a>Logout</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "1vh" }}></div>
        <Container>
          <Navbar className="navbar-expand-lg h1-nav">
            <Collapse isOpen={isOpen} navbar id="header1">
              <img src={logo} alt="wrapkit" />
              <Nav navbar className="ms-auto">
                <NavItem className="active">
                  <NavLink href="/psychologists">Psychologists</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/chat">Chatbot</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Psychiatrist services
                    <i className="fa fa-angle-down m-l-5"></i>
                  </DropdownToggle>
                  <DropdownMenu className="b-none animated fadeInUp">
                    <DropdownItem>Video Conferencing</DropdownItem>
                    <DropdownItem>Book Psychologists</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="/blog">About Us</NavLink>
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
export default Header2;
