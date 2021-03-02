import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { AppContext } from './context/Context';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { handleEnterKey } from './utils/accessibility';
import { signup } from './utils/requests';

/**
 * @function Signup
 * Component in charge of collecting the user's data,
 * and submitting it to the API's so that a new user gets created.
 */

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [user, setUser] = useState({ username: '', password: '', password_confirmation: '' });

  const appContext = useContext(AppContext);

  useEffect(() => {
    setSubmitEnabled(!_.isEmpty(user.username) && !_.isEmpty(user.password) && !_.isEmpty(user.password_confirmation));
  }, [user]);

  const doSignup = () => {
    setLoading(true);

    if (!_.isEmpty(errors)) {
      setErrors(false);
    }

    signup(user, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    setLoading(false);

    if (response.logged_in) {
      appContext.updateUser(response.user);
    } else {
      setErrors(response.errors);
    }
  };

  const handleError = () => {
    setLoading(false);

    appContext.updateError(true);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    doSignup();
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnKeyUp = (event) => {
    event.preventDefault();

    if (submitEnabled) {
      handleEnterKey(event, doSignup);
    }
  };

  return (
    <div className="credentials-form">
      {!_.isEmpty(appContext.user) && <Redirect to="/" />}

      <Container className="centered">
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

            {errors.username && <Form.Text className="red">{errors.username[0]}</Form.Text>}
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

            {errors.password && <Form.Text className="red">{errors.password[0]}</Form.Text>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Password confirmation"
              onChange={handleOnChange}
              onKeyUp={handleOnKeyUp}
            />

            {user.password !== user.password_confirmation && (
              <Form.Text className="red">passwords do not match</Form.Text>
            )}
          </Form.Group>

          <div className={`btn btn-primary ${submitEnabled ? '' : 'disabled'}`} onClick={handleOnClick}>
            {loading ? (
              <Spinner as="span" animation="border" variant="light" size="sm" role="status" />
            ) : (
              'Create account'
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
}
