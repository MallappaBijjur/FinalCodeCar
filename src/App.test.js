import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  const { queryByTestId } = render(<App />);
  const linkElement = queryByTestId(/app-main/i);
  expect(linkElement).toBeInTheDocument();
});

xit("should render CarDetailsPage page for /car/:stockNumber" , async ()=> {
  window.location.href = "/car/1234";
  const { getByText } = render(<App />);
  const linkElement =await waitForElement( ()=> getByText(/Save/i));
  expect(linkElement).toBeInTheDocument();
})
