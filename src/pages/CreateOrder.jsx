import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import SearchClient from "../components/SearchClient";
import OrderList from "../components/OrderList";

export default function CreateOrder() {
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

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
              <SearchClient onSelectClient={handleClientSelect} />
            </Grid>
            <Grid item xs={12}>
              <OrderList clientId={selectedClientId} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
