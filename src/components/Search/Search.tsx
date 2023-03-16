import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { changeSearchValue } from '../../store/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>('');

  // Функция рендерится только один раз с помощью useCallback (похоже на useEffect)
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(changeSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      className={styles.root}
      placeholder="Найти пиццу"
      onChange={onChangeInput}
      value={value}
    />
  );
};

export default Search;
