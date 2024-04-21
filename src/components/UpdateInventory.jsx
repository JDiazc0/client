import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import updateInventory from "../libs/updateInventory";

export default function UpdateInventory(props) {
  const { inventory, refreshData, hide } = props;
  const [id, setId] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (inventory) {
      setId(inventory._id);
      setProduct(inventory.product._id);
    }
  }, [inventory]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(inventory);
    console.log(id, product, amount);

    try {
      const res = await updateInventory(id, product, Number(amount));
      console.log("Update successful", res);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.InputNew
          placeholder="Nueva Cantidad"
          labeltext="Cantidad"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          required={true}
        />
        <Controls.MyButton
          text="Actualizar"
          variant="contained"
          type="submit"
        />
      </form>
    </>
  );
}
