import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";

import updateClient from "../libs/Clients/updateClient";

export default function UpdateClient(props) {
  const { refreshData, hide, client } = props;

  const [name, setName] = useState("");
  const [animalname, setAnimalname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    setName(client.name);
    setAnimalname(client.animalname);
    setAddress(client.address);
    setContact(client.contact);
  }, [client]);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateClient(
        client._id,
        name,
        animalname,
        address,
        contact
      );
      console.log("update successful", response);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error updating client", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Controls.InputNew
          placeholder="Nombre"
          labeltext="Nombre"
          type="text"
          value={name}
          onChange={(event) => handleInputChange(event, setName)}
          required
        />
        <Controls.InputNew
          placeholder="Mascota"
          labeltext="Nombre de mascota"
          type="text"
          value={animalname}
          onChange={(event) => handleInputChange(event, setAnimalname)}
          required
        />
        <Controls.InputNew
          placeholder="Dirección"
          labeltext="Dirección"
          type="text"
          value={address}
          onChange={(event) => handleInputChange(event, setAddress)}
          required
        />
        <Controls.InputNew
          placeholder="Contacto"
          labeltext="Contacto"
          type="text"
          value={contact}
          onChange={(event) => handleInputChange(event, setContact)}
          required
        />
        <Controls.MyButton text="ACTUALIZAR" type="submit" variant="outlined" />
      </form>
    </>
  );
}
