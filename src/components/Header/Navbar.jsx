import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import CartContext from "../../Store/cart-context";
const Navbar = (props) => {
  const cartCtx = useContext(CartContext);
  const totalCartQuantity = cartCtx.items.reduce((currQuantity, item) => {
    return currQuantity + item.cartAmount;
  }, 0);
  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>Tshirt Seller</h1>
      <ul className={styles.items}>
        <li className={styles.item}>
          <NavLink to="/">Products</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/add-products">Add Products</NavLink>
        </li>
        <li className={styles.item} onClick={props.openCartHandler}>
          <span className={styles.amount}>{totalCartQuantity}</span>
          <span className={styles.cart}>My Cart</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;