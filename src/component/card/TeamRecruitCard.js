import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Grid, IconButton, Button } from "@mui/material";
import theme from "../../style/theme";
import {createTheme,ThemeProvider} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function TeamRecruiteCard({
    state, // ing, doing
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
    recruitmentBoardRecruitmentPeriod,
    recruitmentBoardActivityName,
    recruitmentBoardImg,
    recruitmentBoardActivityField,
    // recruitmentBoardCategory

}){
    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
            secondary: {
                main: "#D9D9D9",
              },
         },
    })

    

    return(
        <>
        <ThemeProvider theme={theme}>  
            <RecruitCardWrap>
                <div className="recruiteCardWrap">
                    <div className="team-img">
                        <img src={recruitmentBoardImg} width="100%"/>
                    </div>
                    <div className="team-info">
                        <div className="dp-wrap">
                            <div className="keyword-wrap">
                                <Keyword>{recruitmentBoardActivityField}</Keyword>
                            </div>
                            <IconButton><ChevronRightIcon/></IconButton>  
                        </div>
                        <h2>{title}</h2>
                        {/* <p>{recruitmentBoardActivityName}</p> */}
                        <p>{content}</p>
                        <div className="dp-wrap">
                            {
                                state == "done" ?
                                <State><div class="done">마감</div></State>
                                :  <State><div class="ing">진행중</div></State>
                            }
                            <div className="view-icon"><RemoveRedEyeIcon/><span>{viewCount}</span></div>
                        </div>
                        <div className="dp-wrap btn-wrap">
                            <Button variant="outlined" color="secondary">팀원모집<strong>{currentMemberSize}/{maxMemberSize}</strong></Button>
                            <Button variant="outlined" color="secondary">댓글<strong>{commentCount}</strong></Button>
                        </div>
                    </div>
                </div>
            </RecruitCardWrap>
        </ThemeProvider>
        </>
    )
}

const RecruitCardWrap = styled(Box)`
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    .recruiteCardWrap{
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .team-img{
            width: 38%;
            height: 21rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .team-info{
            width: 58%;
            .dp-wrap{
                display: flex;
                align-items: center;
                justify-content: space-between;
                svg{
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }
            .keyword-wrap{
                display: flex;
                align-items: center;
            }
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                font-weight: 600;
                line-height: 140%;
            }
            p{
                font-size: 1.6rem;
                color: #808080;
                line-height: 150%;
                margin: 1rem 0;
            }
            .view-icon{
                display: flex;
                align-items: center;
                margin-right: .5rem;
                svg{
                    color: rgba(0,0,0,.5);
                    width: 2rem;
                    height: 2rem;
                }
                span{
                    font-size: 1.2rem;
                    color: rgba(0,0,0,.5);
                    margin-left:.3rem;
                }
            }
            .btn-wrap{
                margin-top: 1rem;
                button{
                    color: #3b3b3b;
                    font-size: 1.6rem;
                    width: 49%;
                    padding: .5rem 0 ;
                    strong{
                        color: #FF7300;
                        margin-left: .5rem;
                    }
                }
            }
        }
    }
    @media ${() => theme.device.mobile} {
    .recruiteCardWrap{
        .team-img{
            height: 19rem;
        }
        .team-info{
            h2{
                font-size: 1.6rem;
            }
            p{
                font-size: 1.4rem;
            }
            .btn-wrap{
                button{
                    font-size: 1.4rem;
                }
            }
        }
    }
    }
`;

const Keyword = styled(Box)`
    padding: 3px 8px;
    background-color: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    margin-right: .5rem;
    font-size: 14px;
    line-height: 130%;
    color: #3b3b3b;
    @media ${() => theme.device.mobile} {
        font-size: 1.2rem;
    }
`;

const State = styled(Box)`
    &>div{
        padding: 3px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        margin-right: .5rem;
        font-size: 14px;
        line-height: 130%;
        color: #fff;
    }
    .done{
        background-color: #929292;
    }
    .ing{
        background-color: #FF7300;
    }
    @media ${() => theme.device.mobile} {
        font-size: 1.2rem;
    }
`;