import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
import Signup from '../Signup';

test('Enables submit button only when all inputs are filled', async () => {
  render(<Signup />);

  const submitButton = screen.queryByText('Create account');
  expect(submitButton).toHaveClass('disabled');

  const usernameInput = screen.getByPlaceholderText('Enter username');
  fireEvent.change(usernameInput, { target: { value: 'username' } });

  expect(submitButton).toHaveClass('disabled');

  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
  fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

  expect(submitButton).not.toHaveClass('disabled');
});

test('Displays spinner after submit', async () => {
  render(<Signup />);

  expect(screen.queryByRole('status')).not.toBeInTheDocument();

  const submitButton = screen.queryByText('Create account');
  expect(submitButton).toHaveClass('disabled');

  const usernameInput = screen.getByPlaceholderText('Enter username');
  fireEvent.change(usernameInput, { target: { value: 'username' } });

  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
  fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

  fireEvent.click(submitButton);

  expect(screen.getByRole('status')).toBeInTheDocument();
});