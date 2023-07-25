import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav"
import Footer from "../../component/common/Footer"
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import ScrollList from "../../component/list/ScrollList";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconWrap from "../../component/list/IconWrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comment from "../../component/comment/Comment";
import Button from "@mui/material/Button";
import ApplicationModal from "../../component/modal/ApplicationModal";


export default function TeamDetail({done}){

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
                        <Content>
                            <div className="content-wrap">
                                <div className="title-wrap">
                                    <IconButton className="prev-btn"><KeyboardArrowLeftIcon/></IconButton>
                                    <div className="title">
                                        <h1>제 10회 물류산업진흥재단 논문 공모전</h1>
                                        <IconWrap />
                                    </div>
                                    <ul className="team-info">
                                        <li className="info-wrap">
                                            <div className="info-box">
                                                <h2>모집 마감까지 <strong>D-10</strong></h2>
                                            </div>
                                            <div className="info-box">
                                                <h2>현재인원/최대인원 : <strong>2/5</strong></h2>
                                            </div>
                                        </li>
                                        <li className="button-wrap">
                                            {
                                                done ? 
                                                <Button variant="contained" disabled>이미 참여한 공고입니다</Button> :
                                                <ApplicationModal/>
                                            }
                                        </li>
                                    </ul>
                             
                                </div>
                                <div className="content">
                                    <div className="profile dp-flex">
                                        <IconButton sx={{p : 0}}>
                                            <AccountCircleIcon/>
                                        </IconButton>
                                        <h3>유저 1</h3>
                                    </div>
                                    <div className="text-wrap">
                                        <h4>좋은 팀원구합니다</h4>
                                        <p>
                                            안녕하세요 팀원모집합니다 성실하게 하실 분 구합니다 제 프로필 보고 같이하실분은 참여신청 눌러주세요안녕하세요 팀원모집합니다 성실하게 하실 분 구합니다 제 프로필 보고 같이하실분은 참여신청 눌러주세요안녕하세요 팀원모집합니다 성실하게 하실 분 구합니다 제 프로필 보고 같이하실분은 참여신청 눌러주세요안녕하세요 팀원모집합니다 성실하게 하실 분 구합니다 제 프로필 보고 같이하실분은 참여신청 눌러주세요안녕하세요 팀원모집합니다 성실하게 하실 분 구합니다 제 프로필 보고 같이하실분은 참여신청 눌러주세요
                                        </p>
                                    </div>
                                </div>
                                <div className="comment-wrap">
                                    <Comment />
                                </div>
                            </div>
                        </Content>
                        <SideScroll>
                            <ScrollList />
                        </SideScroll>
                    </PaddingWrap>
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )
}

const Container = styled(Box)`
    width: 100%;
    margin-top: 13rem;
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
    }
`;

const PaddingWrap = styled(Box)`
    padding: 0 5%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .space-between{
        justify-content: space-between;
    }
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }
`;


const SideScroll = styled(Box)`
    width: 14%;
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;


const Content = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .content-wrap{
        width: 65%;
        .prev-btn{
            padding: 0;
            svg{
                width: 3rem;
                height: 3rem;
            }
        }
        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin: 2rem 0;
            h1{
                font-size: 3rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
        }
        .team-info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 2rem;
            border-bottom: 1px solid #FF7300;
            .info-wrap{
                display: flex;
                align-items: center;
                .info-box:first-of-type{
                    margin-right: 1rem;
                }
                .info-box{
                    padding: 1rem 2rem;
                    border: 1px solid rgba(0,0,0,.1);
                    border-radius: 4px;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    h2{
                        font-size: 1.6rem;
                        color: #3b3b3b;
                        line-height: 150%;
                        font-weight: 600;
                        text-align: center;
                        strong{
                            color: #FF7300;
                            font-weight: bold;
                        }
                    }
                }
            }
            li{
                button{
                    padding: .8rem 3rem !important;
                }
            }
            .button-wrap{
                button{
                    font-size: 1.6rem;
                }
            }
        }
        .content{
            padding: 3rem 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            .profile{
                margin-bottom: 2rem;
                svg{
                    width: 4rem;
                    height: 4rem;
                    color: #FFAD6A;
                }
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 130%;
                    font-weight: 700;
                    margin-left: .5rem;
                }
            }
            .text-wrap{
                h4{
                    font-size: 1.8rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                p{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                }
            }
        }
        .comment-wrap{
            margin-top: 2rem;
        }
    }

    @media ${() => theme.device.desktop} {
        .content-wrap{
            width: 100%;
        }
    }

    @media ${() => theme.device.mobile} {
        .content-wrap{
            .title{
                flex-direction: column;
                align-items: flex-start;
                h1{
                    margin-bottom: 1rem;
                    font-size: 2.5rem;
                }
            }
            .team-info{
                flex-direction: column;
                align-items: flex-start;
                .info-wrap{
                    width: 100%;
                    margin-bottom: 1rem;
                    .info-box{
                        padding: 1rem;
                        width: 48%;
                        h2{
                            font-size : 1.4rem;
                        }
                    }
                }
                .button-wrap{
                    width: 100%;
                }
            }
        }
    }
`;
