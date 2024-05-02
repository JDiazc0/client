import axios from "axios";

async function getRawMaterial() {
  try {
    const res = await axios.get(
      "https://erm-custome-backend.onrender.com/api/rawMaterials",
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

export default getRawMaterial;
