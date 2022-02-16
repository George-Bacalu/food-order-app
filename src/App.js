import { useContext } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import CartContext from "./store/cart-context";

const App = () => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      {cartCtx.isShown && <Cart onHideCart={cartCtx.hideCart} />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
