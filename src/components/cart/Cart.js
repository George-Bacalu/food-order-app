import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../ui/Modal";
import PostSubmitModal from "./cart-modal-actions/PostSubmitModal";
import CartModalContent from "./cart-modal-actions/CartModalContent";

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState();
  const cartCtx = useContext(CartContext);

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Something went wrong!");
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      setHttpError(err.message);
    }
  };

  let modalContent = "";
  if (httpError) modalContent = <h2>{httpError}</h2>;
  else if (isSubmitting) modalContent = <h2>Your order is being processed...</h2>;
  else if (didSubmit) modalContent = <PostSubmitModal />;
  else modalContent = <CartModalContent isCheckout={isCheckout} onSubmit={submitOrderHandler} onOrder={orderHandler} />;

  return <Modal onClose={props.onHideCart}>{modalContent}</Modal>;
};

export default Cart;
