import React, { useEffect, useState } from "react";

import Controls from "./controls/Controls";

import getProducts from "../libs/Products/getProducts";
import uploadInventory from "../libs/Inventory/uploadInventory";

export default function CreateInventory(props) {
  const { refreshData, hide } = props;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();
      setProducts(res.products);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedProduct && amount) {
      try {
        const response = await uploadInventory(selectedProduct, Number(amount));
        console.log("uploading succesfull", response);
      } catch (error) {
        console.error("Error uploanding", error);
      }
      setFormValid(true);
      refreshData();
      hide();
    } else {
      setFormValid(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.MySelector
          label="Productos"
          quantitylabel="10"
          data={products}
          value={selectedProduct}
          onChange={setSelectedProduct}
          quantity={amount}
          onQuantityChange={setAmount}
        />
        <Controls.MyButton text="Crear" variant="contained" type="submit" />
        {!formValid && (
          <p style={{ color: "red" }}>Por favor completa ambos campos.</p>
        )}
      </form>
    </>
  );
}
