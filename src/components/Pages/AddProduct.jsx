import React, { useContext, useRef } from "react";
import styles from "./AddProduct.module.css";
import ItemContext from "../../Store/item-context";

const AddProduct = () => {
  const formRef = useRef(null);
  const itemCtx = useContext(ItemContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;

    const tshirtName = form.tshirtName.value;
    const description = form.description.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    if (!tshirtName || !description || !price || !quantity) {
      alert("Please fill in all fields properly");
      return;
    }

    itemCtx.addItem({
      name: tshirtName,
      description: description,
      price: price,
      quantity: quantity,
    });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="tshirtName"
          placeholder="Tshirt Name"
          className={styles.inputField}
        />
        <textarea
          name="description"
          placeholder="Description"
          className={styles.inputField}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className={styles.inputField}
        />
        <input
          type="number"
          name="quantity"
          step="1"
          min="1"
          placeholder="Quantity Available"
          className={styles.inputField}
        />
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;