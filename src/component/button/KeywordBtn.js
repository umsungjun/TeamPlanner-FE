import React, { useState } from "react";
import styled from "@emotion/styled";
import theme from "../../style/theme";
import {createTheme,Radio,ThemeProvider} from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
export default function KeywordBtn({text}){

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
                <input type="radio" id={text} name={text} />
                <Keyword htmlFor={text} variant="outlined" color="primary">{text}</Keyword>
            </ThemeProvider>
        </>
    )
}

const Keyword = styled.label`
    font-size: 1.6rem;
    padding: 1rem 2rem;
    border: 1px solid rgba(255,115,0,.5);
    color: #FF7300;
    font-weight: 600;
    cursor: pointer;
    border-radius: 100px;
    transition: background-color .2s ease-in-out;
    min-width: max-content;

    @media ${() => theme.device.mobile} {
        font-size: 1.4rem;
    }
`;