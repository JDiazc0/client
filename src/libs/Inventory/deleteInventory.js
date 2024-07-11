import axios from "axios";

async function deleteInventory(inventoryId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_INVENTORY.replace(/\/$/, "");
    const res = await axios.delete(`${baseUrl}/${inventoryId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { deletedInventory: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default deleteInventory;
