import axios from "axios";

async function uploadOrder(client, products, price) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_ORDER.replace(/\/$/, "");
    const res = await axios.post(
      `${baseUrl}`,
      { client, products, price },
      { headers: { "Content-Type": "application/json" } }
    );
    return { Order: res.data };
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        return { status: 401 };
      }
      return { message: e.response.data.message };
    } else {
      return { message: e.message || "An error occurred" };
    }
  }
}

export default uploadOrder;
