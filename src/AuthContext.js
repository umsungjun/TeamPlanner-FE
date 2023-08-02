import React, { createContext, useEffect, useState } from 'react';
import { getCookie } from './util/cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let userInfoTmp = localStorage.getItem("userInfo")
    // const accessToken = getCookie("accessToken");
    // const refreshToken = getCookie("refreshToken");
    // console.log("asdf1" +accessToken);
    // console.log("asdf12" +refreshToken);
    setUserInfo(JSON.parse(userInfoTmp));
  }, [])

  return (
    // <AuthContext.Provider value={{ isLoggedIn, toggleLogin, userInfo, setUserInfo }}>
    <AuthContext.Provider value={{userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
