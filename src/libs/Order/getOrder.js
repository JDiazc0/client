import axios from "axios";

async function getOrder(orderId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_ORDER.replace(/\/$/, "");
    const res = await axios.get(`${baseUrl}/${orderId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { Order: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default getOrder;
