import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSortBy } from '../store/slices/filterSlice';

export default function Sort() {
  const dispatch = useDispatch();
  const sortObj = useSelector((state) => state.filters.sortBy);

  const sortBy = [
    { name: 'rating', value: 'популярности' },
    { name: 'price', value: 'цене' },
    { name: 'title', value: 'алфавиту' },
  ];
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  function changeCurrentSortBy(sort) {
    dispatch(changeSortBy(sort));
    setIsPopupActive(false);
  }

  function changeIsPopupActive() {
    setIsPopupActive((prevIsPopupActive) => !prevIsPopupActive);
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className={`sort__svg${isPopupActive ? '--flipped' : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировать по:</b>
        <div className="sort__span-wrapper">
          <span onClick={changeIsPopupActive}>{sortObj.value}</span>
        </div>
      </div>
      <div className={`sort__popup${isPopupActive ? '' : '--hidden'}`}>
        <ul>
          {sortBy.map((sort) => (
            <li
              key={sort.name}
              className={sortObj.value === sort.value ? 'active' : ''}
              onClick={() => changeCurrentSortBy(sort)}
            >
              {sort.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
