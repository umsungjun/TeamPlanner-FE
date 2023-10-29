import axios from "axios";
import { setupCache } from "axios-cache-adapter";

import { getCookie, removeCookie, setCookie } from "../util/cookie";
import { API_BASE_URL } from "../common/constant/constant";
import { useNavigate } from "react-router-dom";
import CommonModal from "../component/modal/CommonModal";
import { cacheAdapterEnhancer } from 'axios-extensions';
  
const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })

export const API = axios.create({
    baseURL: API_BASE_URL,
	headers: { 'Cache-Control': 'no-cache' },
    timeout: 5000,
	// adapter: cacheAdapterEnhancer(axios.defaults.adapter)
  });

API.interceptors.request.use(
  function (config) {
    const cookies = document.cookie.split(";");

    let accessToken = null;

    for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "accessToken") {
        accessToken = value;
        break;
    }
}
    // console.log("accessToken", accessToken);
    // 1년짜리 토큰
    // const accessToken = `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbE1lbWJlciIsImV4cCI6MTcyMDYyNzE5MiwidXNlcm5hbWUiOiJsb2NhbE1lbWJlciJ9.xmhoU2wsMRLlkkhziZe_vmJuXkYgZOXrdX1at71_2X_qKrUClCmKKkPbqnGMRWSHBsNUC4Z-nxQ7K8rFzuPzgQ`;
    // accessToken = `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2NhbE1lbWJlciIsImV4cCI6MTcyMDYyNzE5MiwidXNlcm5hbWUiOiJsb2NhbE1lbWJlciJ9.xmhoU2wsMRLlkkhziZe_vmJuXkYgZOXrdX1at71_2X_qKrUClCmKKkPbqnGMRWSHBsNUC4Z-nxQ7K8rFzuPzgQ`;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    } else {
        // if no accessToken? 
        // try refresh with refresh token
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
    
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.data?.code) {
            switch (error?.response?.data?.code) {
                case -70000:
                    console.log("error");
                    removeCookie("accessToken");
                    
                    const cookies = document.cookie.split(";");

                    let refreshToken = null;

                    for (const cookie of cookies) {
                        const [name, value] = cookie.trim().split("=");
                        if (name === "refreshToken") {
                            refreshToken = value;
                        break;
                        }
                    }
                    // axios.post(API_BASE_URL + "/api/v1/member/renew-access-token", {refreshToken: refreshToken})
                    API.post("/api/v1/member/renew-access-token", {refreshToken: refreshToken})
                    .then(resp => {
                        // console.log('resp.data.accessToken', resp.data.accessToken);
                        console.log("refresh access token with refreshToken");
                        console.log("new accessToken =", resp.data.accessToken);
                        setCookie("accessToken", resp.data.accessToken);
                        // 페이지 리로드
                        window.location.reload();
                    }).catch(err => {
                        console.log('err', err);
                        return new Promise(() => {});  
                    })


                    if (!refreshToken) {
                        // redirect 
                        window.location.href = "/login"
                    }
                    return new Promise(() => {});
                case -7: // 리프레시토큰 찾을수없음
                case -4: // 리프레시토큰 만료됨
                    removeCookie("refreshToken");
                case -101: //unauthorized HTTP  status, (unauthenticated.) 
                    // re-login required.
                    console.log("refreshToken expired");
                    removeCookie("refreshToken");
                    removeCookie("accessToken");
                    localStorage.removeItem("userInfo");
                    window.location.href = `/login?redirect=${window.location.pathname}`;
                    alert("로그인이 필요합니다.");
                    return new Promise(() => {});
                default:
                    console.log('switch default error', error)
                    removeCookie("refreshToken");
                    removeCookie("accessToken");
                    localStorage.removeItem("userInfo");
                    return Promise.reject(error);
            }
            return new Promise(() => {});
        }
        return Promise.reject(error);
    }
);