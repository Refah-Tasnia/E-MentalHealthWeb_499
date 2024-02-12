import { React, useState } from "react";

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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/homepage");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div>
      <div className="spacer" id="logForm">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h3 className="title font-bold">Login</h3>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form className="row" onSubmit={handleSubmit}>
              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email Address or Phone Number</Label>
                <Input
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="form-control"
                  id="email"
                  placeholder="Enter email or Phone"
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

              <FormGroup className="col-md-12 ml-3">
                <Input id="checkbox1" type="checkbox" />
                <Label htmlFor="checkbox1"> Remember me </Label>
              </FormGroup>
              <Col md="12">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  Submit
                </Button>

                <Link to="/">
                  <Button className="btn btn-inverse waves-effect waves-light">
                    Back to home
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>{" "}
        <div>.</div>
        <div>
          <a>Not a member yet?</a>
          <Link to={"/register"} className="linking text-themecolor m-t-10">
            Sign Up
          </Link>
        </div>
        <div className="spacer"></div>
      </Container>
    </div>
  );
}
