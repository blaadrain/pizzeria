import { CartItemType } from '../store/slices/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((acc, item) => {
    return item.price * item.count + acc;
  }, 0);
};
