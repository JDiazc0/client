import axios from "axios";

async function deleteClient(clientId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_CLIENT.replace(/\/$/, "");
    const res = await axios.delete(`${baseUrl}/${clientId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { deletedClient: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default deleteClient;
