// src/api/user.ts
import api from "./client";

// Get current user data
export const getUser = async (token: string) => {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
