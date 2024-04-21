import axios from "axios";

async function getInventory() {
  try {
    const res = await axios.get(
      "https://erm-custome-backend.onrender.com/api/inventory",
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

export default getInventory;
