import React, { useEffect, useState } from "react";

import Controls from "./controls/Controls";

import getRawMaterial from "../libs/getRawMaterial";
import uploadProduct from "../libs/uploadProduct";

export default function CreateProduct(props) {
  const { refreshData, hide } = props;
  const [data, setData] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setRawMaterials] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const titles = ["Materias Primas", "Cantidad (gr)"];
  const fields = ["name", "quantity"];

  const handleAdd = () => {
    if (selectedMaterial && quantity) {
      const selectedMaterialData = data.find(
        (item) => item._id === selectedMaterial
      );
      setRawMaterials([
        ...materials,
        { value: selectedMaterial, name: selectedMaterialData.name, quantity },
      ]);
      setSelectedMaterial("");
      setQuantity("");
    }
  };

  const handleDelete = () => {
    const newRawMaterials = [...materials];
    newRawMaterials.pop();
    setRawMaterials(newRawMaterials);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRawMaterial();
      setData(res.rawMaterial);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const materialsToSend = materials.map((material) => ({
      material: material.value,
      quantity: Number(material.quantity),
    }));

    try {
      const response = await uploadProduct(
        name,
        Number(price),
        materialsToSend
      );
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
          placeholder="Ex: Helado de pollo"
          labeltext="Nombre"
          type="text"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
        <Controls.MySelector
          label="Materia prima"
          quantitylabel="150 gr"
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
          {materials.length >= 1 && (
            <Controls.MyButton
              text="Eliminar"
              type="button"
              size={150}
              onClick={handleDelete}
            />
          )}
        </div>
        {materials.length >= 1 && (
          <Controls.MyTable
            titles={titles}
            content={materials}
            fields={fields}
          />
        )}
        <Controls.InputNew
          placeholder="Ex: $ 3000"
          labeltext="Precio"
          type="number"
          required={true}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Controls.MyButton text="Crear" variant="contained" type="submit" />
      </form>
    </>
  );
}
