import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import SearchClient from "../components/SearchClient";
import OrderList from "../components/OrderList";

export default function CreateOrder() {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleOrderSubmitSuccess = () => {
    setSelectedClientId(null);
    setRefreshKey((prevKey) => prevKey + 1);
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
              <SearchClient
                key={refreshKey}
                onSelectClient={handleClientSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <OrderList
                key={refreshKey}
                clientId={selectedClientId}
                onOrderSubmitSuccess={handleOrderSubmitSuccess}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
