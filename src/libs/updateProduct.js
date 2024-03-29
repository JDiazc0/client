import axios from "axios";

async function updateProduct(productId, name, price, materials) {
  try {
    const res = await axios.put(
      `https://erm-custome-backend.onrender.com/api/products/${productId}`,
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

export default updateProduct;
