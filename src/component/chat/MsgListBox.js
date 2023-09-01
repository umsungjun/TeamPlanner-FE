import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from "@mui/material/Box";

export default function MsgListBox({none, id, user}){
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


    const [read, setRead] = React.useState(true);

    const handleClick = () => {
        setRead(false);
    };
  
    return(
        <>
            <ThemeProvider theme={theme}>
                <MsgListBoxWrap onClick={handleClick} id={id}>
                    <div className="profile-img-box">
                        <PersonOutlineIcon />
                    </div>
                    <ul className="user-name">
                        <li>
                            <h3 className="name">{user}</h3>
                            <span className="date">3일전</span>
                        </li>
                        <li>
                            <p className="msg">내용내용내용내용내용내용내용내용내용내용내용내용
                            </p>
                            {
                                none ? <></> :
                                read ?
                                <span className="msg-num">9</span> : <></>
                            }
                        </li>
                    </ul>
                </MsgListBoxWrap>
            </ThemeProvider>
        </>
    )
}


const MsgListBoxWrap = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #ffff;
    border-bottom: 1px solid rgba(0,0,0,.1);
    cursor: pointer;
    position: relative;
    &:hover{
         background-color: #FFF1E5;
     }
     &:hover  .profile-img-box{
        background-color: #FF7300;
     }
    .profile-img-box{
        background-color: #BDBDBD;
        border-radius: 100px;
        min-width: 6rem;
        width: 6rem;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 2rem;
        svg{
            color: #fff;
            width: 4rem;
            height: 4rem;
        }
    }
    .user-name{
        width: 100%;
        li{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .name{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 700;
                margin-bottom: .5rem;
            }
            .msg{
                font-size: 1.4rem;
                color: #808080;
                line-height: 140%;
                margin-right: .5rem;
            }
            .date{
                font-size: 1.2rem;
                color: #808080;
            }
            .msg-num{
                background-color: #FF7300;
                padding: .4rem;
                min-width: 1rem;
                min-height: .8rem;
                border-radius: 100px;
                font-size: 1.1rem;
                text-align: center;
                color: #fff;
            }
        }
        li:first-of-type{
            align-items: center;
        }   
    }
`;