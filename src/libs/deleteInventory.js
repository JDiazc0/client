import axios from "axios";

async function deleteInventory(inventoryId) {
  try {
    const res = await axios.delete(
      `https://erm-custome-backend.onrender.com/api/inventory/${inventoryId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return { deletedInventory: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default deleteInventory;
