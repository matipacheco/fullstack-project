import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { AppContext } from './context/Context';
import { login } from './utils/requests';
import { handleEnterKey } from './utils/accessibility';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

/**
 * @function Login
 * Component in charge of collecting the user's credentials,
 * and submitting them to the API's authentication endpoint.
 */

export default function Login() {
  const appContext = useContext(AppContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });

  useEffect(() => {
    setSubmitEnabled(!_.isEmpty(user.username) && !_.isEmpty(user.password));
  }, [user]);

  const doLogin = () => {
    setLoading(true);

    if (!_.isEmpty(error)) {
      setError('');
    }

    login(user, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    setLoading(false);

    if (response.logged_in) {
      const user = response.user;

      appContext.updateUser(user);
    } else {
      setError(response.errors[0]);
    }
  };

  const handleError = () => {
    setLoading(false);

    appContext.updateError(true);
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

    if (submitEnabled) {
      handleEnterKey(event, doLogin);
    }
  };

  return (
    <div className="credentials-form">
      {!_.isEmpty(appContext.user) && <Redirect to="/" />}

      <Container className="centered">
        <h3>Log into your account</h3>

        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleOnChange}
              onKeyUp={handleOnKeyUp}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              onKeyUp={handleOnKeyUp}
            />

            {error && <Form.Text className="red">{error}</Form.Text>}
          </Form.Group>

          <div className={`btn btn-primary ${submitEnabled ? '' : 'disabled'}`} onClick={handleOnClick}>
            {loading ? <Spinner as="span" animation="border" variant="light" size="sm" role="status" /> : 'Login'}
          </div>
        </Form>
      </Container>
    </div>
  );
}
