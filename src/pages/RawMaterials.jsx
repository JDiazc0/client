import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import CreateRawMaterial from "../components/CreateRawMaterial";
import UpdateRawMaterial from "../components/UpdateRawMaterial";
import Controls from "../components/controls/Controls";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import getRawMaterial from "../libs/RawMaterial/getRawMaterial";
import deleteRawMaterial from "../libs/RawMaterial/deleteRawMaterial";

export default function RawMaterials() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const titles = ["Nombre", "Costo $", "Peso (gr)"];
  const fields = ["name", "cost", "weight"];

  const fetchData = async () => {
    const res = await getRawMaterial();
    setData(res.rawMaterial);
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

  const handleDelete = async () => {
    try {
      const res = await deleteRawMaterial(data[selectedRow]._id);
      console.log("Delete successful", res);
      fetchData();
    } catch (e) {
      console.error("Error deleting raw material", e);
    }
  };

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Materia prima</h1>
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
                <CreateRawMaterial
                  refreshData={fetchData}
                  hide={() => setIsFormVisible(false)}
                />
              </Grid>
            )}
            {isUpdateVisible && (
              <Grid item xs={6} container justifyContent={"center"}>
                <UpdateRawMaterial
                  data={data[selectedRow]}
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
            onClick={handleDelete}
            x="20px"
            y="180px"
          />
        )}
      </Box>
    </>
  );
}
