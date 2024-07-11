import axios from "axios";

async function updateRawMaterial(MaterialId, name, cost, weight) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_RAW_MATERIAL.replace(/\/$/, "");
    const res = await axios.put(
      `${baseUrl}/${MaterialId}`,
      { name, cost, weight },
      { headers: { "Content-Type": "application/json" } }
    );
    return { rawMaterial: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default updateRawMaterial;
