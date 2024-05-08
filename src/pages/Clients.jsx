import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import CreateClient from "../components/CreateClient";
import UpdateClient from "../components/UpdateClient";
import Controls from "../components/controls/Controls";
import { Box, Container, Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import getClient from "../libs/Clients/getClient";
import deleteClient from "../libs/Clients/deleteClient";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); //Cliente seleccionado
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const titles = ["Nombre", "Mascota", "Dirección", "Contacto"];
  const fields = ["name", "animalname", "address", "contact"];

  const fetchData = async () => {
    const res = await getClient();
    setClients(res.Client);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  const handleNew = () => {
    setIsFormVisible(!isFormVisible);
    if (isUpdateVisible) {
      setIsUpdateVisible(false);
    }
  };

  const handleUpdate = () => {
    setIsUpdateVisible(!isUpdateVisible);
    if (isFormVisible) {
      setIsFormVisible(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteClient(clients[selectedRow]._id);
      console.log("Delete successful", res);
      fetchData();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Clientes</h1>
            </Grid>
            <Grid item xs={6}>
              <Controls.MyTable
                titles={titles}
                content={clients}
                fields={fields}
                selectable={true}
                onRowSelect={handleRowSelect}
              />
            </Grid>
            {isFormVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <CreateClient
                  refreshData={fetchData}
                  hide={() => setIsFormVisible(false)}
                />
              </Grid>
            )}
            {isUpdateVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <UpdateClient
                  refreshData={fetchData}
                  hide={() => setIsUpdateVisible(false)}
                  client={clients[selectedRow]}
                />
              </Grid>
            )}
          </Grid>
        </Container>
        <Controls.MyFab
          icon={isFormVisible ? <CloseIcon /> : <AddIcon />}
          onClick={handleNew}
        />
        {selectedRow !== null && (
          <Controls.MyFab
            icon={isUpdateVisible ? <CloseIcon /> : <EditIcon />}
            onClick={handleUpdate}
            x="20px"
            y="100px"
          />
        )}
        {selectedRow !== null && (
          <Controls.MyFab
            icon={<DeleteIcon />}
            x="20px"
            y="180px"
            onClick={handleDelete}
          />
        )}
      </Box>
    </>
  );
}
