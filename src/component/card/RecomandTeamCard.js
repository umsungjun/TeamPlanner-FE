import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function RecomandTeamCard(){
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
                <RecommendTeamCardWrap>
                    <div className="padding">
                        <div className="img-box">
                            <img src="/img/profile/profile.png" alt="프로필 이미지" />
                        </div>
                        <div className="user-title">
                            <h2>사용자 1</h2>
                            <VerifiedUserIcon/>
                        </div>
                        <p>DB / 빅데이터 / DS, 웹서버</p>
                        <div className="tag-wrap">
                            <h4 className="tag">#데이터베이스</h4>
                            <h4 className="tag">#웹크롤링</h4>
                            <h4 className="tag">#API</h4>
                        </div>
                    </div>
                </RecommendTeamCardWrap>
           </ThemeProvider>
        </>
    )
}

const RecommendTeamCardWrap = styled(Box)`
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 4px;
    width: 100%;
    .padding{
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .img-box{
        width: 30%;
        img{width:100%;}
    }
    .user-title{
        display: flex;
        align-items: center;
        margin: .5rem 0;
        h2{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: bold;
            margin-right: .5rem;
        }
        svg{
            color: #FF7300;
            width: 2rem;
            height: 2rem;
        }
    }
    p{
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 500;
        padding-bottom: 1rem;
        text-align: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        width: 100%;
        margin-bottom: 1rem;
    }
    .tag-wrap{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 80%;
        .tag{
            font-size: 1.4rem;
            margin-right: 1rem;
            margin-bottom: 1rem;
            color: #3b3b3b;
            padding: .3rem .8rem;
            border-radius: 100px;
            background-color: #EFEFEF;
        }
    }
`;