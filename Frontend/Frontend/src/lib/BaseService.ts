import axios from "axios";

const API_URL = "http://localhost:5221/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (username: string, password: string) => {
    const res = await api.post(`/Auth/login`, { username, password });
    return res.data;
  },
  register: async (username: string, password: string) => {
    const res = await api.post(`/Auth/register`, { username, password });
    return res.data;
  },
};

export const shortUrlService = {
  getAll: async () => (await api.get(`/ShortUrl`)).data,
  getById: async (id: number) => (await api.get(`/ShortUrl/${id}`)).data,
  create: async (originalUrl: string) =>
    (await api.post(`/ShortUrl`, { originalUrl })).data,
  delete: async (id: number) => await api.delete(`/ShortUrl/${id}`),
};

export const aboutService = {
  get: async () => (await api.get(`/About`)).data,
  update: async (description: string) =>
    await api.patch(`/About`, { about: description }),
};
