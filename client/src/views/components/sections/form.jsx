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
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.email == "" || values.name == "" || values.phone == "") {
      alert("Please Enter necessary details");
      return;
    } else {
      if (values.password !== values.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (values.phone.length < 11) {
        alert("Please enter a valid 11-digit phone number");
        return;
      }
    }
    axios
      .post("http://localhost:3001/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Error");
        }
      })
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
            <Form className="row" onSubmit={handleSubmit}>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
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
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
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
                <Link
                  to={"/"}
                  className="btn btn-inverse waves-effect waves-light"
                >
                  Back to home
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>
        <div>.</div>
        <div>
          <a>Already a member?</a>
          <Link to={"/login"} className="linking text-themecolor m-t-10">
            Login
          </Link>
        </div>
        <div className="spacer"></div>
      </Container>
    </div>
  );
};

export default Register;
