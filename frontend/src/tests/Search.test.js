import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

test('Empty search returns error', async () => {
  render(<Search />);

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByText('Type something out')).toBeInTheDocument();
});

test('Submits the search and disables button after click', async () => {
  render(<Search />);

  const searchInput = screen.getByPlaceholderText('Find a cool GIF!');
  fireEvent.change(searchInput, { target: { value: 'Some search term' } });
  fireEvent.click(screen.getByRole('button'));

  expect(screen.queryByText('Type something out')).not.toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});
