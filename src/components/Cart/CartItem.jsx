import React, { useCallback, useContext } from "react";

import styles from "./CartItem.module.css";
import CartContext from "../../Store/cart-context";
import ItemContext from "../../Store/item-context";
const CartItem = ({ item, selectedSize }) => {
  const cartCtx = useContext(CartContext);
  const itemCtx = useContext(ItemContext);
  const addToCartHandler = () => {
    cartCtx.addItem({
      cartId: item.cartId,
      name: item.name,
      price: item.price,
      cartAmount: 1,
      size: selectedSize,
    });
    itemCtx.removeQuantity(item.cartId);
  };

  const removeFromCartHandler = () => {
    cartCtx.removeItem({
      _id: item._id,
      cartId: item.cartId,
      name: item.name,
      price: item.price,
      cartAmount: item.cartAmount,
    });
    itemCtx.addQuantity(item.cartId);
  };
  return (
    <li className={styles.list}>
      <h3 className={styles.name}>{item.name}</h3>
      <div className={styles.details}>
        <h5 className={styles.price}>Rs. {item.price}</h5>
        <span className={styles.amount}>x {item.cartAmount}</span>
        <span className={styles.details}>{selectedSize} Size</span>

      </div>
      <div className={styles.actions}>
        <button onClick={removeFromCartHandler} className={styles.reduce}>
          -
        </button>
        <button onClick={addToCartHandler} className={styles.increase}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;