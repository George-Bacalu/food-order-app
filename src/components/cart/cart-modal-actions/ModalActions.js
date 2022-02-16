import { useContext } from "react";
import classes from "./ModalActions.module.css";
import CartContext from "../../../store/cart-context";

const ModalActions = props => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  return (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={cartCtx.hideCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={props.onOrder}>Order</button>}
    </div>
  );
};

export default ModalActions;
