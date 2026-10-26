// src/api/user.ts
import { delay, loadUsers } from "./mockData";

// Get current user data
export const getUser = async (token: string) => {
  await delay(100);
  const id = Number(token.replace("mock-jwt-", ""));
  const user = loadUsers().find((u) => u.id === id);
  if (!user) throw new Error("Session expired, please log in again");
  return { user: { id: user.id, name: user.name, email: user.email } };
};
