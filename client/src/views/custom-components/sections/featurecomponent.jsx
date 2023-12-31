/* eslint-disable */
import React from "react";
import { Row, Col, Container, Card, CardBody } from "reactstrap";

import img1 from "../../../assets/images/features/feature13/img1.jpg";
import img2 from "../../../assets/images/features/feature13/img2.jpg";
import img3 from "../../../assets/images/features/feature13/img3.jpg";
import img4 from "../../../assets/images/features/feature13/img4.jpg";
import img5 from "../../../assets/images/features/feature30/img1.jpg";

const FeatureComponent = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <h2 className="title">Blog Post</h2>
      </Row>
      <div className="bg-light spacer feature20 up">
        <Container>
          <Row className="wrap-feature-20">
            <Col lg="6">
              <Card>
                <Row>
                  <Col md="8">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <img
                          src={img1}
                          width="70"
                          className="rounded"
                          alt="img"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Hello, this is my first post!
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                  <Col md="4" className="text-center">
                    <a
                      href="#"
                      className="text-white linking bg-success-gradiant"
                    >
                      Lets Talk <i className="ti-arrow-right"></i>
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <Row>
                  <Col md="8">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <img
                          src={img2}
                          width="70"
                          className="rounded"
                          alt="img"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">
                          I would like to share some problems
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                  <Col md="4" className="text-center">
                    <a
                      href="#"
                      className="text-white linking bg-success-gradiant"
                    >
                      Lets Talk <i className="ti-arrow-right"></i>
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <Row>
                  <Col md="8">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <img
                          src={img3}
                          width="70"
                          className="rounded"
                          alt="img"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">
                          It is difficult to reach out sometimes
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                  <Col md="4" className="text-center">
                    <a
                      href="#"
                      className="text-white linking bg-success-gradiant"
                    >
                      Lets Talk <i className="ti-arrow-right"></i>
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <Row>
                  <Col md="8">
                    <CardBody className="d-flex no-block">
                      <div className="m-r-20">
                        <img
                          src={img4}
                          width="70"
                          className="rounded"
                          alt="img"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">
                          New here, still figuring out
                        </h5>
                      </div>
                    </CardBody>
                  </Col>
                  <Col md="4" className="text-center">
                    <a
                      href="#"
                      className="text-white linking bg-success-gradiant"
                    >
                      Lets Talk <i className="ti-arrow-right"></i>
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="spacer ">
        <Container className="feature30">
          <Row>
            <Col lg="10">
              <img
                src={img5}
                className="rounded img-responsive"
                alt="wrappixel"
              />
            </Col>
            <Col lg="5" md="7" className="text-center wrap-feature30-box">
              <Card className="card-shadow">
                <CardBody>
                  <div className="p-20">
                    <span className="label label-info label-rounded">
                      Feature 3
                    </span>
                    <h3 className="title">
                      The New way of Making Your Website in mins
                    </h3>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience. You will love
                      it for sure.
                    </p>
                    <a
                      className="btn btn-info-gradiant btn-md btn-arrow m-t-20"
                      href="#"
                    >
                      <span>
                        Explore More <i className="ti-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FeatureComponent;

/*

  <div className="spacer feature4">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <span className="label label-danger label-rounded">
                Feature 1
              </span>
              <h2 className="title">Blog Post</h2>
              <h6 className="subtitle">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time
              </h6>
            </Col>
          </Row>
          <Row className="m-t-40">
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <h5 className="font-medium">Powerful Techniques </h5>
                  <p className="m-t-20">
                    You can relay on our amazing features list and also our
                    customer services will be great experience. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Praesent
                    tristique pellentesque ipsum.{" "}
                  </p>
                  <a className="linking text-themecolor" href="#">
                    Explore More <i className="ti-arrow-right"></i>
                  </a>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>





      
 <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <span className="label label-success label-rounded">
                Feature 2
              </span>
              <h2 className="title">Awesome with Extra Ordinary Flexibility</h2>
              <h6 className="subtitle">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time
              </h6>
            </Col>
          </Row>



           <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-star"></i>
                  </div>
                  <h5 className="font-medium">Instant Solutions</h5>
                  <p className="m-t-20">
                    You can relay on our amazing features list and also our
                    customer services will be great experience. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Praesent
                    tristique pellentesque ipsum.
                  </p>
                  <a href="#" className="linking text-themecolor">
                    Explore More<i className="ti-arrow-right"></i>
                  </a>
                </CardBody>
              </Card>
            </Col>
          */
