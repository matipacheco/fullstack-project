import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
import Login from '../Login';

test('Enables submit button only when all inputs are filled', async () => {
  render(<Login />);

  const submitButton = screen.queryByText('Login');
  expect(submitButton).toHaveClass('disabled');

  const usernameInput = screen.getByPlaceholderText('Enter username');
  fireEvent.change(usernameInput, { target: { value: 'username' } });

  expect(submitButton).toHaveClass('disabled');

  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(submitButton).not.toHaveClass('disabled');
});


test('Displays spinner after submit', async () => {
  render(<Login />);

  expect(screen.queryByRole('status')).not.toBeInTheDocument();

  const submitButton = screen.queryByText('Login');

  const usernameInput = screen.getByPlaceholderText('Enter username');
  fireEvent.change(usernameInput, { target: { value: 'username' } });

  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.click(submitButton);

  expect(screen.getByRole('status')).toBeInTheDocument();
});
