import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeSortBy,
  selectSortBy,
  SortByItem,
} from '../store/slices/filterSlice';

const sortBy: SortByItem[] = [
  { name: 'rating', value: 'популярности' },
  { name: 'price', value: 'цене' },
  { name: 'title', value: 'алфавиту' },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sortObj: SortByItem = useSelector(selectSortBy);
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  function changeCurrentSortBy(sort: SortByItem) {
    dispatch(changeSortBy(sort));
    setIsPopupActive(false);
  }

  function changeIsPopupActive() {
    setIsPopupActive((prevIsPopupActive) => !prevIsPopupActive);
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsPopupActive(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    // Эта функция отрабатывает только в случае анмаунта
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sortRef}
      className="sort"
    >
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
};

export default Sort;
