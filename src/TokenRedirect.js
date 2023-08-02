import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCookie } from "./util/cookie";
import { useContext, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "./AuthContext";
import { API } from "./api/api";


const TokenRedirect = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    console.log("TokenRedirect");
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");
    setCookie("accessToken", accessToken, {path: '/', expires: moment().add('30','m').toDate()});
    setCookie("refreshToken", refreshToken, {path: '/', expires: moment().add('14','d').toDate()});
    API.get("/api/v1/member/info").then(resp => {
      console.log('resp.data', resp.data)
      localStorage.setItem("userInfo", JSON.stringify({...resp.data, accessToken: accessToken, refreshToken: refreshToken}))
      setUserInfo({...resp.data})
      navigate("/");
    });
  }, []);
  return <></>;
};


export default TokenRedirect;