import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com",
  timeout: 100000,
  headers: {
    Authorization: "Basic dGVzdGluZy1hZG1pbjp0ZXN0aW5nYWRtaW4=",
    "X-Requested-With": "XMLHttpRequest",
  },
});
