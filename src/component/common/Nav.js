import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../../style/theme";
import {Avatar, createTheme,Divider,Icon,ThemeProvider} from '@mui/material';

import { Box, IconButton,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';


import MySVG from '../../logo.svg';

import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import FilledBtn from "../button/FilledBtn";
import { AuthContext } from "../../AuthContext";
import { useRef } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import Notice from "./Notcie";
import { API } from "../../api/api";
import { useNavigate } from 'react-router-dom';

export default function Nav(){

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if(search.trim()===''){
            alert("검색할 단어를 입력해주세요");
        }
        if (search.trim() !== '') {
            navigate(`/search?s=${encodeURIComponent(search)}`);
        }
        
    };




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

    // const { isLoggedIn, toggleLogin, userInfo } = useContext(AuthContext);
    const {  userInfo, setUserInfo } = useContext(AuthContext);

    const handleLogout = () => {
        // toggleLogin();
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
        localStorage.removeItem("userInfo")
        setUserInfo(null);
    };
    
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
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

     {/*수정 */}
     const dropdownRef = useRef(null); // Create a reference for dropdown container
     const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
   
     // Function to close dropdown
     const closeHoverMenu = () => {
       setMenuDropDownOpen(false);
     };
   
     useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook
     
     const handleClose = () => {
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
                                <a href="/"><img src={MySVG} width="140px" height="20%" style={{ marginTop: '20px', display: 'block' }}></img></a>
                            </div>
                            <ul>
                                <li>
                                    {/* <a href="">공모전</a> */}
                                    <Link to="/contest">공모전</Link>
                                </li>
                                <li>
                                    <Link to="/externalActivity">대외활동</Link>
                                    {/* <a href="">대외활동</a> */}
                                </li>
                                <li>
                                    <Link to="/club">동아리</Link>
                                    {/* <a href="">동아리</a> */}
                                </li>
                                <li>
                                    <Link to="/team/recruiteList">팀원 모집게시판</Link>
                                    {/* <a href="">팀원 모집게시판</a> */}
                                </li>
                            </ul>
                        </div>
                        <div className="right-box">
                            <div className="search-bar">
                               <StyledInputBase
                               sx={{ ml: 1, flex: 1 }}
                               placeholder="검색"
                               inputProps={{ 'aria-label': 'search google maps' }}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                                }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search"  onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <ProfileBtn
                             id="basic-button"
                             aria-controls={open2 ? 'basic-menu' : undefined}
                             aria-haspopup="true"
                             aria-expanded={open2 ? 'true' : undefined}
                             onClick={handleClick2}>
                                { userInfo ? 
                                (
                                    <div>
                                        {/* <AccountCircleIcon src={userInfo.username}/> */}

                                       <img src={userInfo?.profileImg} height={40} style={{ borderRadius: '50%' }}/>
                                        {/* <Avatar src={userInfo?.profileImg}/> */}
                                        {/* <div>{userInfo?.username}</div> */}
                                        {/* <button onClick={handleLogout}>log out</button> */}
                                    </div>
                                )
                                : 
                                (
                                    <div>
                                        <FilledBtn text= {"로그인"} handle={() => window.location.href = `/login?redirect=${window.location.pathname}`}></FilledBtn> 
                                    </div>
                                ) 
                                
                                }
                            </ProfileBtn>
                            
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open2}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <StyledMenuItem onClick={handleClose}>
                                <Link to="/mypage/profileSetting">
                                        프로필 보기
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem onClick={handleClose}>
                                    <Link to="/" onClick={handleLogout}>
                                        로그아웃
                                    </Link>
                                </StyledMenuItem>
                            </Menu>
                           {/*수정 */}
                           <Button onMouseOver={() => setMenuDropDownOpen(true)}>
                                    <NotificationBadge badgeContent={4} color="primary">
                                        <NotificationsIcon color="action" />
                                    </NotificationBadge>
                                </Button>
                                {
                                    isMenuDropDownOpen &&
                                    <div onMouseLeave={() => setMenuDropDownOpen(false)}>
                                        <Notice/> 
                                    </div>
                                }
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
                                    <a href="/"><img src={MySVG} width="80px" height="20%" style={{ marginTop: '20px', display: 'block' }}></img></a>
                                </div>
                                <div className="dp-flex">
                                    <ProfileBtn sx={{ml : 1}}>
                                        <AccountCircleIcon />
                                    </ProfileBtn>
                                    <MenuBtn onClick={handleClick}>
                                        <MenuIcon />
                                    </MenuBtn>
                                    {/*수정 */}
                                    {/*0809 수정 */}
                                    <Button onClick={() => setMenuDropDownOpen(!isMenuDropDownOpen)}>
                                        <NotificationBadge badgeContent={4} color="primary">
                                            <NotificationsIcon color="action" />
                                        </NotificationBadge>
                                    </Button>
                                    {/*0809 수정 */}
                                    {
                                        isMenuDropDownOpen &&
                                        <div onClick={() => setMenuDropDownOpen(false)}>
                                            {/*0808 수정 */}
                                            <Notice handle={setMenuDropDownOpen}/> 
                                        </div>
                                     }
                                </div>
                            </div>
                            <div className="search-bar">
                                <StyledInputBase
                                      sx={{ ml: 1, flex: 1 }}
                                      placeholder="검색"
                                      inputProps={{ 'aria-label': 'search google maps' }}
                                      value={search}
                                      onChange={(e) => setSearch(e.target.value)}
                                      onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                           handleSearch();
                                       }}}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <StyledCollapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{mt : 2}}>
                                    <StyledLink Link to="/contest" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="공모전" />
                                        </ListItemButton>
                                    </StyledLink>
                                    <StyledLink Link to="/externalActivity" underline="none">
                                        <ListItemButton sx={{ p : 1}}>
                                            <StyledListItemText primary="대외활동" />
                                        </ListItemButton>
                                    </StyledLink>
                                    <StyledLink Link to="/club" underline="none">
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
`
const StyledMenuItem = styled(MenuItem)`
    a{
        font-size: 1.6rem;
        color: #3b3b3b;
        text-decoration: none;
    }
`;

// const NotificationMenu = styled(Menu)`
//     &>div{
//         width: 45rem;
//         height: 50rem;
//         max-height: 50rem;
//         overflow-y: scroll;
//     }
//     .close_btn{
//         display: flex;
//         align-items: flex-end;
//         justify-content: flex-end;
//         padding: 1rem 2rem 0 2rem;
//         button{
//             padding: 0;
//             svg{
//                 width: 2rem;
//                 height: 2rem;
//             }
//         }
//     }
//     .notification-list{
//         h3{
//             font-size: 2rem;
//             color: #3b3b3b;
//             font-weight: bold;
//             padding: 0 2rem 2rem 2rem;
//         }
//         li{
//             background-color: #fff;
//             padding: 2rem;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             cursor: pointer;
//             .img-box{
//                 width: 24%;
//                 img{
//                     width: 100%;
//                     border-radius: 4px;
//                 }
//             }
//             .text-box{
//                 width: 70%;
//                 h4{
//                     font-size: 1.6rem;
//                     color: #3b3b3b;
//                     line-height: 150%;
//                     font-weight: 600;
//                     margin-bottom: 1rem;
//                 }
//                 p{
//                     font-size: 1.4rem;
//                     color: rgba(0,0,0,.6);
//                     line-height: 150%;
//                 }
//             }
//         }
//         li:hover{
//             background-color: #FFF1E5;
//         }
//     }
// `;

