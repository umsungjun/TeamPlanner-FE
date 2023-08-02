import React, { useState } from "react";
import styled from "@emotion/styled";
import theme from "../../style/theme";
import {createTheme,Radio,ThemeProvider} from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from "@mui/material/Box";
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
            {/*수정*/}
            <CheckBtn>
                <input type="checkbox" id={text} name="keyword" />
                <Keyword htmlFor={text} variant="outlined" color="primary">{text}</Keyword>
            </CheckBtn>
        </ThemeProvider>
    </>
    )
}

{/*수정*/}
const CheckBtn= styled(Box)`
    input{
        display: none;
    }
    input[type='checkbox']:checked+label {
        background-color: #FF7300;
        color: #fff;
    }
`;

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

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;

    @media ${() => theme.device.mobile} {
        font-size: 1.4rem;
    }
`;