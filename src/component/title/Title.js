import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";

export default function Title({text}){
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
                <TitleWrap>
                    <h2>{text}</h2>
                </TitleWrap>
            </ThemeProvider>
        </>
    )
}

const TitleWrap = styled(Box)`
    padding-bottom: 2rem;
    border-bottom: 1.5px solid #FF7300;
    width: 100%;
    margin-bottom: 2rem;
    h2{
        font-size: 2rem;
        color: #3b3b3b;
        font-weight: bold;
        line-height: 150%;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
`;