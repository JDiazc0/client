import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";

import getOrders from "../libs/Order/getOrders";

import Edit from "@mui/icons-material/Edit";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const titles = ["Cliente", "Mascota", "Dirección", "Costo"];
  const fields = [
    "client.name",
    "client.animalname",
    "client.address",
    "price",
  ];

  const fetchData = async () => {
    const res = await getOrders();
    setOrders(res.Order);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  const handleFabClick = () => {
    if (selectedRow !== null) {
      const selectedOrderId = orders[selectedRow]._id;
      navigate(`/detalles-pedido/${selectedOrderId}`);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Pedidos</h1>
            </Grid>
            <Grid item xs={12}>
              <Controls.MyTable
                titles={titles}
                fields={fields}
                content={orders}
                selectable={true}
                onRowSelect={handleRowSelect}
              />
            </Grid>
          </Grid>
        </Container>
        <Controls.MyFab icon={<Edit />} onClick={handleFabClick} />
      </Box>
    </>
  );
}
