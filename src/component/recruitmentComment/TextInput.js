import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, createTheme, IconButton, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import SolidBtn from "../button/SolideBtn";
import TextField from "@mui/material/TextField";
import theme from "../../style/theme";
import { API } from "../../api/api";
import { useParams } from "react-router-dom";

export default function TextInput({ changeFlag, flag, parentId }) {
  const { recruitmentId } = useParams();
  const [content, setContent] = useState("");
  const [isSubmmited, setIsSubmited] = useState(false);

  const muiTheme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7300",
      },
    },
  });


  const EnrollChildComment = () => {


    const userInfoJSON = localStorage.getItem("userInfo");
    const userInfoObject = JSON.parse(userInfoJSON);

    // if(!userInfoObject){
    //     alert("로그인 후 이용해주세요");
    //     setIsSubmited(false);
    //     return;
    // }
    
    if (parentId) {
      console.log("대댓글 추가")
      // 대댓글일 경우 해당 로직을 진행합니다.
      // /api/v1/recruitment/{recruitmentId}/comment
      API.post(`/api/v1/recruitment/${recruitmentId}/comment/${parentId}/comment`, {
        recruitmentId,
        content: content,
        isConfidential: false,
      }).then((res) => {
        setContent(""); // Reset the content state to clear the input field
        changeFlag(!flag);
        setIsSubmited(false);
        window.location.reload();

        // console.log(res);
      });
    } else {
      console.log("일반댓글 추가")
      // 일반 댓글일 경우 해당 로직을 진행합니다.
      API.post(`/api/v1/recruitment/${recruitmentId}/comment`, {
        recruitmentId,
        content: content,
        isConfidential: false,
        }
      )
        .then((response) => {
          setContent(""); // Reset the content state to clear the input field
          changeFlag(!flag);
          setIsSubmited(false);
          window.location.reload();

        })
        .catch((error) => {
          // Handle errors (optional)
          // console.error("Error creating reply:", error);
        });
    }
  };

  /** 댓글 창의 입력 버튼을 눌렀을 때의 함수입니다. */
  const handleClick = () => {
    if (content.length > 0) {
      setIsSubmited(true);
      EnrollChildComment();
    } else {
      alert("내용을 입력해주세요!");
    }
  };

  /** 엔터 키 눌렀을 때의 함수입니다. */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <TextInputWrap>
          <StyledTextField
            id="outlined-basic"
            variant="outlined"
            multiline
            maxRows={3}
            onKeyPress={handleKeyPress} 
            onChange={(event) => setContent(event.target.value)}
            value={content} // Add value prop to the TextField
          />
          <SolidBtn text={!isSubmmited ? "입력" : "등록 중.."} handle={handleClick} disabled={isSubmmited}/>
        </TextInputWrap>
      </ThemeProvider>
    </>
  );
}

const TextInputWrap = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1rem;
  button {
    width: 15%;
  }
  @media ${() => theme.device.mobile} {
    button {
      margin-left: 1rem;
    }
  }
`;

const StyledTextField = styled(TextField)`
  width: 84%;
  .MuiInputBase-root {
    padding: 1.5rem 2rem !important;
    height: 8rem;
  }
  textarea {
    font-size: 1.6rem;
    color: #3b3b3b;
  }
`;
