import { React, useState } from "react";
import axios from "axios";
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

export default function LoginForm() {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function userLogin() {
    if (userEmail === "" || password === "") {
      alert("Please Enter userEmail and password");
    } else {
      axios
        .post("localhost:3001/getUser", {
          userEmail: email,
          password: userPass,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data["loginMessage"] === true) {
            navigation.navigate("ProfileScreen", {
              facultyInitial: userEmail,
            });
          }
        })
        .catch((error) => alert("Wrong email or password"));
    }
  }

  return (
    <div>
      <div className="spacer" id="logForm">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">Login</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email Address or Phone Number</Label>
                <Input
                  onChangeCapture={setEmail}
                  type="email"
                  className="form-control"
                  id="userEmail"
                  placeholder="Enter email or Phone"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChangeCapture={setPassword}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>

              <FormGroup className="col-md-12 ml-3">
                <Input id="checkbox1" type="checkbox" />
                <Label htmlFor="checkbox1"> Remember me </Label>
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
}
