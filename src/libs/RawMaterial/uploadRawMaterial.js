import axios from "axios";

async function uploadRawMaterial(name, cost, weight) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_RAW_MATERIAL.replace(/\/$/, "");
    const res = await axios.post(
      baseUrl,
      { name, cost, weight },
      { headers: { "Content-Type": "application/json" } }
    );
    return { rawMaterials: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default uploadRawMaterial;
