import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginScreen() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sing In</h1>

          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
              ></Form.Control>
            </Form.Group>

            <Button type="button" variant="primary">
              Sing In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer? <Link to={`/register`}> Register</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
