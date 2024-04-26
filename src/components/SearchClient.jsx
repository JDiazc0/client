import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import { Grid } from "@mui/material";

import getClient from "../libs/getClient";

export default function SearchClient() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clientMatch, setClientMatch] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [animalnameValue, setAnimalnameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [searchActivate, setSearchActivate] = useState(false);
  const titles = ["Nombre", "Mascota", "Dirección", "Contacto"];
  const fields = ["name", "animalname", "address", "contact"];

  const fetchData = async () => {
    const res = await getClient();
    setData(res.Client);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };

  const handleSeletedClient = () => {
    setSearchValue(clientMatch[selectedRow].name);
    setAnimalnameValue(clientMatch[selectedRow].animalname);
    setAddressValue(clientMatch[selectedRow].address);
    setContactValue(clientMatch[selectedRow].contact);
  };

  const handleSearch = () => {
    const matches = data.filter((client) =>
      client.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setClientMatch(matches);
    setSearchActivate(true);
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <h4>Información del cliente</h4>
          </Grid>
          <Grid item xs={12}>
            <Controls.InputNew
              placeholder="Nombre"
              label="Nombre"
              type="text"
              value={searchValue}
              onChange={(event) => handleInputChange(event, setSearchValue)}
              readOnly={searchActivate}
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
            <Controls.InputNew
              placeholder="Mascota"
              label="Nombre de mascota"
              type="text"
              value={animalnameValue}
              onChange={(event) => handleInputChange(event, setAnimalnameValue)}
              readOnly={searchActivate}
            />
            <Controls.InputNew
              placeholder="Dirección"
              label="Dirección"
              type="text"
              value={addressValue}
              onChange={(event) => handleInputChange(event, setAddressValue)}
              readOnly={searchActivate}
            />
            <Controls.InputNew
              placeholder="Contacto"
              label="Contacto"
              type="text"
              value={contactValue}
              onChange={(event) => handleInputChange(event, setContactValue)}
              readOnly={searchActivate}
            />
          </Grid>
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
                  onClick={(e) => setSearchActivate(false)}
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
