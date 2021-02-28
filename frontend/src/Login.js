import React, { useState, useEffect } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { login } from './utils/requests';
import { handleEnterKey } from './utils/accessibility';
import _ from 'lodash';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setSubmitEnabled(!_.isEmpty(user.username) && !_.isEmpty(user.password));
  }, [user]);

  const doLogin = () => {
    setLoading(true);

    if (showError) {
      setShowError(false);
    }

    login(user, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    setLoading(false);

    if (response.code !== 200) {
      setShowError(true);
    } else {
      
    }
  };

  const handleError = (response) => {
    setLoading(false);
    setShowError(true);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    doLogin();
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnKeyUp = (event) => {
    event.preventDefault();
    handleEnterKey(event, doLogin);
  };

  return (
    <div className="credentials-form">
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              onKeyUp={handleOnKeyUp}
            />
          </Form.Group>

          {showError && <p className="red">Incorrect username or password. Please try again.</p>}

          <div className={`btn btn-primary ${submitEnabled ? '': 'disabled'}`} onClick={handleOnClick}>
            {loading ? <Spinner as="span" animation="border" variant="light" size="sm" role="status" /> : 'Login'}
          </div>
        </Form>
      </Container>
    </div>
  );
}
