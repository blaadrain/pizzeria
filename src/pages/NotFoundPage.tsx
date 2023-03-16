import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <div className="not-found">
        <h2 className="not-found__title">Ничего не найдено :(</h2>
        <Link
          to="/"
          className="not-found__link"
        >
          Вернуться на главную страницу
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
