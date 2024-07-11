import axios from "axios";

async function uploadProduct(name, price, materials) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_PRODUCT.replace(/\/$/, "");
    const res = await axios.post(
      baseUrl,
      { name, price, materials },
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

export default uploadProduct;
