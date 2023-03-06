import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="App">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<HomePage searchValue={searchValue} />}
            />
            <Route
              path="/cart"
              element={<CartPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
