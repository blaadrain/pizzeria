import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortByItem = {
  name: string;
  value: 'популярности' | 'цене' | 'алфавиту';
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortBy: SortByItem;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortBy: {
    name: 'rating',
    value: 'популярности',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    changeCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    changeSortBy(state, action: PayloadAction<SortByItem>) {
      state.sortBy = action.payload;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;
export const selectSortBy = (state: RootState) => state.filters.sortBy;

export const { changeSearchValue, changeCategoryId, changeSortBy } =
  filterSlice.actions;

export default filterSlice.reducer;
