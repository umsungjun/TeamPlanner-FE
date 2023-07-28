import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {Button, createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextInput from "./TextInput";
import theme from "../../style/theme";
import axios from "axios";

export default function CommentBox({ commentData }){

    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
         },
    })

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        console.log("hello");
        const data = {
            boardId: "1",
            content: "저도 이 공모전 좋은 것 같아요 강추입니다 저두용",
            memberId: "localMember",
            isConfidential: "false"
          };
      
          // Perform the POST request using Axios
          axios.post('/your-api-endpoint', data)
            .then(response => {
              // Handle the response (optional)
              console.log('Reply created:', response.data);
            })
            .catch(error => {
              // Handle errors (optional)
              console.error('Error creating reply:', error);
            });
      setOpen(!open);
    };

    console.log(commentData)
   
    return(
        <>
            <ThemeProvider theme={theme}>
                <CommentBoxWrap>
                    <ul className="comment">
                        <li>
                            <IconButton sx={{p : 0}}>
                                <AccountCircleIcon/>
                            </IconButton>
                            <div className="comment-text">
                                <h3>{commentData.username}</h3>
                                <p>{commentData.content}</p>
                                <h4>{commentData.updatedAt}</h4>
                            </div>
                        </li>
                        <AddBtn onClick={handleClick}>답글</AddBtn>
                    </ul>
                        {
                            open ?
                            <div className="add-text">
                                <TextInput /> 
                            </div>
                            : <></>
                        }
                </CommentBoxWrap>
            </ThemeProvider>
        </>
    )
}



const CommentBoxWrap = styled(Box)`
    padding-bottom: 1rem;
    .comment{
        display: flex;
        align-items: center;
        justify-content: space-between;
        li:first-of-type{
            display: flex;
            align-items: flex-start;
            svg{
                width: 4rem;
                height: 4rem;
                color: #FFAD6A;
            }
        }
        .comment-text{
            margin-left: 1rem;
            h3{
                font-size: 1.4rem;
                color: #3b3b3b;
                line-height: 130%;
                font-weight: 700;
            }
            p{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 130%;
                font-weight: 500;
                margin: .5rem 0;
            }
            h4{
                font-size: 1.2rem;
                color: rgba(0,0,0,.6);
                line-height: 130%;
                font-weight: 500;
            }
        }
    }
    .add-text{
        padding-left: 5rem;
        margin-top: 1rem;
    }
    @media ${() => theme.device.mobile} {
        .add-text{
            padding: 0;
        }
    }
`;

const AddBtn = styled(Button)`
    font-size: 1.4rem !important;
    color: #3b3b3b;
    font-weight: 600;
    text-decoration: underline;
    &>div{
        padding: 0;
    }
`;
