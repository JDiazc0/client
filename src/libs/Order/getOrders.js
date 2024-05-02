import axios from "axios";

async function getOrders() {
  try {
    const res = await axios.get(
      "https://erm-custome-backend.onrender.com/api/order",
      { headers: { "Content-Type": "application/json" } }
    );
    return { Order: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default getOrders;
