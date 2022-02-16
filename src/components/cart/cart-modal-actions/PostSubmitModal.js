import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./PostSubmitModal.module.css";

const PostSubmitModal = () => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      <p className={classes["success-message"]}>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={cartCtx.hideCart}>Close</button>
      </div>
    </>
  );
};

export default PostSubmitModal;
