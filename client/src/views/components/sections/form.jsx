import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const PageForm = () => {
  return (
    <div>
      <div className="spacer" id="forms-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold" id="regHeader">
                Register
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name">First Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter First Name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Surname"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="name">Age</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your age"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="name">Date of Birth</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your Date of birth"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="confirmpwd">Confirm Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="confirmpwd"
                  placeholder="Confirm Password"
                />
              </FormGroup>

              <Col md="12">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  Submit
                </Button>
                <Button
                  type="submit"
                  className="btn btn-inverse waves-effect waves-light"
                >
                  Cancel
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageForm;
