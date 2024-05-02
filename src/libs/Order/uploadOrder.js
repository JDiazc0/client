import axios from "axios";

async function uploadOrder(client, products, price) {
  try {
    const res = await axios.post(
      "https://erm-custome-backend.onrender.com/api/order",
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
      return { message: e.message[0] };
    }
  }
}

export default uploadOrder;
