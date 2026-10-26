// src/api/auth.ts
import { DEMO_OTP, delay, loadUsers, saveUser } from "./mockData";

const issueToken = (userId: number) => {
  const token = `mock-jwt-${userId}`;
  localStorage.setItem("jwtToken", token);
  return token;
};

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
  await delay();
  const normalized = email.trim().toLowerCase();
  if (loadUsers().some((u) => u.email === normalized)) {
    throw new Error("An account with this email already exists");
  }
  const user = { id: Date.now(), name, email: normalized, password };
  saveUser(user);
  return { id: user.id, message: "Registration successful" };
};

// Login function
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await delay();
  const user = loadUsers().find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!user) throw new Error("Invalid email or password");
  return { token: issueToken(user.id) };
};

// Get OTP function
export const getOtp = async ({ email }: { email: string }) => {
  await delay();
  const user = loadUsers().find((u) => u.email === email.trim().toLowerCase());
  if (!user) throw new Error("No account found for this email");
  return { success: true, message: "OTP sent to your email" };
};

// Login via OTP function
export const loginViaOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  await delay();
  const user = loadUsers().find((u) => u.email === email.trim().toLowerCase());
  if (!user || otp !== DEMO_OTP) throw new Error("Invalid or expired OTP");
  return { token: issueToken(user.id) };
};
