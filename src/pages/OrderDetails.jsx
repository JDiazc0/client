import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";
import getOrder from "../libs/Order/getOrder";
import getInventory from "../libs/Inventory/getInventory";
import {
  transformProductsData,
  calculateMaterialsWithInventory,
  filterInventoryData,
} from "../libs/utils/calculationUtils";
import {
  updateOrCreateBalance,
  updateInventoryForOrder,
  removeOrder,
} from "../libs/utils/orderUtils";

export default function OrderDetails() {
  const [orderPrice, setOrderPrice] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const productTitles = [
    "Nombre del Producto",
    "Cantidad",
    "Precio",
    "Precio Total",
  ];
  const productFields = ["name", "quantity", "price", "totalPrice"];

  const materialTitles = [
    "Nombre materia prima",
    "Cantidad unidades",
    "Cantidad (gr)",
    "Precio Total",
  ];
  const materialFields = [
    "material",
    "unitsToBuy",
    "totalQuantity",
    "totalCost",
  ];

  const inventoryTitles = ["Nombre del Producto", "Cantidad"];
  const inventoryFields = ["name", "quantity"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrder(id);
        const orderData = res.Order;

        const inventoryRes = await getInventory();
        const inventoryData = inventoryRes.Inventory;

        const filteredInventory = filterInventoryData(orderData, inventoryData);

        setOrderPrice(orderData.price);
        setProductsData(transformProductsData(orderData));
        setMaterialsNeeded(
          calculateMaterialsWithInventory(orderData, inventoryData)
        );
        setInventoryData(transformInventoryData(filteredInventory));
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleFinishOrder = async () => {
    const materialsCost = materialsNeeded.reduce(
      (acc, material) => acc + material.totalCost,
      0
    );

    console.log({ products: productsData }, inventoryData);

    await updateOrCreateBalance(orderPrice, materialsCost);
    await updateInventoryForOrder({ products: productsData }, inventoryData);
    await removeOrder(id);

    navigate(`/lista-pedidos`);
  };

  // Function to transform inventory data
  const transformInventoryData = (inventory) => {
    return inventory.map((item) => {
      console.log("invetory", item);
      return {
        inventory_id: item._id,
        product_id: item.product._id,
        name: item.product.name,
        quantity: item.amount,
      };
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Detalles del pedido</h1>
          </Grid>
          <Grid item xs={12}>
            <h3>Productos pedidos</h3>
            <Controls.MyTable
              titles={productTitles}
              fields={productFields}
              content={productsData}
              tax={true}
              total={orderPrice}
              textTax={"Total pedido"}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Productos en Inventario</h3>
            <Controls.MyTable
              titles={inventoryTitles}
              fields={inventoryFields}
              content={inventoryData}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Materias Primas</h3>
            <Controls.MyTable
              titles={materialTitles}
              fields={materialFields}
              content={materialsNeeded}
              tax={true}
              total={materialsNeeded.reduce(
                (acc, material) => acc + material.totalCost,
                0
              )}
              textTax={"Costo total de materias"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "50px 0",
            }}>
            <Controls.MyButton
              text={"Terminar pedido"}
              variant={"contained"}
              onClick={handleFinishOrder}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
