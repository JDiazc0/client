import axios from "axios";

async function updateClient(clientId, name, animalname, address, contact) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_CLIENT.replace(/\/$/, "");
    const res = await axios.put(
      `${baseUrl}/${clientId}`,
      { name, animalname, address, contact },
      { headers: { "Content-Type": "application/json" } }
    );
    return { client: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default updateClient;
