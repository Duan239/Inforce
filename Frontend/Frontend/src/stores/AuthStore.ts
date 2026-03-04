import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAdmin: () => boolean;
  getUserId: () => number | null;
  getUsername: () => string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem("token"),

  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  getPayload: () => {
    const token = get().token;
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  },

  isAdmin: () => {
    const token = get().token;
    if (!token) return false;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload["role"] === "Admin";
  },

  getUserId: () => {
    const token = get().token;
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return parseInt(payload["id"]);
  },

  getUsername: () => {
    const token = get().token;
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload["username"];
  },
}));
