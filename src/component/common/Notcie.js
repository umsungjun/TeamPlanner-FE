import React, { useState } from "react";
import styled from "@emotion/styled";
import theme from "../../style/theme";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';

import { Box, IconButton,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notice(){
    return(
        <>
        <ThemeProvider theme={theme}>
            <NotificationMenu >
                <div className="wrap">
                <ul className="notification-list">
                    <h3>7월 14일 (금)</h3>
                    <Divider />
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                </ul>
                <ul className="notification-list">
                    <h3>7월 13일 (목)</h3>
                    <Divider />
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                </ul>
                </div>
            </NotificationMenu>
        </ThemeProvider>
        </>
    )   
}

const NotificationMenu = styled(Box)`
    position: absolute;
    top: 8rem;
    right: 5%;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.05);
    z-index: 99;
    &>div{
        width: 45rem;
        height: 50rem;
        max-height: 50rem;
        overflow-y: scroll;
        padding: 2rem 0;
        border-radius: 1rem;
    }
    .close_btn{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 1rem 2rem 0 2rem;
        button{
            padding: 0;
            svg{
                width: 2rem;
                height: 2rem;
            }
        }
    }
    .notification-list{
        h3{
            font-size: 2rem;
            color: #3b3b3b;
            font-weight: bold;
            padding: 0 2rem 2rem 2rem;
        }
        li{
            background-color: #fff;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .img-box{
                width: 24%;
                img{
                    width: 100%;
                    border-radius: 4px;
                }
            }
            .text-box{
                width: 70%;
                h4{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                p{
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.6);
                    line-height: 150%;
                }
            }
        }
        li:hover{
            background-color: #FFF1E5;
        }
    }
    @media ${() => theme.device.mobile} {
        right: 0;
        top: 5rem;
        &>div{
            width: 100%;
        }
    }
`;
