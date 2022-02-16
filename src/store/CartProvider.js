import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0, isShown: false };

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else updatedItems = state.items.concat(action.item);
    return { items: updatedItems, totalAmount: updatedTotalAmount, isShown: state.isShown };
  } else if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.amount === 1) updatedItems = state.items.filter(item => item.id !== action.id);
    else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount, isShown: state.isShown };
  } else if (action.type === "SHOW_CART") return { items: state.items, totalAmount: state.totalAmount, isShown: true };
  else if (action.type === "HIDE_CART") return { items: state.items, totalAmount: state.totalAmount, isShown: false };
  else if (action.type === "CLEAR_CART") return { items: [], totalAmount: 0, isShown: state.isShown };
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isShown: cartState.isShown,
    showCart: () => dispatchCartAction({ type: "SHOW_CART" }),
    hideCart: () => dispatchCartAction({ type: "HIDE_CART" }),
    addItem: item => dispatchCartAction({ type: "ADD_ITEM", item }),
    removeItem: id => dispatchCartAction({ type: "REMOVE_ITEM", id }),
    clearCart: () => dispatchCartAction({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
