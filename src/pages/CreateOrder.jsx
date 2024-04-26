import React from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";
import SearchClient from "../components/SearchClient";
import OrderList from "../components/OrderList";

export default function () {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Crear Pedido</h1>
            </Grid>
            <Grid item xs={12}>
              <SearchClient />
            </Grid>
            <Grid item xs={12}>
              <OrderList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
