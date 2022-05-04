import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const filmNameInput = 'Harry Potter'

test('Renders film input', async () => {
  render(<App />);

  await waitFor(() => screen.getByLabelText(/Film/i))
  const filmName = screen.getByLabelText(/Film/i);
  expect(filmName).toBeInTheDocument();

  const clearButtonEmpty = screen.queryByTestId("deleteButton")
  expect(clearButtonEmpty).toBeNull();

  const searchButtonEmpty = screen.queryByTestId("searchButton")
  expect(searchButtonEmpty).toBeNull();

  fireEvent.change(filmName, { target: { value: filmNameInput } })

  const clearButton = screen.queryByTestId("deleteButton")
  expect(clearButton).toBeInTheDocument();

  const searchButton = screen.queryByTestId("searchButton")
  expect(searchButton).toBeInTheDocument();
});

test('Fill and clear input', () => {
  render(<App />);

  const filmName = screen.getByLabelText(/Film/i);
  fireEvent.change(filmName, { target: { value: filmNameInput } })
  const filmNameFinded = screen.getByDisplayValue(filmNameInput)
  expect(filmNameFinded).toBeInTheDocument();

  const clearButton = screen.queryByTestId("deleteButton")
  fireEvent.click(clearButton!)
  const filmNameFindedEmpty = screen.queryByDisplayValue(filmNameInput)
  expect(filmNameFindedEmpty).toBeNull();
});

