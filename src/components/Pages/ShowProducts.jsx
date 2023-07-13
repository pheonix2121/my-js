import React, { useContext } from "react";

import styles from "./ShowProducts.module.css";
import Product from "../UI/Product";
import ItemContex from "../../Store/item-context";

const ShowProducts = () => {
  const itemCtx = useContext(ItemContex);
  return (
    <div className={styles.container}>
      <h1>Available Products</h1>
      <ul>
        {itemCtx.items.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ShowProducts;