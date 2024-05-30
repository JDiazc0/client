import React, { useState, useEffect } from "react";

import Controls from "./controls/Controls";
import updateProduct from "../libs/Products/updateProduct";
import getRawMaterial from "../libs/RawMaterial/getRawMaterial";

export default function UpdateProduct(props) {
  const { product, refreshData, hide } = props;
  const [data, setData] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setRawMaterials] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const titles = ["Materias Primas", "Cantidad (gr)"];
  const fields = ["name", "quantity"];

  //Add material to table
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
  //end Add Material

  //Delete material from table
  const handleDelete = () => {
    const newRawMaterials = [...materials];
    newRawMaterials.pop();
    setRawMaterials(newRawMaterials);
  };
  //end delete material

  //Get raw material from bd
  useEffect(() => {
    const fetchData = async () => {
      const res = await getRawMaterial();
      setData(res.rawMaterial);
    };

    fetchData();
  }, []);
  //end get raw material

  //product received
  useEffect(() => {
    if (product && product.materials) {
      const receivedProduct = product.materials.map((item) => ({
        value: item.material._id,
        name: item.material.name,
        quantity: item.quantity.toString(),
      }));

      setRawMaterials(receivedProduct);
      setId(product._id);
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const materialsToSend = materials.map((material) => ({
      material: material.value,
      quantity: Number(material.quantity),
    }));

    try {
      const res = await updateProduct(id, name, Number(price), materialsToSend);
      console.log("Update successful", res);
      refreshData();
      hide();
    } catch (error) {
      console.error("Error updating product", error);
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
          onChange={(e) => setName(e.target.value)}
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
          placeholder="Precio"
          labeltext="Precio"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
