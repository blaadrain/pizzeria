import React from 'react';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <input
      className={styles.root}
      placeholder="Найти пиццу"
      onChange={(event) => setSearchValue(event.target.value)}
      value={searchValue}
    />
  );
};

export default Search;
