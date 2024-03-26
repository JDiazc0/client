import axios from "axios";

async function deleteRawMaterial(MaterialId) {
  try {
    const res = await axios.delete(
      `https://erm-custome-backend.onrender.com/api/rawMaterials/${MaterialId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return { deletedRawMaterial: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default deleteRawMaterial;
