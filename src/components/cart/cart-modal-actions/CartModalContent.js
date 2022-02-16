import { useContext } from "react";
import classes from "./CartModalContent.module.css";
import CartContext from "../../../store/cart-context";
import CartItems from "../CartItems";
import CheckoutForm from "../CheckoutForm";
import ModalActions from "./ModalActions"

const CartModalContent = props => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  return (
    <>
      <CartItems />
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {props.isCheckout ? <CheckoutForm onSubmit={props.onSubmit} /> : <ModalActions onOrder={props.onOrder} />}
    </>
  );
};

export default CartModalContent;
