import api from "../utils/axios.js";

export const getCurrentUser = async () => {
  try {
    console.log("Fetching current user...");

    const {data} = await api.get("/api/me");
    console.log("Current user data:", data);
    return data;

    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Headers:", error.response?.headers);
    } else {
      console.error(error);
    }
    throw error;
  }
};

