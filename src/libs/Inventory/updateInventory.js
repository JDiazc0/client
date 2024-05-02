import axios from "axios";

async function updateInventory(inventoryId, product, amount) {
  try {
    const res = await axios.put(
      `https://erm-custome-backend.onrender.com/api/inventory/${inventoryId}`,
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

export default updateInventory;
