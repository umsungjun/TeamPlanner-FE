import React, { useState } from "react";
import styled from "@emotion/styled";
import {Avatar, createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import theme from "../../style/theme";
import IconWrap from "../list/IconWrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { borderRadius, display } from "@mui/system";

export default function TaemCard({
    id,
    title,
    content,
    viewCount,
    likeCount,
    currentMemberSize,
    maxMemberSize,
    createdAt,
    authorNickname,
    authorProfileImg,
    commentCount,
    boardId,
    recruitmentBoardCategory
    
}){

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
                <a href={`/recruitment/${id}`}>
                    <CardWrap>
                        <ul className="card-wrap">
                            <li className="card-info">
                                <h2>{title}</h2>
                                <div className="name">
                                    <Avatar src={authorProfileImg}  style={{}}/>
                                    <h3>{authorNickname}</h3>
                                </div>
                                <p style={{textOverflow:"ellipsis", wordWrap: "break-word", display: "inline-block", overflow: "hidden"}}>
                                {content}
                                </p>
                                <IconWrap likeCount={likeCount} viewCount={viewCount} commentCount={commentCount}/>
                            </li>
                            <li className="img-box">
                                <div className="img-cover">
                                    <h4>{recruitmentBoardCategory}</h4>
                                    <div className="personnel">
                                        <h5>최소인원 / 최대인원</h5>
                                        <strong>{currentMemberSize}/{maxMemberSize}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </CardWrap>
                </a>
            </ThemeProvider>
        </>
    )
}

const CardWrap = styled(Box)`
    width: 100%;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    .card-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3rem;
        .card-info{
            width: 58%;
            h2{
                font-size: 2rem;
                color: #3b3b3b;
                font-weight: bold;
                margin-bottom: 1rem;
                line-height: 150%;
            }
            p{
                font-size: 1.4rem;
                color: #3b3b3b;
                font-weight: 500;
                margin-bottom: 2rem;
                line-height: 150%;
            }
            .name{
                display: flex;
                align-items: center;
                margin-bottom: .5rem;
                svg{
                    color: #FFAD6A;
                    width: 2.5rem;
                    height: 2.5rem;
                }
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                    margin-left: .5rem;
                }
            }
        }
        .img-box{
            width: 15rem;
            height : 15rem;
            background-image: url(../img/team/sample.png);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 10px;
            position: relative;
            .img-cover{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                // background: rgb(255,255,255);
                // background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,.7) 100%);
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;
                h4{
                    font-size: 1.4rem;
                    border: 1px solid #FF7300;
                    color: #FF7300;
                    font-weight: 600;
                    background-color: #fff;
                    border-radius: 100px;
                    padding: .3rem 1rem;
                    width: fit-content;
                    margin: 1rem;
                }
                .personnel{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin: 1rem;
                    h5{
                        // color: #fff;
                        color: #3b3b3b;
                        font-size: 1.4rem;
                        font-weight: 400;
                        line-height: 130%;
                        text-align: right;
                    }
                    strong{
                        font-size: 3rem;
                        font-weight: bold;
                        // color: #fff;
                        color: #3b3b3b;
                        line-height: 130%;
                        text-align: right;
                    }
                }
            }
        }
    }
    @media ${() => theme.device.mobile} {
        .card-wrap{
            flex-direction: column;
            padding: 2rem;
            .card-info{
                width: 100%;
                p{
                    margin-bottom: 1rem;
                }
            }
            .img-box{
                width: 100%;
                margin-top: 1rem;
            }
        }
    }
`;

