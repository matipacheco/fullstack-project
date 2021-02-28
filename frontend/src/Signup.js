import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

/**
 * @function Signup
 * Component in charge of collecting the user's data,
 * and submitting it to the API's so that a new user gets created.
 */

export default function Signup() {
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

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>PasswordConfirmation</Form.Label>
            <Form.Control type="password" placeholder="Password confirmation" />
          </Form.Group>

          <div className={`btn btn-primary ${submitEnabled ? '': 'disabled'}`}>
            Create account
          </div>
        </Form>
      </Container>
    </div>
  )
}