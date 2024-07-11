import axios from "axios";

async function getClient() {
  try {
    const baseUrl = process.env.REACT_APP_ERM_CLIENT.replace(/\/$/, "");
    const res = await axios.get(baseUrl, {
      headers: { "Content-Type": "application/json" },
    });
    return { Client: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default getClient;
