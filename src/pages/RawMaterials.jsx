import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { CSSTransition } from "react-transition-group";

import NavBar from "../components/NavBar";
import CreateRawMaterial from "../components/CreateRawMaterial";
import UpdateRawMaterial from "../components/UpdateRawMaterial";
import Controls from "../components/controls/Controls";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/RawMaterials.css";

import getRawMaterial from "../libs/getRawMaterial";

export default function RawMaterials() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const titles = ["Nombre", "Costo", "Peso (gr)"];
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

  const handleRowSelect = (index) => {
    setSelectedRow(index);
    console.log(data[index]);
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
            <CSSTransition
              in={isFormVisible}
              timeout={300}
              classNames="fade"
              unmountOnExit>
              <Grid item xs={6} container justifyContent={"center"}>
                <CreateRawMaterial refreshData={fetchData} />
              </Grid>
            </CSSTransition>
            <CSSTransition
              in={isUpdateVisible}
              timeout={300}
              classNames="fade"
              unmountOnExit>
              <Grid item xs={6} container justifyContent={"center"}>
                <UpdateRawMaterial
                  data={data[selectedRow]}
                  refreshData={fetchData}
                />
              </Grid>
            </CSSTransition>
          </Grid>
        </Container>
        <Controls.MyFab
          icon={
            isFormVisible ? (
              <CloseIcon style={{ transition: "transform 0.3s" }} />
            ) : (
              <AddIcon style={{ transition: "transform 0.3s" }} />
            )
          }
          onClick={handleNew}
        />
        {selectedRow !== null && (
          <Controls.MyFab
            icon={
              isUpdateVisible ? (
                <CloseIcon style={{ transition: "transform 0.3s" }} />
              ) : (
                <EditIcon style={{ transition: "transform 0.3s" }} />
              )
            }
            onClick={handleUpdate}
            x="20px"
            y="100px"
          />
        )}
      </Box>
    </>
  );
}
