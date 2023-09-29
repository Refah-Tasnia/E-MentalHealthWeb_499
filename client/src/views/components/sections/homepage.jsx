/* eslint-disable */
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

import img1 from "../../../assets/images/ui/img6.jpg";
import img2 from "../../../assets/images/ui/5.jpg";
import img3 from "../../../assets/images/ui/img5.jpg";

import logo from "../../../assets/images/logos/green-logo.png";
import logo2 from "../../../assets/images/logos/white-logo.png";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div id="section">
      <div className="spacer">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold" id="homeHeader">
                Home Page
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="header1 po-relative">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="subtitle">Welcome!</h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Navbar className="navbar-expand-lg h1-nav">
            <NavbarBrand href="#">
              <img src={logo} alt="wrapkit" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar id="header1">
              <Nav navbar className="ms-auto mt-2 mt-lg-0">
                <NavItem className="active">
                  <NavLink href="#">Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Blog</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Chatbot</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Psychiatrist services{" "}
                    <i className="fa fa-angle-down m-l-5"></i>
                  </DropdownToggle>
                  <DropdownMenu className="b-none animated fadeInUp">
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem>Separated link</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>One more separated link</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <a className="btn btn-outline-success" href="#">
                    Logout
                  </a>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
      <div>
        <div className="spacer" id="imgs-component"></div>
      </div>
    </div>
  );
};

export default Home;
