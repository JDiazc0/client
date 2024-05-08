import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import { Grid } from "@mui/material";

import getProducts from "../libs/Products/getProducts";
import uploadOrder from "../libs/Order/uploadOrder";

export default function OrderList(props) {
  const { clientId, onOrderSubmitSuccess } = props;

  const [products, setProducts] = useState([]); //Listado de productos
  const [selectedProduct, setSelectedProduct] = useState(""); // Producto seleccionado
  const [quantity, setQuantity] = useState(""); // Cantidad del producto
  const [orderList, setOrderList] = useState([]); // Productos en la orden
  const [totalOrder, setTotalOrder] = useState(""); //Costo total de la orden
  const [formValid, setFormValid] = useState(true); // Validador de producto y cantidad

  const titles = ["Descripción", "CANT", "Precio unitario", "Monto"];
  const fields = ["name", "quantity", "unitPrice", "totalPrice"];

  const fetchData = async () => {
    const res = await getProducts();
    setProducts(res.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    if (selectedProduct && quantity) {
      const selectedProductData = products.find(
        (item) => item._id === selectedProduct
      );
      const totalPrice = Number(selectedProductData.price) * Number(quantity);
      const total = Number(totalOrder) + totalPrice;
      setOrderList([
        ...orderList,
        {
          value: selectedProduct,
          name: selectedProductData.name,
          quantity: quantity,
          unitPrice: selectedProductData.price,
          totalPrice: totalPrice,
        },
      ]);
      setTotalOrder(total);
      setSelectedProduct("");
      setQuantity("");
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleDelete = () => {
    const newOrderList = [...orderList];
    const lastItem = newOrderList.pop();
    setOrderList(newOrderList);

    if (lastItem) {
      setTotalOrder((prevTotal) => prevTotal - lastItem.totalPrice);
    }
  };

  const handleCreateOrder = async () => {
    if (clientId != null) {
      const productsToSend = orderList.map((products) => ({
        product: products.value,
        quantity: Number(products.quantity),
      }));

      try {
        const response = await uploadOrder(
          clientId,
          productsToSend,
          Number(totalOrder)
        );
        console.log("Upload successful", response);
        onOrderSubmitSuccess();
      } catch (error) {
        console.error("Error uploading order", error);
      }
    } else {
      alert("Por favor, Seleccione o digite los datos de un cliente");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: "flex", gap: "10px" }}>
            <Controls.MySelector
              label="Productos"
              quantitylabel="Cantidad"
              data={products}
              value={selectedProduct}
              onChange={setSelectedProduct}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            {!formValid && (
              <p style={{ color: "red" }}>Por favor completa ambos campos.</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", gap: "10px" }}>
            <Controls.MyButton
              text="Añadir"
              type="button"
              size={180}
              variant="outlined"
              onClick={handleAdd}
            />
            {orderList.length >= 1 && (
              <Controls.MyButton
                text="Eliminar"
                type="button"
                variant="contained"
                size={180}
                onClick={handleDelete}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Controls.MyTable
            titles={titles}
            fields={fields}
            content={orderList}
            tax={true}
            total={totalOrder}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.MyButton
            text="Finalizar pedido"
            type="button"
            variant="contained"
            onClick={handleCreateOrder}
          />
        </Grid>
      </Grid>
    </>
  );
}
