import axios from "axios";

async function updateRawMaterial(MaterialId, name, cost, weight) {
  try {
    const res = await axios.put(
      `https://erm-custome-backend.onrender.com/api/rawMaterials/${MaterialId}`,
      { name, cost, weight },
      { headers: { "Content-Type": "application/json" } }
    );
    return { rawMaterial: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default updateRawMaterial;
