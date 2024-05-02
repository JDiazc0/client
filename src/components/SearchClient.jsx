import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import { Grid } from "@mui/material";

import getClient from "../libs/Clients/getClient";
import uploadClient from "../libs/Clients/uploadClient";

export default function SearchClient(props) {
  const { onSelectClient } = props;

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); //Cliente seleccionado
  const [clientMatch, setClientMatch] = useState([]); //Arreglo de clientes match con nombre

  const [nameValue, setNameValue] = useState(""); //Nombre cliente
  const [animalnameValue, setAnimalnameValue] = useState(""); //Mascota cliente
  const [addressValue, setAddressValue] = useState(""); //Dirección cliente
  const [contactValue, setContactValue] = useState(""); //Contacto cliente

  const [searchActivate, setSearchActivate] = useState(false); //Activador de la tabla de coincidencias
  const [selectedClient, setSelectedClient] = useState(null); //Cliente seleccionado para pedido

  const titles = ["Nombre", "Mascota", "Dirección", "Contacto"];
  const fields = ["name", "animalname", "address", "contact"];

  const fetchData = async () => {
    const res = await getClient();
    setData(res.Client);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      onSelectClient(selectedClient._id);
    }
  }, [selectedClient, onSelectClient]);

  //Cliente seleccionado del arreglo de coincidencias
  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  // Seteo de cliente seleccionado
  const handleSeletedClient = () => {
    setSelectedClient(clientMatch[selectedRow]);
    setNameValue(clientMatch[selectedRow].name);
    setAnimalnameValue(clientMatch[selectedRow].animalname);
    setAddressValue(clientMatch[selectedRow].address);
    setContactValue(clientMatch[selectedRow].contact);
  };

  //filtrar clientes
  const handleSearch = () => {
    const matches = data.filter((client) =>
      client.name.toLowerCase().includes(nameValue.toLowerCase())
    );
    setClientMatch(matches);
    setSearchActivate(true);
  };

  // Cancelar selección de cliente de filtrados
  const handleCancel = () => {
    setSearchActivate(false);
    setSelectedClient(null);
  };

  // Actualizar campos por datos del filtrado
  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  // Nuevo cliente
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await uploadClient(
        nameValue,
        animalnameValue,
        addressValue,
        contactValue
      );
      setSelectedClient(res.Client);
      fetchData();
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <h4>Información del cliente</h4>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "10px" }}>
                <Controls.InputNew
                  placeholder="Nombre"
                  labeltext="Nombre"
                  type="text"
                  value={nameValue}
                  onChange={(event) => handleInputChange(event, setNameValue)}
                  readOnly={searchActivate}
                  required
                />
                {!searchActivate && (
                  <Controls.MyButton
                    text="Buscar"
                    type="button"
                    variant="outlined"
                    onClick={handleSearch}
                    size={150}
                  />
                )}
              </div>
              <Controls.InputNew
                placeholder="Mascota"
                labeltext="Nombre de mascota"
                type="text"
                value={animalnameValue}
                onChange={(event) =>
                  handleInputChange(event, setAnimalnameValue)
                }
                readOnly={searchActivate}
                required
              />
              <Controls.InputNew
                placeholder="Dirección"
                labeltext="Dirección"
                type="text"
                value={addressValue}
                onChange={(event) => handleInputChange(event, setAddressValue)}
                readOnly={searchActivate}
                required
              />
              <Controls.InputNew
                placeholder="Contacto"
                labeltext="Contacto"
                type="text"
                value={contactValue}
                onChange={(event) => handleInputChange(event, setContactValue)}
                readOnly={searchActivate}
                required
              />
              {!searchActivate && (
                <Controls.MyButton
                  text="Nuevo Cliente"
                  type="submit"
                  variant="outlined"
                />
              )}
            </Grid>
          </form>
        </Grid>
        {searchActivate && (
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Controls.MyTable
                titles={titles}
                content={clientMatch}
                fields={fields}
                selectable={true}
                onRowSelect={handleRowSelect}
                maxHeight={250}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", gap: "10px" }}>
                {selectedRow != null && (
                  <Controls.MyButton
                    text="Seleccionar cliente"
                    type="button"
                    variant="outlined"
                    onClick={handleSeletedClient}
                    size={200}
                  />
                )}
                <Controls.MyButton
                  text="Cancelar"
                  type="button"
                  variant="contained"
                  onClick={handleCancel}
                  size={150}
                />
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
