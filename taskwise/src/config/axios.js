import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL_DEV;

console.log("Base URL:", baseURL);
export const axiosi = axios.create({ baseURL, withCredentials: true });
