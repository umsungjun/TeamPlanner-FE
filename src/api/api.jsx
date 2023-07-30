import axios from "axios";
import { getCookie } from "../util/cookie";

export const API = axios.create({
  baseURL: "http://3.34.109.248:8080", // 주소
  // baseURL: 'http://localhost:8080', // 주소
  headers: {},
  timeout: 5000,
});

API.interceptors.request.use(
  function (config) {
    console.log(`function(config=${config})`);
    console.log("asd" + getCookie("accessToken"));
    console.log("qwer" + getCookie("refreshToken"));
    // 1년짜리 토큰
    const accessToken = `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbE1lbWJlciIsImV4cCI6MTcyMDYyNzE5MiwidXNlcm5hbWUiOiJsb2NhbE1lbWJlciJ9.xmhoU2wsMRLlkkhziZe_vmJuXkYgZOXrdX1at71_2X_qKrUClCmKKkPbqnGMRWSHBsNUC4Z-nxQ7K8rFzuPzgQ`;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);
