import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizzas,
  },
});

// глобальный стейт в котором  содержатся все слайсы
// ReturnType - превращает содержимое функции в ее тип
export type RootState = ReturnType<typeof store.getState>;
