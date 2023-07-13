import React, { useContext, useState } from "react";

import styles from "./Product.module.css";
import CartContext from "../../Store/cart-context";
import ItemContext from "../../Store/item-context";

const Product = ({ item }) => {
  const cartCtx = useContext(CartContext);
  const itemCtx = useContext(ItemContext);
  const [selectedSize, setSelectedSize] = useState("s");

  const addToCartHandler = () => {
    cartCtx.addItem({
      cartId: item._id,
      name: item.name,
      price: item.price,
      cartAmount: 1,
      size: selectedSize,
    });
    itemCtx.removeQuantity(item._id);
  };

  const sizeChangeHandler = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <li className={styles.list}>
      <h2 className={styles.name}>{item.name}</h2>
      <em className={styles.description}>{item.description}</em>
      <span className={styles.price}>Rs. {item.price}</span>
      <label>Select Size
      <select className={styles.size} value={selectedSize} onChange={sizeChangeHandler}>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select></label>
      <span className={styles.quantity}>Available Quantity - {item.quantity}</span>
      <button onClick={addToCartHandler} className={styles["add-to-cart"]}>
        Add To Cart
      </button>
    </li>
  );
};

export default Product;