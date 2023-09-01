import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SmsIcon from '@mui/icons-material/Sms';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MsgListBox from "./MsgListBox";
import Chating from "./Chating";
import theme from "../../style/theme";

export default function ChatBox(){
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

    const [activeIndex, setActiveIndex]=useState(0);
    const tabClickHandler=(index)=>{
        setActiveIndex(index);
        setOpen2(!open2);
    };


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(!open2);
    };
    
    const tabContArr=[
        {
            tabTitle:(
                <div className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>
                    <MsgListBox id={"msgBox1"} none={true} user={"운영자"}/>
                </div>
            ),
            tabCont:(
                <Chating handle={handleClick} handle2={handleClick2} user={"운영자"}/>
            )
        },
        {
            tabTitle:(
            <div className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>
                <MsgListBox id={"msgBox2"} user={"운영자2"} />
            </div>
            ),
            tabCont:(
                <Chating handle={handleClick} handle2={handleClick2} user={"운영자2"}/>
            )
        },

    ];

    return(
        <>
       <ThemeProvider theme={theme}>
            <ChatBoxWrap>
                <div className="chat-wrap">
                    <ChatBtn variant="contained" onClick={handleClick}><SmsIcon/></ChatBtn>
                    {
                        open ? 
                        <Chat>
                            <div className="chat-list">
                                <PC>
                                    <div className="title">
                                        <h2>대화목록</h2>
                                        <IconButton><MapsUgcIcon/></IconButton>
                                    </div>
                                    <MsgList>
                                        {tabContArr.map((section, index)=>{
                                            return section.tabTitle
                                        })}
                                    </MsgList>
                                </PC>
                                <Mobile>
                                    {
                                    open2 ? 
                                    <MsgList>
                                        {tabContArr.map((section, index)=>{
                                            return section.tabTitle
                                        })}
                                    </MsgList>
                                    : <></>
                                    }
                                </Mobile>
                            </div>
                            <ChatingBox>
                                {tabContArr[activeIndex].tabCont}
                            </ChatingBox>
                        </Chat>
                        : <></>
                    }
                </div>
            </ChatBoxWrap>
       </ThemeProvider>
        </>
    )
}


const PC = styled(Box)`
    @media ${() => theme.device.mobile} {
        display: none;
    }
`;
const Mobile = styled(Box)`
    display: none;
    @media ${() => theme.device.mobile} {
        display: block;
    }
`;


const ChatBoxWrap = styled(Box)`
    position: fixed;
    bottom: 2%;
    right: 2%;
    .chat-wrap{
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    @media ${() => theme.device.tablet} {
        width: 100%;
        right: 0;
    }
    @media ${() => theme.device.mobile} {
        z-index: 99;
        bottom: 0;
    }

`;

const ChatBtn = styled(Button)`
    padding: 2rem;
    border-radius: 100px;
    svg{
        width: 3.5rem;
        height: 3.5rem;
        color: #fff;
    }
    @media ${() => theme.device.tablet} {
        margin-right: 2rem;
    }
    @media ${() => theme.device.mobile} {
        margin-bottom: 2rem;
        svg{
            width: 2.5rem;
            height: 2.5rem;
        }
    }
`;

const Chat = styled(Box)`
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    min-width: 90rem;
    height: 60rem;
    border-radius: 4px;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.05);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .chat-list{
        width: 35%;
        height: 100%;
        border-right: 1px solid rgba(0,0,0,.1);
        .title{
            padding: 1rem 1.5rem 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4rem;
            position: sticky;
            top: 0;

            border-bottom: 1px solid rgba(0,0,0,.1);
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
            svg{
                color: #FF7300;
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
    @media ${() => theme.device.tablet} {
        width: 90%;
        min-width: 90%;
        right: 2rem;
    }
    @media ${() => theme.device.mobile} {
        bottom : 0;
        right: 0;
        width: 100%;
        min-width: 100%;
        height: 100vh;
        .chat-list{
            width: auto;
        }
    }
`;  


const MsgList = styled(Box)`
    height: 53.5rem;
    overflow-y: scroll;
    .is-active {
        border-left: 3px solid #FF7300;
    }
    .is-active > div{
        background-color: #FFF1E5;
        ul{
            li{
                .name{
                    color: #FF7300;
                }
            }
        }
    }
    .is-active .profile-img-box{
        background-color: #FF7300;
    }
    @media ${() => theme.device.mobile} {
        position: absolute;
        top: 6rem;
        left: 0;
        z-index: 100;
        background-color: #fff;
        height: 100vh;
        width: 70%;
        box-shadow: 5px 5px 5px 5px rgba(0,0,0,.05);
    }
`;


const ChatingBox = styled(Box)`
    width: 65%;
    min-height: 60rem;
    position: relative;
    @media ${() => theme.device.mobile} {
        width: 100%;
    }
`;