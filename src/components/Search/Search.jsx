import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  // Функция рендерится только один раз с помощью useCallback (похоже на useEffect)
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onChangeInput = (event) => {
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
