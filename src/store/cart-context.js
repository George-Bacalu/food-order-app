import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  isShown: false,
  showCart: () => {},
  hideCart: () => {},
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
});

export default CartContext;
