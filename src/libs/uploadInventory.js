import axios from "axios";

async function uploadInventory(product, amount) {
  try {
    const res = await axios.post(
      "https://erm-custome-backend.onrender.com/api/inventory",
      { product, amount },
      { headers: { "Content-Type": "application/json" } }
    );
    return { Inventory: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default uploadInventory;
