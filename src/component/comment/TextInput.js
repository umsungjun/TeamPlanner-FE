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
  const { boardId } = useParams();
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  console.log(parentId);

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

  useEffect(() => {
    if (isSubmitted) {
      const data = {
        boardId: boardId,
        content: content,
        memberId: "localMember",
        isConfidential: "false",
      };
      API.post(`/api/v1/board/${boardId}/comment`, data)
        .then((response) => {
          // Handle the response (optional)
          console.log("Reply created:", response.data);
          setIsSubmitted(false); // Reset the state after submitting
          setContent(""); // Reset the content state to clear the input field
        })
        .catch((error) => {
          // Handle errors (optional)
          console.error("Error creating reply:", error);
        });
    }
  }, [isSubmitted, boardId, content]);

  const EnrollChildComment = () => {
    API.post(`/api/v1/board/${boardId}/comment/${parentId}/comment`, {
      parentCommentId: parentId,
      boardId: boardId,
      content: content,
      isConfidential: false,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleClick = () => {
    if (parentId) {
      EnrollChildComment();
    } else {
      changeFlag(!flag);
      setIsSubmitted(true); // This will trigger the useEffect to execute after state update
    }
  };
  console.log(content);

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <TextInputWrap>
          <StyledTextField
            id="outlined-basic"
            variant="outlined"
            multiline
            maxRows={3}
            onChange={(event) => setContent(event.target.value)}
            value={content} // Add value prop to the TextField
          />
          <SolidBtn text={"입력"} handle={handleClick} />
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
