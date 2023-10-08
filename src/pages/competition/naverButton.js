// kakaoButton.js
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const NaverButton = ({activityName, activityImg, boardId}) => {
  // 배포한 자신의 사이트
  const realUrl = "https://teamplanner.co.kr";
  function shareNaver() {
    var url = encodeURI(encodeURIComponent(realUrl+"/competition/detail/"+boardId+"?sm=tab_hty.top&where=nexearch&oquery=%EB%84%A4%EC%9D%B4%EB%B2%84+%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%84%BC%ED%84%B0&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%84%BC%ED%84%B0"));
    var title = encodeURI(activityName);
    
    var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;

    if (activityImg) {
        var img = encodeURI(activityImg);
        shareURL += "&image=" + img;
      }
  

    window.open(shareURL, 'share', 'width=500, height=500');
  }

  return(
    <>
        
        <img src="/img/icon/sns/naver.png" onClick={shareNaver} alt="네이버"></img>
    </>
)
};

export default NaverButton;
