import axios from "axios";

async function updateClient(clientId, name, animalname, address, contact) {
  try {
    const res = await axios.put(
      `https://erm-custome-backend.onrender.com/api/client/${clientId}`,
      { name, animalname, address, contact },
      { headers: { "Content-Type": "application/json" } }
    );
    return { client: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default updateClient;
