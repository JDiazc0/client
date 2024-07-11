import axios from "axios";

async function deleteRawMaterial(MaterialId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_RAW_MATERIAL.replace(/\/$/, "");
    const res = await axios.delete(`${baseUrl}/${MaterialId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { deletedRawMaterial: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default deleteRawMaterial;
