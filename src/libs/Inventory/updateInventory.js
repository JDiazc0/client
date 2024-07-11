import axios from "axios";

async function updateInventory(inventoryId, product, amount) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_INVENTORY.replace(/\/$/, "");
    const res = await axios.put(
      `${baseUrl}/${inventoryId}`,
      { product, amount },
      { headers: { "Content-Type": "application/json" } }
    );
    return { Inventory: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default updateInventory;
