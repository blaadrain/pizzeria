import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils.ts/calcTotalPrice';
import { getCartFromLS } from '../../utils.ts/getCartFromLS';
import { RootState } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  typeId: number;
  sizeId: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalItems: number;
  items: CartItemType[];
}

const cartData = getCartFromLS();
const totalPrice = calcTotalPrice(cartData);

const initialState: CartSliceState = {
  totalPrice,
  totalItems: cartData.length,
  items: cartData,
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
    addItem(state, action: PayloadAction<CartItemType>) {
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
    removeItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.typeId === action.payload.typeId &&
          item.sizeId === action.payload.sizeId
      );

      if (findItem) {
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
      }
    },
    deleteItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.typeId === action.payload.typeId &&
          item.sizeId === action.payload.sizeId
      );

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.typeId === action.payload.typeId &&
            item.sizeId === action.payload.sizeId
          )
      );

      if (findItem) {
        state.totalItems -= findItem.count;
        state.totalPrice -= findItem.price * findItem.count;
      }
    },
    clear(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
// Пример реализации сложного селектора из Pizza.jsx
// export const selectCartItemById = (id) => (state) =>
//   state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, deleteItem, clear } = cartSlice.actions;

export default cartSlice.reducer;
