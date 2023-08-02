import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import SolidBtn from "../button/SolideBtn";
import FilledBtn from "../button/FilledBtn";

export default function ParticipationCard(){
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
                <ParticipationCardWrap>
                    <div className="padding">
                        <ul className="participation-list">
                            <li className="img-box">
                                <img src="/img/card/sample3.png" />
                            </li>
                            <li className="text-wrap">
                                <h2>제목 1</h2>
                                <p>안녕하세요 저 알고리즘 빡고수입니다. 제 프로필보세요 ㅋㅋ</p>
                            </li>
                        </ul>
                        <div className="button-wrap">
                            <SolidBtn text={"취소"}></SolidBtn>
                            <FilledBtn text={"참여신청"} />
                        </div>
                    </div>
                </ParticipationCardWrap>
            </ThemeProvider>
        </>
    )
}

const ParticipationCardWrap = styled(Box)`
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    .padding{
        padding: 3rem;
    }
    .participation-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 2rem 0;
        li{
            margin: 0;
        }
        .img-box{
            width: 32%;
            img{
                border-radius: 1rem;
                width: 100%;
                height: 130px;
            }
        }
        .text-wrap{
            width: 63%;
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                font-weight: 600;
                line-height: 150%;
                margin-bottom: .5rem;
            }
            p{
                font-size: 1.6rem;
                color: #3b3b3b;
                font-weight: 400;
                line-height: 150%;
            }
        }
    }
    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        div{
            width: 49%;
            button{
                width: 100% !important;
            }
        }
        button{
            padding:.3em 0;
            width: 49%;
        }
    }
    @media ${() => theme.device.mobile2} {
        .participation-list{
            .img-box{
                width: 30%;
                img{
                    height: 100px;
                }
            }
            .text-wrap{
                width: 65%;
            }
        }
    }
`;