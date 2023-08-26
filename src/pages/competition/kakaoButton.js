// kakaoButton.js
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const KakaoButton = ({activityName, activityImg, boardId}) => {
  // 배포한 자신의 사이트
  const realUrl = "http://teamplanner-frontend.s3-website.ap-northeast-2.amazonaws.com";
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    // 여기에 로그인한 사용자의 앱키를 넣어주면 될 것 같다.
    Kakao.init(process.env.REACT_APP_API_KEY);
    // 잘 적용되면 true 를 뱉는다.
  }, []);

  const shareKakao = () => {
    console.log(activityImg,activityName,boardId)
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "오늘의 teamplanner",
        description: `${activityName}에 참여해보세요`,
        imageUrl:
          activityImg,
        link: {
          mobileWebUrl: realUrl+"/competition/detail/"+boardId,
        },
      },
      buttons: [
        {
          title: "나도 테스트 하러가기",
          link: {
            mobileWebUrl: realUrl+"/competition/detail/"+boardId,
          },
        },
      ],
    });
  };

  return(
    <>
        {/* <button 
            onClick={() => {
                shareKakao()
            }}
        >  */}
        <img src="/img/icon/sns/kakao.png" onclick={shareKakao} alt="카카오"></img>
        {/* </button> */}
    </>
)
};

export default KakaoButton;
