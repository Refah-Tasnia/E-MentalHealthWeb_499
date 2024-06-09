/* eslint-disable */
import React from "react";
import { Row, Col, Container, Card } from "reactstrap";

import img1 from "../../../assets/images/blog/blog-home/img3.jpg";
import img2 from "../../../assets/images/blog/blog-home/img2.jpg";
import img3 from "../../../assets/images/blog/blog-home/img1.jpg";

const BlogComponent = () => {
  return (
    <div>
      <div className="spacer bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" className="text-center">
              <h2 className="title">Recent Blogs</h2>
              <h6 className="subtitle"></h6>
            </Col>
          </Row>
          <Row className="m-t-40 justify-content-center">
            <Col lg="4" md="6">
              <Card>
                <a href="#">
                  <img
                    className="card-img-top"
                    src={img1}
                    alt="wrappixel kit"
                  />
                </a>
                <div className="date-pos bg-info-gradiant">
                  Oct<span>23</span>
                </div>
                <h5 className="font-medium m-t-30">
                  <a href="#" className="link">
                    Mental Health Talk 101
                  </a>
                </h5>
                <p className="m-t-20">Your Mental Health matters</p>
                <a href="#" className="linking text-themecolor m-t-10">
                  See More <i className="ti-arrow-right"></i>
                </a>
              </Card>
            </Col>
            <Col lg="4" md="6"></Col>
            <Col lg="4" md="6">
              <Card>
                <a href="#">
                  <img
                    className="card-img-top"
                    src={img3}
                    alt="wrappixel kit"
                  />
                </a>
                <div className="date-pos bg-info-gradiant">
                  Oct<span>23</span>
                </div>
                <h5 className="font-medium m-t-30">
                  <a href="#" className="link">
                    Learn from small things to create something bigger.
                  </a>
                </h5>
                <p className="m-t-20"></p>
                <a href="#" className="linking text-themecolor m-t-10">
                  See More <i className="ti-arrow-right"></i>
                </a>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BlogComponent;
