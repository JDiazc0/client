import axios from "axios";

async function getClient() {
  try {
    const res = await axios.get(
      "https://erm-custome-backend.onrender.com/api/client",
      { headers: { "Content-Type": "application/json" } }
    );
    return { Client: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default getClient;
