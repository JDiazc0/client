import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import updateRawMaterial from "../libs/RawMaterial/updateRawMaterial";

export default function UpdateRawMaterial(props) {
  const { data, refreshData, hide } = props;
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
      const res = await updateRawMaterial(
        id,
        name,
        Number(cost),
        Number(weight)
      );
      console.log("Upload successful", res);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error updating raw materials", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.InputNew
          value={name}
          labeltext="Nombre"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Controls.InputNew
          value={weight ? weight.toString() : "Peso"}
          labeltext="Peso (gr)"
          type="number"
          onChange={(e) => setWeight(e.target.value)}
        />
        <Controls.InputNew
          value={cost ? cost.toString() : "Precio"}
          labeltext="Precio"
          type="number"
          onChange={(e) => setCost(e.target.value)}
        />
        <Controls.MyButton
          text="Actualizar"
          variant="contained"
          type="submit"
        />
      </form>
    </>
  );
}
