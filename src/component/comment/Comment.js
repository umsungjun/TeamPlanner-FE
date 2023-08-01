import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Button, createTheme, IconButton, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../../style/theme";
import { API } from "../../api/api";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentBox from "./CommentBox";
import TextInput from "./TextInput";
import BasicPagination from "../pagination/Pagination";
import { useParams } from "react-router-dom";

export default function Comment({ commentData, changeFlag, flag }) {
  //대댓글 데이터

  const [childCommentData, setChildCommentData] = useState([]);
  const [commentId, setCommentId] = useState([]);
  const { boardId } = useParams();


  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7300",
      },
    },
  });

  // const handleClick = (commentId) => {
  //   // commentId 상태를 업데이트합니다.
  //   alert(commentId);
  //   if (commentId) {
  //     API.get(`/api/v1/board/${boardId}/comment/${commentId}`)
  //       .then((res) => {
  //         setChildCommentData(res.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  // const handleClick = (commentId) => {
  //   console.log(commentId, "!!");
  //   useEffect(() => {
  //     API.get(`/api/v1/board/${boardId}/comment/${commentId}`).then((res) => {
  //       console.log(res);
  //       // setChildCommentData(res.data.content);
  //     });
  //   }, []);
  // };

  useMemo(() => {
    
  }, [commentData]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentWrap>
          <h2>댓글 입력</h2>
          <TextInput changeFlag={changeFlag} flag={flag} />
          <div className="comment-list">
            {commentData.map((commentItem) => {
              return (
                <CommentBoxWrap>
                  <CommentBox
                    commentData={commentItem}
                    changeFlag={changeFlag}
                    flag={flag}
                  />
                  <AddComment> 
                    <StyledAccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                          답글 <span>{commentItem.commentCount ? commentItem.commentCount : 0}개</span>
                      </Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      
                      {commentItem.childCommentList.map((childCommentData) => {
                        
                        return <CommentBox commentData={childCommentData} changeFlag={changeFlag} flag={flag} />;
                      })}
                      {/* <CommentBox commentData={childCommentData} />
                      <CommentBox commentData={childCommentData} /> */}
                    </StyledAccordionDetails>
                  </AddComment>
                </CommentBoxWrap>
              );
            })}
            {/* <CommentBoxWrap>
                            <CommentBox />
                        </CommentBoxWrap>
                        <CommentBoxWrap>
                            <CommentBox />
                        </CommentBoxWrap>
                        <CommentBoxWrap>
                            <CommentBox />
                        </CommentBoxWrap>
                        <CommentBoxWrap>
                            <CommentBox />
                        </CommentBoxWrap> */}
          </div>
        </CommentWrap>
        <BasicPagination />
      </ThemeProvider>
    </>
  );
}

const CommentWrap = styled(Box)`
  h2 {
    font-size: 1.8rem;
    color: #3b3b3b;
    line-height: 150%;
    font-weight: bold;
  }
`;

const CommentBoxWrap = styled(Box)`
  margin: 1.5rem 0 1rem 0;
`;

const AddComment = styled(Accordion)`
  box-shadow: none;
  margin: 0 !important;
  padding: 0 0 0 5rem;
  margin-top: 1rem;
  &::before {
    background-color: transparent;
  }
  & > div {
    padding: 0;
    justify-content: flex-start;
    div {
      margin: 0;
      flex-grow: unset;
    }
  }
  .Mui-expanded {
    min-height: 100% !important;
    padding: 0;
    margin: 0 !important;
  }
  @media ${() => theme.device.tablet} {
    padding: 0;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  min-height: 100%;
  margin: 0;
  p {
    font-size: 1.4rem;
    color: #ff7300;
    font-weight: 600;
    line-height: 130%;
    span {
      font-size: 1.4rem;
      color: #ff7300;
      font-weight: 600;
      line-height: 130%;
    }
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: #ff7300;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  margin: 0 !important;
  min-height: 100% !important;
  padding: 1rem 0 0 0 !important;
`;
