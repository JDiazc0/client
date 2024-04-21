import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";
import CreateInventory from "../components/CreateInventory";
import UpdateInventory from "../components/UpdateInventory";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import getInventory from "../libs/getInventory";
import deleteInventory from "../libs/deleteInventory";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const titles = ["Producto", "Cantidad"];
  const fields = ["product.name", "amount"];

  const fetchData = async () => {
    const res = await getInventory();
    setData(res.Inventory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  const handleNewInventory = () => {
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
      const res = await deleteInventory(data[selectedRow]._id);
      console.log("Delete successful", res);
      fetchData();
    } catch (e) {
      console.error("Error deleting product", e);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Inventario</h1>
            </Grid>
            <Grid item xs={6}>
              <Controls.MyTable
                titles={titles}
                content={data}
                fields={fields}
                selectable={true}
                onRowSelect={handleRowSelect}
              />
            </Grid>
            {isFormVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <CreateInventory
                  refreshData={fetchData}
                  hide={() => setIsFormVisible(false)}
                />
              </Grid>
            )}
            {isUpdateVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <UpdateInventory
                  inventory={data[selectedRow]}
                  refreshData={fetchData}
                  hide={() => setIsUpdateVisible(false)}
                />
              </Grid>
            )}
          </Grid>
        </Container>
        <Controls.MyFab
          icon={isFormVisible ? <CloseIcon /> : <AddIcon />}
          onClick={handleNewInventory}
        />
        {selectedRow !== null && (
          <Controls.MyFab
            icon={isUpdateVisible ? <CloseIcon /> : <EditIcon />}
            x="20px"
            y="100px"
            onClick={handleUpdate}
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
