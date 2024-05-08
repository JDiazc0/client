import axios from "axios";

async function deleteClient(clientId) {
  try {
    const res = await axios.delete(
      `https://erm-custome-backend.onrender.com/api/client/${clientId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return { deletedClient: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default deleteClient;
