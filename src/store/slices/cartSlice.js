import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalItems: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   // Здесь можно напрямую пушить в стейт,
    //   // потому что в RTK стейты проксируются
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, item) => {
    //     return sum + item.price;
    //   }, 0);
    // },
    addItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.typeId === action.payload.typeId &&
          item.sizeId === action.payload.sizeId
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalItems += 1;
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    removeItem(state, action) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.typeId === action.payload.typeId &&
          item.sizeId === action.payload.sizeId
      );

      if (findItem)
        findItem.count > 1
          ? findItem.count--
          : (state.items = state.items.filter(
              (item) =>
                !(
                  item.id === action.payload.id &&
                  item.typeId === action.payload.typeId &&
                  item.sizeId === action.payload.sizeId
                )
            ));

      state.totalItems -= 1;
      state.totalPrice -= findItem.price;
    },
    clear(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clear } = cartSlice.actions;

export default cartSlice.reducer;
