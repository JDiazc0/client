import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";

import getRawMaterial from "../libs/getRawMaterial";

export default function CreateProduct() {
  const [data, setData] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rawMaterials, setRawMaterials] = useState([]);
  const titles = ["Materias Primas", "Cantidad"];

  const handleAdd = () => {
    if (selectedMaterial && quantity) {
      const selectedMaterialData = data.find(
        (item) => item._id === selectedMaterial
      );
      setRawMaterials([
        ...rawMaterials,
        { value: selectedMaterial, name: selectedMaterialData.name, quantity },
      ]);
      setSelectedMaterial("");
      setQuantity("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRawMaterial();
      setData(res.rawMaterial);
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Nuevo Producto</h1>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              <form>
                <Controls.InputNew
                  placeholder="Ex: Helado de pollo"
                  labeltext="Nombre"
                  type="text"
                  required="true"
                />
                <Controls.MySelector
                  label="Materia prima"
                  data={data}
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Controls.MyButton
                    text="Añadir"
                    type="button"
                    size={150}
                    onClick={handleAdd}
                  />
                  <Controls.MyButton text="Eliminar" type="button" size={150} />
                </div>
                <Controls.MyTable titles={titles} content={rawMaterials} />
                <Controls.InputNew
                  placeholder="Ex: $ 3000"
                  labeltext="Precio"
                  type="number"
                  required="true"
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
