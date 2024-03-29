import React, { useState } from "react";

import Controls from "./controls/Controls";
import uploadRawMaterial from "../libs/uploadRawMaterial";

export default function CreateRawMaterial(props) {
  const { refreshData, hide } = props;
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await uploadRawMaterial(
        name,
        Number(cost),
        Number(weight)
      );
      console.log("Upload successful", response);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error uploading raw materials", error);
    }
  };

  return (
    <>
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
        <Controls.MyButton text="Crear" variant="contained" type="submit" />
      </form>
    </>
  );
}
