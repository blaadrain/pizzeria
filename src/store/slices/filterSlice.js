import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    changeCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    changeSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { changeCategoryId, changeSortBy } = filterSlice.actions;

export default filterSlice.reducer;
