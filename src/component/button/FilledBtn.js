import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Link,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import theme from "../../style/theme";

export default function FilledBtn({text, handle,href,color,disabled}){

    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
            secondary : {
                main : "#B7B7B7"
            }
         },
    })
    return(
        <>
           <ThemeProvider theme={theme}>
                {/* 수정 */}
                {
                    disabled ? (
                        <FilledButton variant="contained" fullWidth  href={href}  onClick={handle} disabled>{text}</FilledButton>
                    ) : (
                        color ?
                        <FilledButton variant="contained" color="secondary" fullWidth  href={href}  onClick={handle}>{text}</FilledButton>
                        :
                        <FilledButton variant="contained" color="primary" fullWidth  href={href}   onClick={handle}>{text}</FilledButton>
                    )           
                }
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
    padding: .8rem 2rem;
    /*수정 */
    &:hover{
        /* background-color: #e66b05; */
        box-shadow: none;
    }
    @media ${() => theme.device.mobile2} {
        font-size: 1.4rem;
    }
`;