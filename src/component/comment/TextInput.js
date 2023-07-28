import React, { useState } from "react";
import styled from "@emotion/styled";
import {Button, createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import SolidBtn from "../button/SolideBtn";
import TextField from '@mui/material/TextField';
import theme from "../../style/theme";

export default function TextInput(){
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
                    <TextInputWrap>
                        <StyledTextField id="outlined-basic" variant="outlined" multiline maxRows={3}/>
                        <SolidBtn text={"입력"}/>
                    </TextInputWrap>
               </ThemeProvider>
        </>
    )
}

const TextInputWrap = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
    button{
        width: 15%;
    }
    @media ${() => theme.device.mobile} {
        button{
            margin-left: 1rem;
        }
    }
`;

const StyledTextField = styled(TextField)`
    width: 84%;
    .MuiInputBase-root{
        padding: 1.5rem 2rem !important;
        height: 8rem;
    }
    textarea{
        font-size: 1.6rem;
        color: #3b3b3b;
    }
`;
