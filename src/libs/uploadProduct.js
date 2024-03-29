import axios from "axios";

async function uploadProduct(name, price, materials) {
  try {
    const res = await axios.post(
      "https://erm-custome-backend.onrender.com/api/products",
      { name, price, materials },
      { headers: { "Content-Type": "application/json" } }
    );
    return { rawMaterials: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default uploadProduct;
