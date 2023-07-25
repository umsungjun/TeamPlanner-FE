import React, { useState } from "react";
import styled from "@emotion/styled";
import {Box, createTheme,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";
import CompetitionCard from "../card/CompetitionCard";

export default function ScrollList(){

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
               <ScrollListWrap>
                    <h3>공모전 대외활동 <strong>인기 소식</strong></h3>
                    <div className="scroll-list">
                        <div className="scroll">
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                        </div>
                    </div>
               </ScrollListWrap>
            </ThemeProvider>
        </>
    )
}

const ScrollListWrap = styled(Box)`
    width: 100%;
    h3{
        font-size: 1.8rem;
        color: #3b3b3b;
        line-height: 150%;
        strong{
            font-weight: bold;
        }
    }
    .scroll{
        height: 108vh;
        overflow-y: scroll;
        margin-top: 2rem;
    }
    .card{
        margin-bottom: 1.5rem;
    }
    .card:last-of-type{
        margin: 0;
    }
    @media ${() => theme.device.desktop} {
        margin-top: 5rem;
        .scroll-list{
            width: 100%;
            overflow-x: scroll;
        }
        .scroll{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: auto;
            overflow-y: auto;
            width: 120vw;
        }
        .card{
            width: 100%;
            margin-right: 2rem;
        }
        .card:last-of-type{
        margin-bottom: 1.5rem;
        }
    }
    @media ${() => theme.device.mobile2} {
        .scroll{
            width: 280vw;
        }
    }
`;