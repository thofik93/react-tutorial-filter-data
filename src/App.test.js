import { render, screen } from '@testing-library/react';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import usersReducer from './store/usersSlice';
import filtersReducer from './store/filtersSlice'

function renderCustom(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { users: usersReducer, filters: filtersReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return ( <Provider store={store}>
                <BrowserRouter>
                {children}
                </BrowserRouter>
          </Provider> )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

test('renders react tutorial filter data', () => {
  renderCustom(<App />);

  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toHaveDisplayValue("All");
  expect(screen.getByRole("button", { name: "Reset Filter" })).toBeInTheDocument();
  expect(screen.getByRole("table")).toHaveClass("table");
  expect(screen.getByRole("list")).toHaveClass("pagination");
});
