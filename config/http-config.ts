import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com",
  timeout: 100000,
  headers: {
    Authorization: `Basic ${process.env.NEXT_PUBLIC_AUTH_N8N}`,
    "X-Requested-With": "XMLHttpRequest",
  },
});
