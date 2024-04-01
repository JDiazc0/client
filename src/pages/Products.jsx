import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import CreateProduct from "../components/CreateProduct";
import UpdateProduct from "../components/UpdateProduct";
import Controls from "../components/controls/Controls";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import getProducts from "../libs/getProducts";
import deleteProduct from "../libs/deleteProduct";

export default function Products() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const titles = ["Nombre", "Precio $"];
  const fields = ["name", "price"];

  const fetchData = async () => {
    const res = await getProducts();
    setData(res.produts);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(data[selectedRow]._id);
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
              <h1>Productos</h1>
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
                <CreateProduct
                  refreshData={fetchData}
                  hide={() => setIsFormVisible(false)}
                />
              </Grid>
            )}
            {isUpdateVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <UpdateProduct
                  product={data[selectedRow]}
                  refreshData={fetchData}
                  hide={() => setIsUpdateVisible(false)}
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
