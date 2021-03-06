import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AppWrapper from '../AppWrapper';

test('Redirects to signup page', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <AppWrapper />
    </Router>
  );

  expect(screen.getByText('Your favorite GIF search engine')).toBeInTheDocument();
  expect(screen.queryByText('Create your account')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('Sign up'));

  // It renders the Signup form
  expect(screen.getByText('Create your account')).toBeInTheDocument();
  expect(screen.queryByText('Log into your account')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('Login'));

  // It renders the Login form
  expect(screen.getByText('Log into your account')).toBeInTheDocument();
  expect(screen.queryByText('Create your account')).not.toBeInTheDocument();
});
