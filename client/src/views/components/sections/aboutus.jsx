import React from "react";

import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const AboutUs = () => {
  const containerStyle = {
    background: "url('src/assets/images/landingpage/banner-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "20px",
  };

  const titleBorderStyle = {
    fontSize: "50px",
    borderBottom: "2px solid white",
    padding: "10px",
    display: "inline-block",
    bottom: "-5px",
  };

  const sectionTitleStyle = {
    fontSize: "35px",
    lineHeight: "1",
    textAlign: "center",
    padding: "20px",
  };

  const sectionSubtitleStyle = {
    fontSize: "18px",
    fontLight: "font-light",
    textAlign: "justify",
  };

  const missionPointStyle = {
    fontSize: "18px",
    fontLight: "font-light",
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle} className="static-slider-head">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <h2 className="title" style={titleBorderStyle}>
              About Us
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Welcome to E-mental Health, your trusted platform for mental
              health support and guidance. At E-mental Health, we are dedicated
              to improving the mental well-being of individuals through
              accessible and professional mental health services.
            </p>

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

            <h3 className="mission-point" style={missionPointStyle}>
              i. Promote Awareness:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Raise awareness about mental health issues and reduce the stigma
              surrounding them.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              ii. Provide Support:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Offer a range of services to support individuals in their mental
              health journey.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              iii. Connect You:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Connect individuals with experienced and compassionate mental
              health professionals.
            </p>

            <h2 className="title" style={sectionTitleStyle}>
              Who We Are
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              E-mental Health is a team of dedicated professionals to make
              mental health support easily accessible to all. Our experts bring
              a wealth of experience and a commitment to providing confidential,
              evidence-based care.
            </p>

            <h2 className="title" style={sectionTitleStyle}>
              What We Offer
            </h2>

            <h3 className="mission-point" style={missionPointStyle}>
              i. Psychological Support:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Our licensed psychologists and counselors are here to listen,
              support, and guide you through life's challenges. Whether you're
              dealing with stress, anxiety, depression, or relationship issues,
              we're here to help.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              ii. Online Assessments:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Take advantage of our online assessments to gain insights into
              your mental health. These assessments can help you better
              understand your emotions and well-being.
            </p>

            <h3 className="mission-point" style={missionPointStyle}>
              iii. Blogs and Resources:
            </h3>
            <p className="subtitle" style={sectionSubtitleStyle}>
              Explore our collection of informative blogs and resources on
              mental health topics. We aim to educate and empower individuals to
              take control of their mental health.
            </p>

            <h2 className="title" style={sectionTitleStyle}>
              Your Mental Health Matters
            </h2>
            <p className="subtitle" style={sectionSubtitleStyle}>
              We understand that seeking help for mental health concerns can be
              a significant step. Your well-being is important to us, and we are
              committed to providing you with the support and resources you
              need. At E-mental Health, we believe that everyone deserves to
              live a happy and mentally healthy life. Together, we can work
              towards a brighter, more balanced future.
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

export default AboutUs;
