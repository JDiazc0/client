import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import updateRawMaterial from "../libs/updateRawMaterial";

export default function UpdateRawMaterial(props) {
  const { data, refreshData } = props;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (data) {
      setId(data._id);
      setName(data.name);
      setCost(data.cost);
      setWeight(data.weight);
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateRawMaterial(
        id,
        name,
        Number(cost),
        Number(weight)
      );
      console.log("Upload successful", response);
      refreshData();

      setName("");
      setCost("");
      setWeight("");
    } catch (error) {
      console.error("Error uploading raw materials", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.InputNew
          placeholder={name}
          labeltext="Nombre"
          type="text"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
        <Controls.InputNew
          placeholder={weight ? weight.toString() : "Peso"}
          labeltext="Peso (gr)"
          type="number"
          required={true}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Controls.InputNew
          placeholder={cost ? cost.toString() : "Precio"}
          labeltext="Precio"
          type="number"
          onChange={(e) => setCost(e.target.value)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Controls.MyButton
            text="Actualizar"
            variant="contained"
            size={150}
            type="submit"
          />
          <Controls.MyButton
            text="Cancelar"
            variant="contained"
            size={150}
            type="button"
          />
        </div>
      </form>
    </>
  );
}
