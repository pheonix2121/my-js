import React from "react";
import ReactDOM from "react-dom";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartId = document.getElementById("cart");
  const item = {
    name: "Levi",
    price: 2111,
    amount: 8,
    size: "L"
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.blur}>
          <div className={styles.conainter}>
            <button
              onClick={props.closeCartHandler}
              className={styles["close-cart"]}
            >
              Close
            </button>
            <ul>
              {cartCtx.items.map((item) => (
                <CartItem key={item.cartId} item={item} selectedSize={item.size} />
              ))}
            </ul>
            <div className={styles.summary}>
              <h3 className={styles["total-amount"]}>
                Rs. {cartCtx.items.length === 0 ? 0 : cartCtx.totalAmount}
              </h3>
              <button className={styles["place-order"]}>Place Order</button>
            </div>
          </div>
        </div>,
        cartId
      )}
    </>
  );
};

export default Cart;