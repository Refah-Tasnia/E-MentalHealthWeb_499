import React from "react";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { HashLink as Link } from "react-router-hash-link";

const HeaderBanner = () => {
  const containerStyle = {
    background: "url('src/assets/images/landingpage/banner-bg.jpg')",
    backgroundSize: "cover",
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
    color: "white",
    padding: "30px",
    textDecoration: "none",
    position: "relative",
  };

  const navLinkSquareStyle = {
    display: "inline-block",
    border: "1px solid white",
    borderRadius: "20px",
    padding: "5px 20px",
    opacity: "0.7",
  };

  Object.assign(navLinkStyle, navLinkSquareStyle);

  return (
    <div style={containerStyle} className="static-slider-head">
      <Container>
        {/* Navigation Bar */}
        <Navbar expand="lg" className="justify-content-end">
          <div style={{ height: "35vh" }}></div>
          <Nav className="ml-auto">
            <Link to="/" className="nav-link" style={navLinkStyle}>
              Contact
            </Link>
            <Nav className="nav-link" style={navLinkStyle}>
              Psychiatrist Services
            </Nav>
            <Link to="#" className="nav-link" style={navLinkStyle}>
              Chatbot
            </Link>
            <Link to="/blog" className="nav-link" style={navLinkStyle}>
              Blog Post
            </Link>
          </Nav>
        </Navbar>

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

            <h2 className="title" style={sectionTitleStyle}>
              About Us
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Welcome to E-mental Health, your trusted platform for mental
              health support and guidance. At E-mental Health, we are dedicated
              to improving the mental well-being of individuals through
              accessible and professional mental health services.
            </p>
            <div style={{ height: "1vh" }}></div>
            <h2 className="title" style={sectionTitleStyle}>
              Our Mission
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Our mission is to provide a safe and supportive environment for
              individuals seeking mental health assistance. We believe that
              mental health is a fundamental aspect of overall well-being, and
              everyone deserves access to quality mental health care. Through
              our platform, we aim to:
            </p>
            <div style={{ height: "1vh" }}></div>
            <h3 className="mission-point" style={missionPointStyle}>
              Promote Awareness:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Raise awareness about mental health issues and reduce the stigma
              surrounding them.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              Provide Support:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Offer a range of services to support individuals in their mental
              health journey.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              Connect You:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Connect individuals with experienced and compassionate mental
              health professionals.
            </p>
            <div style={{ height: "1vh" }}></div>
            <h2 className="title" style={sectionTitleStyle}>
              Who We Are
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              E-mental Health is a team of dedicated professionals to make
              mental health support easily accessible to all. Our experts bring
              a wealth of experience and a commitment to providing confidential,
              evidence-based care.
            </p>
            <div style={{ height: "1vh" }}></div>
            <h2 className="title" style={sectionTitleStyle}>
              What We Offer
            </h2>

            <h3 className="mission-point" style={missionPointStyle}>
              Psychological Support:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Our licensed psychologists and counselors are here to listen,
              support, and guide you through life's challenges. Whether you're
              dealing with stress, anxiety, depression, or relationship issues,
              we're here to help.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              Online Assessments:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Take advantage of our online assessments to gain insights into
              your mental health. These assessments can help you better
              understand your emotions and well-being.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              Blogs and Resources:
            </h3>
            <p className="mission-description" style={missionDescriptionStyle}>
              Explore our collection of informative blogs and resources on
              mental health topics. We aim to educate and empower individuals to
              take control of their mental health.
            </p>
            <div style={{ height: "1vh" }}></div>
            <h2 className="title" style={sectionTitleStyle}>
              Your Mental Health Matters
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              We understand that seeking help for mental health concerns can be
              a significant step. Your well-being is important to us, and we are
              committed to providing you with the support and resources you
              need.
              <br></br>
              At E-mental Health, we believe that everyone deserves to live a
              happy and mentally healthy life. Together, we can work towards a
              brighter, more balanced future.
              <br></br>
              If you have any questions or would like to learn more about our
              services, please don't hesitate to get in touch.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBanner;
/*

<UncontrolledDropdown nav inNavbar style={navLinkStyle}>
                <DropdownToggle nav className="fa fa-angle-down m-l-5">
                  Psychiatrist services
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
*/
