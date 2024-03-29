import axios from "axios";

async function deleteProduct(productId) {
  try {
    const res = await axios.delete(
      `https://erm-custome-backend.onrender.com/api/products/${productId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return { deletedProduct: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default deleteProduct;
