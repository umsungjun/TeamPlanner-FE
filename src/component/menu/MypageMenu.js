import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function MyPageMenu({select}){

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

    return(
        <>
            <ThemeProvider theme={theme}>
                <MyPageMenuWrap>
                    <div className="scroll">
                        <MenuWrap>
                            <ListItem disablePadding>
                                {/*수정*/}
                                {
                                    select == "계정설정" ?
                                    <ListItemButton component="a" href="/mypage/acountSetting" className="select">
                                        <ListItemText primary="계정 설정" />
                                    </ListItemButton>
                                    :
                                    <ListItemButton component="a" href="/mypage/acountSetting" >
                                        <ListItemText primary="계정 설정" />
                                    </ListItemButton>
                                }
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                  {/*수정*/}
                                {
                                    select == "프로필관리" ?
                                    <ListItemButton component="a" href="/mypage/profileSetting" className="select">
                                        <ListItemText primary="프로필 관리" />
                                    </ListItemButton>
                                    :
                                    <ListItemButton component="a" href="/mypage/profileSetting" >
                                        <ListItemText primary="프로필 관리" />
                                    </ListItemButton>
                                }
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                  {/*수정*/}
                                {
                                    select == "팀관리" ?
                                    <ListItemButton component="a" href="/mypage/teamManagement" className="select">
                                        <ListItemText primary="팀 관리" />
                                    </ListItemButton>
                                    :
                                    <ListItemButton component="a" href="/mypage/teamManagement" >
                                        <ListItemText primary="팀 관리" />
                                    </ListItemButton>
                                }
                            </ListItem>
                            <Divider />

                            {/*  수정 */}
                            <ListItem disablePadding>
                                {
                                    select == "참여신청" ?
                                    <ListItemButton component="a" href="/mypage/participation" className="select">
                                        <ListItemText primary="참여신청" />
                                    </ListItemButton>
                                    :
                                    <ListItemButton component="a" href="/mypage/participation" >
                                        <ListItemText primary="참여신청" />
                                    </ListItemButton>
                                }
                            </ListItem>
                            <Divider />

                            <ListItem disablePadding>
                                {
                                    select == "고객지원" ?
                                    <ListItemButton component="a" href="" className="select">
                                        <ListItemText primary="고객지원" />
                                    </ListItemButton>
                                    :
                                    <ListItemButton component="a" href="" >
                                        <ListItemText primary="고객지원" />
                                    </ListItemButton>
                                }
                            </ListItem>
                        </MenuWrap>
                    </div>
                </MyPageMenuWrap>
            </ThemeProvider>
        </>
    )
}

const MenuWrap = styled(List)`
    width: 100%;
    span{
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
    }
    .select{
        span{
            font-weight: bold;
            color: #FF7300;
        }
    }
    @media ${() => theme.device.desktop} {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 2rem;
        .select{
            border: none;
            span{
                color: #FF7300;
            }
        }
        li{
            width: auto;
        }
        ul{
        }
    }
    @media ${() => theme.device.mobile3} {
        /* 수정 */
        width: 460px;
        overflow-y: scroll;
    }
`;

const MyPageMenuWrap = styled(Box)`
    width: 100%;
    @media ${() => theme.device.mobile} {
        overflow-y: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }
`;