import axios from "axios";

async function deleteProduct(productId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_PRODUCT.replace(/\/$/, "");
    const res = await axios.delete(`${baseUrl}/${productId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { deletedProduct: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default deleteProduct;
