import axios from "axios";

async function deleteOrder(orderId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_ORDER.replace(/\/$/, "");
    const res = await axios.delete(`${baseUrl}/${orderId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { deletedOrder: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default deleteOrder;
