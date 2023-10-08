import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", values)
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };
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
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
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
                <Link to="/homepage">
                  <Button
                    type="submit"
                    className="btn btn-success waves-effect waves-light m-r-10"
                  >
                    Submit
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    type="submit"
                    className="btn btn-inverse waves-effect waves-light"
                  >
                    Back
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
