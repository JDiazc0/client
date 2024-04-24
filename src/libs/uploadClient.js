import axios from "axios";

async function uploadClient(name, animalname, address, contact) {
  try {
    const res = await axios.post(
      "https://erm-custome-backend.onrender.com/api/client",
      { name, animalname, address, contact },
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

export default uploadClient;
