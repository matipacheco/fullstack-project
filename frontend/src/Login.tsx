import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

export default function Login() {
  const [submitEnabled, setSubmitEnabled] = useState(false);

  return (
    <div className="credentials-form">
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div className={`btn btn-primary ${submitEnabled}`}>
            Login
          </div>
        </Form>
      </Container>
    </div>
  )
}
