import axios from "axios";

async function getProducts() {
  try {
    const res = await axios.get(
      "https://erm-custome-backend.onrender.com/api/products",
      { headers: { "Content-Type": "application/json" } }
    );
    return { produts: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default getProducts;
