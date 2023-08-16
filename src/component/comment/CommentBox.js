import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, createTheme, IconButton, ThemeProvider ,Avatar, useForkRef } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import theme from "../../style/theme";
import TextInput from "./TextInput";
import { API } from "../../api/api";
import { useParams } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SolidBtn from "../button/SolideBtn";

export default function CommentBox({ commentData, changeFlag, flag, commentFlag, changeCommentFlag }) {
  
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
  
  // const [editedContent, setEditedContent] = useState(commentData.content);
  // const [currentContent, setContent] = useState(commentData.content);
  const [open, setOpen] = React.useState(false);
  // const [editMode, setEditMode] = React.useState(false); // Add this state
  const { boardId } = useParams();
  const [contentDelete,setContentDelete] = useState([]);
  
  const handleClick = () => {
    setOpen(!open);
    setAnchorEl(null);
  };
  // const handleEditClick = () => {
  //   setEditMode(!editMode); // Activate edit mode
  // };
  // const handleEditClick = () => {
  //   setEditMode(!editMode); // 토글
  // };




   // 로그인 중인 유저의 아이디를 가져옴
   const userInfoJSON = localStorage.getItem("userInfo");
   const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : null;
 
  
    /** 엔터 키 눌렀을 때의 함수입니다. */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  // const handleSuccessClick = () => {
  //   setEditMode(!editMode); // 토글

  //   API.put(`/api/v1/board/${boardId}/comment`, {
  //     commentId: commentData.commentId,
  //     boardId: boardId,
  //     content: editedContent
  //     }
  //   )
  //     .then((res) => {
  //       commentData.content = res.data.content;
  //       setContent(editedContent);
  //       setEditMode(false);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //       // Handle errors (optional)
  //       // console.error("Error creating reply:", error);
  //     });

  // };

  // useEffect(() => {
  
  // }, [currentContent]);

  const handleDeleteClick = () => {
    if (window.confirm("정말로 삭제하시겠어요?")) {
      API.delete(`/api/v1/board/${boardId}/comment/${commentData.commentId}`)
      .then((res) => {  
        setContentDelete(!contentDelete);
        changeCommentFlag(!commentFlag);
        alert(res.data);
      })
      .catch((error) => {
        alert(error);
        // Handle errors (optional)
        // console.error("Error creating reply:", error);
      });
    }
  };



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 


  return (
    <>
      <ThemeProvider theme={theme}>
        <CommentBoxWrap>
          
          <ul className="comment">
            <li>
              <IconButton sx={{ p: 0 }}>
                <Avatar src={commentData.profileImage} alt="Profile" />
                {/* <AccountCircleIcon/> */}
              </IconButton>
              <div className="comment-text">
                {/* <h3>{commentData.username}</h3>
                {editMode ?  <ThemeProvider theme={muiTheme}><TextInputWrap>
               <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                multiline
                maxRows={3}
                onKeyPress={handleKeyPress} 
                onChange={(event) => setEditedContent(event.target.value)}
                value={editedContent}
              /> </TextInputWrap></ThemeProvider>: ( <p>{commentData.content}</p>)} */}
                <p>{commentData.content}</p>
                <h4>{commentData.updatedAt}</h4>
              </div>
            </li>
            {/* <div>
            {userInfo && userInfo.username && commentData.username === userInfo.username ? (
              editMode ? (
                <div>
                <SolidBtn handle={handleSuccessClick} text="수정완료"/>
                <SolidBtn handle={() => setEditMode(false)} text="취소"/>
                </div>
              ) : (
                <AddBtn onClick={handleEditClick}>수정</AddBtn>
              )
            ) : null}
            <AddBtn onClick={handleClick}>답글</AddBtn>
            </div> */}
            {/*3차추가 */}
            <IconButton
                            id="basic-button"
                            aria-controls={open2 ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open2 ? 'true' : undefined}
                            onClick={handleClick2}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open2}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <StyledMenuItem onClick={handleClick}>
                                답글
                            </StyledMenuItem>
                            {userInfo && userInfo.username && commentData.username === userInfo.username ? (
                            <>
                            <StyledMenuItem onClick={handleDeleteClick}>
                                삭제
                            </StyledMenuItem>
                            {/* <StyledMenuItem onClick={handleClose}>
                                수정
                            </StyledMenuItem> */}
                            </>
                            ): ""}
                        </Menu>
            
          </ul>
          {open ? (
            <div className="add-text">
              <TextInput
                parentId={commentData.commentId}
                changeFlag={changeFlag}
                flag={flag}
              />
            </div>
          ) : (
            <></>
          )}
        </CommentBoxWrap>
      </ThemeProvider>
    </>
  );
}

const EditBox = styled.div`
  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  .edit-btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;

    button {
      margin-left: 8px;
    }
  }
`;

const CommentBoxWrap = styled(Box)`
  padding-bottom: 1rem;
  .comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li:first-of-type {
      display: flex;
      align-items: flex-start;
      svg {
        width: 4rem;
        height: 4rem;
        color: #ffad6a;
      }
    }
    .comment-text {
      margin-left: 1rem;
      h3 {
        font-size: 1.4rem;
        color: #3b3b3b;
        line-height: 130%;
        font-weight: 700;
      }
      p {
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 130%;
        font-weight: 500;
        margin: 0.5rem 0;
      }
      h4 {
        font-size: 1.2rem;
        color: rgba(0, 0, 0, 0.6);
        line-height: 130%;
        font-weight: 500;
      }
    }
  }
  .add-text {
    padding-left: 5rem;
    margin-top: 1rem;
  }
  @media ${() => theme.device.mobile} {
    .add-text {
      padding: 0;
    }
  }
`;

const AddBtn = styled(Button)`
  font-size: 1.0rem !important;
  color: #3b3b3b;
  font-weight: 600;
  text-decoration: underline;
  & > div {
    padding: 0;
  }
`;

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
  width: 100%;
  .MuiInputBase-root {
    padding: 1.5rem 2rem !important;
    height: 8rem;
  }
  textarea {
    font-size: 1.6rem;
    color: #3b3b3b;
  }
`;
const StyledMenuItem = styled(MenuItem)`
    font-size: 1.6rem;
    color: #3b3b3b;
    padding: 1rem 3rem;
`;
