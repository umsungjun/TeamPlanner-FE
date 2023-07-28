import React, { useState } from "react";
import styled from "@emotion/styled";
import { createGlobalStyle } from 'styled-components';
import {createTheme,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilledBtn from "../../component/button/FilledBtn";
import Button from "@mui/material/Button";
import theme from "../../style/theme";

export default function Login(){
    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
            secondary : {
                main : "#3b3b3b"
            }
         },
    })

    return(
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <LoginWrap>
                    <div className="login-box">
                        <div className="logo">
                            <img src="/logo.svg" alt="로고이미지"/>
                        </div>
                        <ul className="input-wrap">
                            <li>
                                <h4>아이디</h4>
                                <TextField id="outlined-basic" variant="outlined" fullWidth placeholder="아이디를 입력하세요"/>
                            </li>
                            <li>
                                <h4>비밀번호</h4>
                                <TextField id="outlined-basic" variant="outlined" type="password" fullWidth placeholder="비밀번호를 입력하세요"/>
                            </li>
                        </ul>
                        <ul className="a-wrap">
                            <li>
                                <a href="">아이디</a>
                                <span>|</span>
                                <a href="">비밀번호 찾기</a>
                            </li>
                            <li>
                                <a href="" className="joinBtn">회원가입</a>
                            </li>
                        </ul>
                        <FilledBtn text={"로그인"}/>
                        <div className="social-login">
                            <Button variant="outlined" color="secondary" fullWidth><img src="/img/icon/google.svg" alt="카카오" />구글로 로그인</Button>
                            <Button variant="outlined" color="secondary" fullWidth><img src="/img/icon/kakao.svg" alt="카카오" />카카오로 로그인</Button>
                        </div>
                    </div>
                </LoginWrap>
            </ThemeProvider>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FAF9F8;
    }
    @media ${() => theme.device.mobile2} {
        body{
            background-color: #fff;
        }
    }
`;

const LoginWrap = styled(Box)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-box{
        width: 25%;
        background-color: #fff;
        padding: 7rem 5rem;
        box-shadow: 0 0 8px 3px rgba(0,0,0,.05);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .input-wrap{
            width: 100%;
            margin-top: 5rem;
            li{
                h4{
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: #3b3b3b;
                    line-height: 150%;
                    margin-bottom: .5rem;
                }
                input{
                    font-size: 1.4rem;
                    padding: 1.2rem 2rem;
                }
            }
            li:first-of-type{
                margin-bottom: 2rem;
            }
        }
        .a-wrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin: 2rem 0;
            li{
                a{
                    font-size: 1.4rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                }
                span{
                    margin: 0 .5rem;
                    font-size: 1.4rem;
                    color: #3b3b3b;
                }
                .joinBtn{
                    color: #FF7300;
                    font-weight: 600;
                    text-decoration: underline;
                }
            }
        }
        .social-login{
            width: 100%;
            padding-top: 3rem;
            border-top: 1px solid rgba(0,0,0,.1);
            margin-top: 3rem;
            button{
                border-color: #D9D9D9;
                font-size: 1.6rem;
                font-weight: 500;
                box-shadow: none;
                border-radius: 4px;
                padding: .8rem 0;
                display: flex;
                align-items: center;
                img{
                    margin-right: 1rem;
                }
            }
            button:first-of-type{
                margin-bottom: 1rem;
            }
            button:hover{
                background-color: #fff;
            }
        }
    }
    @media ${() => theme.device.desktop} {
        .login-box{
            width: 35%;
        }
    }
    @media ${() => theme.device.mobile2} {
        .login-box{
            width: 100%;
            border-radius: 0;
            box-shadow: none;
        }
    }

`;