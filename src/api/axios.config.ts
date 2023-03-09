import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.covid19api.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
