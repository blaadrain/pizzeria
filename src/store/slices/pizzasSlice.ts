import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// <что функция вернет, что функция получит>
export const fetchItems = createAsyncThunk<Pizza[], string>(
  'pizzas/fetchItems',
  async (searchParams) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6403a6883bdc59fa8f2a61db.mockapi.io/pizzeria_items${searchParams}`
    );
    return data;
  }
);

type Pizza = {
  categories: number[];
  id: string;
  imageUrl: string;
  prices: number[];
  rating: number;
  sizes: string[];
  title: string;
  types: number[];
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
