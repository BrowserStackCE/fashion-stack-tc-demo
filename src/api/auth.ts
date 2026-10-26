// src/api/auth.ts
import api from "./client";

// Register function
export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth", {
      action: "register",
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login function
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth", {
      action: "login",
      email,
      password,
    });

    const data = response.data;

    // Save token in localStorage
    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get OTP function
export const getOtp = async ({ email }: { email: string }) => {
  try {
    const response = await api.post("/request-otp", { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Login via OTP function
export const loginViaOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  try {
    const response = await api.post("/auth", {
      action: "otp-login",
      email,
      otp,
    });

    const data = response.data;

    // Save token in localStorage
    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
