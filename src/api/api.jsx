import { getCookie, removeCookie, setCookie } from "../util/cookie";
import { API_BASE_URL } from "../common/constant/constant";
import { useNavigate } from "react-router-dom";
import CommonModal from "../component/modal/CommonModal";
import axios from "axios";

export const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {},
    timeout: 5000,
  });

API.interceptors.request.use(
  function (config) {

    const accessToken=document.cookie.split(";").map(el=>el.split("="))[0][1];
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
                    console.log("expired access token");
                    removeCookie("accessToken");
                    // try to renew access token
                        // get refresh token

                    // const refreshToken = getCookie("refreshToken");
                    const refreshToken=document.cookie.split(";").map(el=>el.split("="))[1][1];
                    console.log('refreshToken', refreshToken)

                    if (!refreshToken) {
                        // redirect 
                        window.location.href = "/login"
                    }
                    // axios.post(API_BASE_URL + "/api/v1/member/renew-access-token", {refreshToken: refreshToken})
                    API.post("/api/v1/member/renew-access-token", {refreshToken: refreshToken})
                    .then(resp => {
                        // console.log('resp.data.accessToken', resp.data.accessToken);
                        console.log("refresh access token with refreshToken");
                        console.log("new accessToken =", resp.data.accessToken);
                        // setCookie("accessToken", resp.data.accessToken);
                        return new Promise(() => {});
                    }).catch(err => {
                        console.log('err', err);
                        return new Promise(() => {});  
                    })
                    return new Promise(() => {});
                case -7: // 리프레시토큰 찾을수없음
                case -4: // 리프레시토큰 만료됨
                case -101: // unauthorized HTTP status, (unauthenticated.) 
                    // re-login required.
     
                    alert("로그인이 필요합니다.");
                    console.log("refreshToken expired");
                    removeCookie("refreshToken");
                    removeCookie("accessToken");
                    localStorage.removeItem("userInfo");
                    window.location.href = `/login?redirect=${window.location.pathname}`;
                    return new Promise(() => {});
                default:
                    console.log('switch default error', error)
                    return Promise.reject(error);
            }
            return new Promise(() => {});
        }
        return Promise.reject(error);
    }
);