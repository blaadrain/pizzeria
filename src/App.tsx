import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import PizzaPage from './pages/PizzaPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          path=""
          element={<HomePage />}
        />
        <Route
          path="cart"
          element={<CartPage />}
        />
        <Route
          path="pizza/:id"
          element={<PizzaPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
