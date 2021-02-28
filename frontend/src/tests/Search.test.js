import { rest } from 'msw';
import { setupServer } from 'msw/node';

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Search from '../Search';

test('disables button when search is performed', async () => {
  render(<Search />);

  fireEvent.click(screen.getByText('Search'));

  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});
