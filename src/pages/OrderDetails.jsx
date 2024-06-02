import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";

import getOrder from "../libs/Order/getOrder";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [orderPrice, setOrderPrice] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [materialsNeeded, setMaterialsNeeded] = useState([]);
  const { id } = useParams();

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
    "Cantidad gramos",
    "Precio Total",
  ];
  const materialFields = [
    "material",
    "unitsToBuy",
    "totalQuantity",
    "totalCost",
  ];

  const fetchData = async () => {
    try {
      const res = await getOrder(id);
      const orderData = res.Order;
      setOrder(orderData);
      setOrderPrice(orderData.price);
      calculateMaterials(orderData);
      transformProductsData(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const calculateMaterials = (order) => {
    const materialsMap = {};

    order.products.forEach((orderProduct) => {
      const product = orderProduct.product;
      const quantity = orderProduct.quantity;

      product.materials.forEach((material) => {
        const materialId = material.material._id;
        const requiredQuantity = material.quantity * quantity;

        if (!materialsMap[materialId]) {
          materialsMap[materialId] = {
            material: material.material,
            totalQuantity: 0,
          };
        }

        materialsMap[materialId].totalQuantity += requiredQuantity;
      });
    });

    const materialsList = Object.values(materialsMap).map((materialData) => {
      const { material, totalQuantity } = materialData;
      const unitsToBuy = Math.ceil(totalQuantity / material.weight);
      const totalCost = unitsToBuy * material.cost;

      return {
        material: material.name,
        totalQuantity,
        unitsToBuy,
        totalCost,
      };
    });

    setMaterialsNeeded(materialsList);
  };

  const transformProductsData = (order) => {
    const products = order.products.map((orderProduct) => {
      return {
        name: orderProduct.product.name,
        quantity: orderProduct.quantity,
        price: orderProduct.product.price,
        totalPrice:
          Number(orderProduct.quantity) * Number(orderProduct.product.price),
      };
    });
    setProductsData(products);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    console.log(productsData);
  }, [productsData]);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Detalles del pedido</h1>
          </Grid>
          <Grid item xs={12}>
            <h3>Productos</h3>
            <Controls.MyTable
              titles={productTitles}
              fields={productFields}
              content={productsData}
              tax={true}
              total={orderPrice}
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
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
