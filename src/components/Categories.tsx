import React from 'react';

type CategoriesProps = {
  id: number;
  onChangeCategory: (id: number) => void;
};

const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = ({ id, onChangeCategory }) => (
  <div className="categories">
    <ul>
      {categories.map((category, i) => (
        <li
          key={category}
          className={id === i ? 'active' : '0'}
          onClick={() => onChangeCategory(i)}
        >
          {category}
        </li>
      ))}
    </ul>
  </div>
);

export default Categories;
