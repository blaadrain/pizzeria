import React from 'react';

export default function Categories({ id, onChangeCategory }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            className={id === i ? 'active' : 0}
            onClick={() => onChangeCategory(i)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
