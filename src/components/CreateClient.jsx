import React, { useState } from "react";

import Controls from "./controls/Controls";

import uploadClient from "../libs/Clients/uploadClient";

export default function CreateClient(props) {
  const { refreshData, hide } = props;

  const [name, setName] = useState("");
  const [animalname, setAnimalname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await uploadClient(name, animalname, address, contact);
      console.log("Upload successful", response);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.InputNew
          placeholder="Nombre"
          labeltext="Nombre"
          type="text"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Controls.InputNew
          placeholder="Mascota"
          labeltext="Nombre de mascota"
          type="text"
          onChange={(event) => setAnimalname(event.target.value)}
          required
        />
        <Controls.InputNew
          placeholder="Dirección"
          labeltext="Dirección"
          type="text"
          onChange={(event) => setAddress(event.target.value)}
          required
        />
        <Controls.InputNew
          placeholder="Contacto"
          labeltext="Contacto"
          type="text"
          onChange={(event) => setContact(event.target.value)}
          required
        />
        <Controls.MyButton
          text="Nuevo Cliente"
          type="submit"
          variant="outlined"
        />
      </form>
    </>
  );
}
