import React, { useState } from "react";
import styled from "@emotion/styled";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilledBtn from "../../component/button/FilledBtn";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Join(){

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
            <JoinWrap>
                <h1>회원가입</h1>
                <div className="join-box">
                    <h2>필수입력</h2>
                    <ul>
                        <li>
                            <h3>아이디</h3>
                                <div className="input-wrap">
                                    <TextField id="id" variant="outlined" fullWidth/>
                                    <div className="sBtn"><FilledBtn text="중복확인"/></div>
                                </div>
                        </li>
                        <div className="notice-wrap">
                            <p className="notice-text">사용가능한 아이디 입니다.</p>
                        </div>
                        <li>
                            <h3>비밀번호</h3>
                            <div className="input-wrap">
                                <TextField id="password" variant="outlined" fullWidth  type="password"/>
                            </div>
                        </li>
                        <li>
                            <h3>이름</h3>
                            <div className="input-wrap">
                                <TextField id="name" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>이메일</h3>
                            <div className="input-wrap">
                                <TextField id="email" variant="outlined" fullWidth/>
                                <div className="sBtn"><FilledBtn text="인증하기"/></div>
                            </div>
                        </li>
                        <li>
                            <h3>인증번호</h3>
                            <div className="input-wrap">
                                <TextField id="certification" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <div className="notice-wrap">
                            <div className="number-text">
                                <p className="gray-text">인증번호가 발송되었습니다 <span>2:50</span></p>
                                <a href="">재전송</a>
                            </div>
                        </div>
                        <li>
                            <h3>전화번호</h3>
                            <div className="input-wrap">
                                <TextField id="phone" variant="outlined" fullWidth />
                            </div>
                        </li>
                    </ul>
                    <div className="title">
                        <h3>선택사항</h3>
                        <IconButton>
                            <ErrorOutlineIcon />
                        </IconButton>
                    </div>
                    <ul>
                        <li>
                            <h3>성별</h3>
                            <div className="radio-wrap">
                                <div className="radio-box">
                                    <input type="radio" name="gender" id="m"></input>
                                    <label htmlFor="m">남자</label>
                                </div>
                                <div className="radio-box">
                                    <input type="radio" name="gender" id="f"></input>
                                    <label htmlFor="f">여자</label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <h3>나이</h3>
                            <div className="input-wrap">
                                <TextField id="age" variant="outlined" sx={{width : "50%"}} />
                            </div>
                        </li>
                        <li>
                            <h3>주소</h3>
                            <div className="input-wrap">
                                <TextField id="adress" variant="outlined" sx={{width : "50%"}} />
                            </div>
                        </li>
                        <li>
                            <h3></h3>
                            <div className="input-wrap">
                                <TextField id="adress2" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>직업</h3>
                            <div className="input-wrap">
                                <TextField id="job" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>학력</h3>
                            <div className="input-wrap">
                                <TextField id="education" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>소속</h3>
                            <div className="input-wrap">
                                <TextField id="group" variant="outlined" fullWidth />
                            </div>
                        </li>
                    </ul>
                </div>
            </JoinWrap>
            <Footer />
         </ThemeProvider>
        </>
    )
}

const JoinWrap = styled(Box)`
    margin-top: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-size: 2.5rem;
        color: #3b3b3b;
        font-weight: 600;
        line-height: 150%;
        margin-bottom: 2rem;
    }
    .join-box{
        width: 30%;
        background-color: #fff;
        padding: 5rem;
        box-shadow: 0 0 8px 3px rgba(0,0,0,.05);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2{
            font-size: 2rem;
            line-height: 150%;
            color: #FF7300;
            width: 100%;
            border-bottom: 1px solid #FF7300;
            padding-bottom: 1rem;
            font-weight: 600;
            margin-bottom: 3rem;
        }
        .title{
            width: 100%;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            margin-top: 5rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            h3{
                font-size: 2rem;
                line-height: 150%;
                color: #3b3b3b;
                font-weight: 600;
            }
            svg{
                color: rgba(0,0,0,.5);
                width: 2rem;
                height: 2rem;
            }
        }
        ul{
            width: 100%;
            li:first-of-type{
                margin: 0;
            }
            li:not(ol li){
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 1.5rem;
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    font-weight: 600;
                    line-height: 150%;
                }
                input{
                    font-size: 1.4rem;
                    padding: 1.2rem 2rem;
                }

                .input-wrap{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    .sBtn{
                        width: 35%;
                        margin-left: 1rem;
                    }
                }
            }
            .notice-wrap{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: .5rem;
                .notice-text{
                    width: 65%;
                    font-size: 1.4rem;
                    color: #54B904;
                    font-weight: 400;
                    line-height: 150%;
                }
                .number-text{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p{
                        color: rgba(0,0,0,.5);
                        font-size: 1.4rem;
                        font-weight: 400;
                        line-height: 150%;
                    }
                    a{
                        color: #FF7300;
                        font-weight: 600;
                        text-decoration: underline;
                        font-size: 1.4rem;
                    }
                }
            }
        }

        .radio-wrap{
            display: flex;
            align-items: center;
            width: 65%;
            .radio-box{
                display: flex;
                align-items: center;
                margin-right: 5rem;
                label{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                    margin-left: .5rem;
                }
                input[type="radio"]{
                    padding: 0;
                    margin: 0;
                }
            }
            .radio-box:last-of-type{
                margin: 0;
            }
        }
    }
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
        h1{
            font-size: 2rem;
        }
        .join-box{
            width: 50%;
            h2{
                font-size: 1.8rem;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        h1{
            margin: 0;
        }
        .join-box{
            width: 90%;
            border-radius: 0;
            padding: 0;
            margin-top: 3rem;
            box-shadow: none;
        }
    }
`;