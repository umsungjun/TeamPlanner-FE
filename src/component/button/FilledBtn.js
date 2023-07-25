import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import theme from "../../style/theme";

export default function FilledBtn({text, handle}){
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
                <FilledButton variant="contained" color="primary" fullWidth  onClick={handle}>{text}</FilledButton>
           </ThemeProvider>
        </>
    )
}

const FilledButton = styled(Button)`
    color: #fff;
    font-size: 1.6rem;
    font-weight: 500;
    box-shadow: none;
    border-radius: 4px;
    padding: .8rem 1rem;
    border: 1px solid #FF7300;
    &:hover{
        background-color: #e66b05;
        box-shadow: none;
    }
    @media ${() => theme.device.mobile2} {
        font-size: 1.4rem;
    }
`;