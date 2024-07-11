import axios from "axios";

async function getProducts() {
  try {
    const baseUrl = process.env.REACT_APP_ERM_PRODUCT.replace(/\/$/, "");
    const res = await axios.get(baseUrl, {
      headers: { "Content-Type": "application/json" },
    });
    return { products: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default getProducts;
