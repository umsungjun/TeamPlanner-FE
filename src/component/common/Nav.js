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

export default function Nav(){

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
      setOpen(!open);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean(anchorEl);
    const handleClick2 = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose2 = () => {
      setAnchorEl(null);
    };


    return(
        <>
        <ThemeProvider theme={theme}>
            <NavWrap>
                <PC>
                    <div className="nav-wrap">
                        <div className="left-box">
                            <div className="logo">
                                <a href="/"><img src="/logo.svg"></img></a>
                            </div>
                            <ul>
                                <li>
                                    <a href="">공모전</a>
                                </li>
                                <li>
                                    <a href="">대외활동</a>
                                </li>
                                <li>
                                    <a href="">동아리</a>
                                </li>
                                <li>
                                    <a href="">팀원 모집게시판</a>
                                </li>
                            </ul>
                        </div>
                        <div className="right-box">
                            <div className="search-bar">
                               <StyledInputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="검색"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <ProfileBtn>
                                <AccountCircleIcon />
                            </ProfileBtn>
                            <Button
                                id="basic-button"
                                aria-controls={open2 ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open2 ? 'true' : undefined}
                                onClick={handleClick2}
                            >
                                <NotificationBadge badgeContent={4} color="primary">
                                    <NotificationsIcon color="action" />
                                </NotificationBadge>
                            </Button>
                            <NotificationMenu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <div className="close_btn">
                                    <IconButton onClick={handleClose2}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
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

                            </NotificationMenu>
                        </div>
                    </div>
                </PC>
                <Mobile>
                    <div className="nav-wrap">
                        <StyledList
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <div className="dp-flex mobileNav">
                                <div className="logo">
                                    <a href="/"><img src="/logo.svg"></img></a>
                                </div>
                                <div className="dp-flex">
                                    <ProfileBtn sx={{ml : 1}}>
                                        <AccountCircleIcon />
                                    </ProfileBtn>
                                    <MenuBtn onClick={handleClick}>
                                        <MenuIcon />
                                    </MenuBtn>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open2 ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open2 ? 'true' : undefined}
                                        onClick={handleClick2}
                                    >
                                    <NotificationBadge badgeContent={4} color="primary">
                                        <NotificationsIcon color="action" />
                                    </NotificationBadge>
                                </Button>
                            <NotificationMenu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <div className="close_btn">
                                    <IconButton onClick={handleClose2}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
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

                            </NotificationMenu>
                                </div>
                            </div>
                            <div className="search-bar">
                                <StyledInputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="검색"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <StyledCollapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{mt : 2}}>
                                    <StyledLink href="" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="공모전" />
                                        </ListItemButton>
                                    </StyledLink>
                                    <StyledLink href="" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="대외활동" />
                                        </ListItemButton>
                                    </StyledLink>
                                    <StyledLink href="" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="동아리" />
                                        </ListItemButton>
                                    </StyledLink>
                                    <StyledLink href="" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="팀원 모집게시판" />
                                        </ListItemButton>
                                    </StyledLink>
                                </List>
                            </StyledCollapse>
                        </StyledList>
                        </div>
                </Mobile>
            </NavWrap>
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

const NavWrap = styled(Box)`
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    z-index: 99;
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .nav-wrap{
        padding: 1.5rem 5%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-box{
            display: flex;
            align-items: center;
            ul{
                display: flex;
                align-items: center;
                li{
                    margin-left: 5rem;
                    a{
                        font-size: 1.6rem;
                        color: #3b3b3b;
                    }
                }
            }
        }
        .right-box{
            display: flex;
            align-items: center;
        }
        .search-bar{
            background-color: #F5F5F5;
            border-radius: 100px;
            padding: .4rem 1.5rem;
            display: flex;
            align-items: center;
            svg{
                width: 2rem;
                height: 2rem;
            }
        }
    }
    @media ${() => theme.device.tablet} {
        .nav-wrap{
            padding: 1rem 3%;
        }
    }
    @media ${() => theme.device.mobile} {
        .nav-wrap{
            padding: 0 3% 1rem 3%;
            .logo{
                img{
                    width: 70%;
                }
            }
            .search-bar{
                padding: 0rem 1rem;
                margin-top: 1rem;
            }
        }
    }
`;

const StyledInputBase = styled(InputBase)`
    font-size: 1.6rem;
    @media ${() => theme.device.mobile} {
        font-size: 1.4rem;
    }
`;
const ProfileBtn = styled(IconButton)`
    svg{
        width: 4rem;
        height: 4rem;
        color: #D9D9D9;
    }
    @media ${() => theme.device.mobile} {
        svg{
            width: 3rem;
            height: 3rem;
        }
    }
`;


const StyledList = styled(List)`
    position: relative;
    .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
    }
    .mobileNav{
        align-items: center;
        justify-content: space-between;
    }
    @media ${() => theme.device.mobile} {
        .mobileNav{
            button:last-of-type{
                padding: 0 1rem;
                min-width: auto;
            }
        }
    }
`;

const MenuBtn = styled(Button)`
    min-width: max-content;
    color: #3b3b3b;
    border-radius: 100px;
    svg{
        width: 3rem;
        height: 3rem;
    }
   &:hover{
        background-color: #fff;
    }
`;

const StyledListItemText = styled(ListItemText)`
    span{
        font-size: 1.4rem;
        color: #3b3b3b;
        line-height: 130%;
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
`;

const StyledCollapse = styled(Collapse)`
    position: fixed;
    top: 6rem;
    left : 0;
    padding: 0 3% 2rem 3%;
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,.1);
`;

const NotificationBadge = styled(Badge)`
    svg{
        width: 3rem;
        height: 3rem;
    }
    span{
        color: #fff;
    }
    @media ${() => theme.device.mobile} {
        svg{
            width: 2.5rem;
            height: 2.5rem;
        }
    }
`;

const NotificationMenu = styled(Menu)`
    &>div{
        width: 45rem;
        height: 50rem;
        max-height: 50rem;
        overflow-y: scroll;
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
`;
