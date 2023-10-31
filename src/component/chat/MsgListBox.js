import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from "@mui/material/Box";

export default function MsgListBox({none, id, user, lastMessageText, lastMessageTime, profileImage}){
    

    const calculateDaysAgo = (lastMessageTime) => {
        // 날짜 문자열을 JavaScript Date 객체로 변환
        const messageDate = new Date(lastMessageTime.replace(/년|월/g, '/').replace(/일/, ''));

        // 현재 날짜 생성
        const currentDate = new Date();

        // 날짜 차이 계산 (밀리초 단위)
        const timeDifference = currentDate - messageDate;

        // 밀리초를 일로 변환
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysAgo;
    }
    
      
    
    
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
                    <div className="profile-img-box" style={{backgroundImage: `url(${profileImage})`, backgroundSize: "cover"}}>
                        {/* <PersonOutlineIcon /> */}
                    </div>
                    <ul className="user-name">
                        <li>
                        <h3 className="name">{user.length > 10 ? user.slice(0, 10) + '...' : user}</h3>
                            {calculateDaysAgo(lastMessageTime) === 0 ? '오늘' : calculateDaysAgo(lastMessageTime) + '일 전'}
                        </li>
                        <li>
                            <p className="msg">{lastMessageText}
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
        background-position-x: center;
        background-position-y: center;
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