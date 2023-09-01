import React, { useState } from "react";
import styled from "@emotion/styled";
import {Button, createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../../style/theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Chating({handle, user, handle2}){
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

    const [add, setAdd] = React.useState(false);

    const handleAddList = () => {
        setAdd(!add);
    };


    return(
        <>
        <ThemeProvider theme={theme}>
            <ChatingWrap>
                <ul className="user-title">
                    <li>
                        <Mobile>
                            <IconButton onClick={handle2}><MenuIcon/></IconButton>
                        </Mobile>
                        <UserImg>
                            <PersonOutlineIcon />
                        </UserImg>
                        <h2>{user}</h2>
                    </li>
                    <li>
                        <Checkbox
                        {...label}
                        icon={<NotificationsOffIcon />}
                        checkedIcon={<NotificationsIcon />}
                        />
                        <IconButton onClick={handle}><CloseIcon/></IconButton>
                    </li>
                </ul>
                <ChatingList>
                    <Date><small>2023년 8월 28일</small></Date>
                    <ReceiveMsg>
                        <UserImg>
                            <PersonOutlineIcon />
                        </UserImg>
                        <div className="msg-wrap">
                            <h3>{user}</h3>
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eastes
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </ReceiveMsg>
                    <SendMsg>
                        <div className="msg-wrap">
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eastes
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </SendMsg>
                    <ReceiveMsg>
                        <UserImg>
                            <PersonOutlineIcon />
                        </UserImg>
                        <div className="msg-wrap">
                            <h3>{user}</h3>
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Lorem ipsum dolor sit amet
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </ReceiveMsg>
                    <SendMsg>
                        <div className="msg-wrap">
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Single line message
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </SendMsg>
                    <ReceiveMsg>
                        <UserImg>
                            <PersonOutlineIcon />
                        </UserImg>
                        <div className="msg-wrap">
                            <h3>{user}</h3>
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Lorem ipsum dolor sit amet
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </ReceiveMsg>
                    <SendMsg>
                        <div className="msg-wrap">
                            <div className="msg-box-wrap">
                                <p className="msg-box">
                                Single line message
                                </p>
                                <span>7:30 PM</span>
                            </div>
                        </div>
                    </SendMsg>
                    
                    
                    
                </ChatingList>
                <ChatInputBox>
                    {
                    add ? 
                    <AddList>
                        <div className="padding">
                            <div className="add-list-title">
                                <h2>첨부</h2>
                                <IconButton onClick={handleAddList}><CloseIcon/></IconButton>
                            </div>
                            <List>
                                <StyledListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{minWidth: "auto"}}>
                                            <CollectionsIcon sx={{width : "2rem" , height:"2rem", mr :1}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="이미지 (최대 5개)" />
                                    </ListItemButton>
                                </StyledListItem>
                                <StyledListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{minWidth: "auto"}}>
                                            <AccountCircleIcon sx={{width : "2rem" , height:"2rem", mr :1}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="프로필 카드"/>
                                    </ListItemButton>
                                </StyledListItem>
                            </List>
                        </div>
                    </AddList> : <></>
                    }
                    <div className="input-wrap">
                        <div className="padding">
                            <IconButton onClick={handleAddList}><AddCircleOutlineIcon/></IconButton>
                            <div className="chat-input">
                                <textarea id="chat-input" placeholder="내용을 입력하세요." cols={1} rows={1}></textarea>
                                <SendBtn variant="contained"><SendIcon/></SendBtn>
                            </div>
                        </div>
                    </div>
                </ChatInputBox>
            </ChatingWrap>
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


const ChatingWrap = styled(Box)`
    height: 100%;
    .user-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem 1rem 2rem;
        height: 4rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        li{
            display: flex;
            align-items: center;
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                font-weight: 600;
                margin-left: 1rem;
            }
            svg{
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        .user-title{
            padding: 1rem;
        }
    }
`;

const UserImg = styled(Box)`
    background-color: #BDBDBD;
    border-radius: 100px;
    min-width: 3rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        color: #fff;
        width: 2rem !important;
        height: 2rem !important;
    }
`;

const ChatingList = styled(Box)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    height: 43rem;
    overflow-y: scroll;
    @media ${() => theme.device.mobile} {
        height: 75vh;
    }
`;

const Date = styled(Box)`
    padding: .3rem .8rem;
    background-color: #FFF1E5;
    width: fit-content;
    border-radius: 50px;
    margin-bottom: 2rem;
    small{
        font-size: 1.2rem;
        color: #3b3b3b;
        font-weight: 600;
    }
`;

const ReceiveMsg = styled(Box)`
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    .msg-wrap{
        margin-left: 1rem;
        h3{
            font-size: 1.4rem;
            color: #3b3b3b;
            font-weight: bold;
            line-height: 150%;
        }
        .msg-box-wrap{
            display: flex;
            align-items: end;
            .msg-box{
                margin-top: .5rem;
                padding: 1rem;
                background-color: #EFEFEF;
                border-radius: 16px;
                font-size: 1.4rem;
                line-height: 140%;
                color: #3b3b3b;
                max-width: 35rem;
            }
            span{
                font-size: 1.2rem;
                color: #808080;
                margin-left: .5rem;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        .msg-wrap{
            .msg-box-wrap{
                .msg-box{
                    max-width: 20rem;
                }
            }
        }
    }
`;

const SendMsg = styled(Box)`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: end;
    margin-bottom: 1rem;
    .msg-box-wrap{
        display: flex;
        flex-direction: row-reverse;
        align-items: end;
        .msg-box{
            margin-top: .5rem;
            padding: 1rem;
            background-color: #FF7300;
            border-radius: 16px;
            font-size: 1.4rem;
            line-height: 140%;
            color: #fff;
            max-width: 35rem;
        }
        span{
            font-size: 1.2rem;
            color: #808080;
            margin-right: .5rem;
        }
    }
    @media ${() => theme.device.mobile} {
        .msg-box-wrap{
            .msg-box{
                max-width: 25rem;
            }
        }
    }
`;

const ChatInputBox = styled(Box)`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .input-wrap{
        border-top: 1px solid rgba(0,0,0,.1);
        position: relative;
        svg{
            width: 2.5rem;
            height: 2.5rem;
            color: #FF7300;
        }
        .padding{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 1rem;
        }
    }
    .chat-input{
        width: 100%;
        border: 1px solid rgba(0,0,0,.1);
        display: flex;
        align-items: center;
        padding:.5rem 1.5rem;
        border-radius: 100px;
        textarea{
            font-size: 1.6rem;
            padding: 1rem;
            border: none;
            width: 100%;
            resize: none;
        }
        textarea:focus {
        outline: none;
        }
    }
    @media ${() => theme.device.mobile} {
        position: fixed;
    }
`;


const SendBtn = styled(Button)`
    background-color: #FF7300;
    border-radius: 100px;
    padding: 1rem 1.1rem;
    min-width: 2rem;
    min-height: 2rem;
    box-shadow: none;
    margin-left: 2rem;
    svg{
        color: #fff !important;
        width: 1.5rem !important; 
        height: 1.5rem !important;
    }
`;

const AddList = styled(Box)`
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -3px 10px 5px rgba(0,0,0,.05);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    .padding{
    }
    .add-list-title{
        padding:1rem 1.5rem 1rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0,0,0,.1);
        h2{
            font-size: 1.6rem;
            color: #3b3b3b;
            font-weight: bold;
        }
        svg{
            width: 2rem;
            height: 2rem;
        }
    }
`;

const StyledListItem =styled(ListItem)`
    span{
        font-size: 1.4rem;
        font-weight: 500;
        color: #3b3b3b;
    }
`;