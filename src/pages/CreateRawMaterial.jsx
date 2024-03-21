import React from "react";
import { Box, Container, Grid } from "@mui/material";
import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";
import uploadRawMaterial from "../libs/uploadRawMaterial";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRawMaterial() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await uploadRawMaterial(
        name,
        Number(cost),
        Number(weight)
      );
      console.log("Upload successful", response);
      navigate("/materias-primas");
    } catch (error) {
      console.error("Error uploading raw materials", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Nueva Materia Prima</h1>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              <form onSubmit={handleSubmit}>
                <Controls.InputNew
                  placeholder="Ex: Pollo"
                  labeltext="Materia prima"
                  type="text"
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
                <Controls.InputNew
                  placeholder="Ex: 500 gr"
                  labeltext="Peso (gr)"
                  type="number"
                  required={true}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Controls.InputNew
                  placeholder="Ex: $500"
                  labeltext="Precio"
                  type="number"
                  onChange={(e) => setCost(e.target.value)}
                />
                <Controls.MyButton
                  text="Enviar"
                  variant="contained"
                  type="submit"
                />
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
