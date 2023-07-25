import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import theme from "../../style/theme";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import Title from "../../component/title/Title";
import MyPageMenu from "../../component/menu/MypageMenu";
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import FilledBtn from "../../component/button/FilledBtn";
import SolidBtn from "../../component/button/SolideBtn";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AccountSetting(){
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
                <Nav />
                <Container>
                    <PaddingWrap>
                        <Title text={"마이페이지"}/>
                        <ContentWrap>
                            <SideList>
                                <MyPageMenu select={"계정설정"}/>
                            </SideList>
                            <Content>
                                <h1>계정 설정</h1>
                                <h2>알림설정</h2>
                                <ul>
                                    <li>
                                        <h3>공개범위설정</h3>
                                        <Switch {...label} defaultChecked />
                                    </li>
                                    <li>
                                        <h3>참여신청</h3>
                                        <Switch {...label}  />
                                    </li>
                                    <li>
                                        <h3>참여 수락/거절</h3>
                                        <Switch {...label}  />
                                    </li>
                                </ul>
                                <h2>비밀번호</h2>
                                <div className="input-wrap">
                                    <TextField id="id" variant="outlined" type="password"/>
                                    <div className="sBtn"><FilledBtn text="비밀번호 변경"/></div>
                                </div>
                                <div className="dp-end">
                                    <SolidBtn text={"회원탈퇴"}/>
                                </div>
                            </Content>
                        </ContentWrap>
                    </PaddingWrap>
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )
}

const Container = styled(Box)`
    width: 100%;
    height: 100vh;
    @media ${() => theme.device.tablet} {
       height: auto;
    }
`;

const PaddingWrap = styled(Box)`
    padding: 13rem 15% 0 15%;   

    @media ${() => theme.device.tablet} {
       padding : 16rem 5% 0 5% ;
    }
`;

const ContentWrap = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }

`;

const SideList = styled(Box)`
    width: 18%;
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;

const Content = styled(Box)`
    width: 80%;
    h1{
        font-size: 2rem;
        color: #3b3b3b;
        font-weight: bold;
        line-height: 150%;
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
    h2{
        font-size: 1.8rem;
        color: #3b3b3b;
        font-weight: 600;
        width: 100%;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    ul{
        margin-bottom: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 48%;
            padding: 2rem 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
            }
         
        }
    }
    .input-wrap{
        width: 50%;
        display: flex;
        align-items: center;
        margin-top: 2rem;
        input{
            width: 30rem;
        }
        .sBtn{
            width: 35%;
            margin-left: 1rem;
        }
    }
    .dp-end{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        margin-top: 5rem;
        button{
            width: 15%;
        }
    }
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
    @media ${() => theme.device.tablet} {
        .input-wrap{
            width: 100%;
            input{
                font-size: 1.4rem;
                padding: 1.3rem 1rem;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        ul{
            li{
                width: 100%;
            }
        }
        .dp-end{
            button{
                width: 100%;
            }
        }
        .input-wrap{
            &>div{
                width: 100%;
            }
            input{
                padding: 1.1rem 1rem;
            }
            .sBtn{
                width: 60%;
            }
        }
    }
`;