import axios from "axios";

async function getBalance(balanceId) {
  try {
    const baseUrl = process.env.REACT_APP_ERM_BALANCE.replace(/\/$/, "");
    const res = await axios.get(`${baseUrl}/${balanceId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { balance: res.data };
  } catch (e) {
    if (e.response?.status === 404) {
      return { status: 404, message: "Balance not found" };
    }
    if (e.response?.status === 401) {
      return { status: 401 };
    }
    return { message: e.response?.data?.message || "An error occurred" };
  }
}

export default getBalance;
