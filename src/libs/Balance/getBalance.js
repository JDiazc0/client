import axios from "axios";

async function getBalances() {
  try {
    const baseUrl = process.env.REACT_APP_ERM_BALANCE.replace(/\/$/, "");
    const res = await axios.get(baseUrl, {
      headers: { "Content-Type": "application/json" },
    });
    return { balances: res.data };
  } catch (e) {
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default getBalances;
