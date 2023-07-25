import React, { useState } from "react";
import styled from "@emotion/styled";
import Pagination from '@mui/material/Pagination';
import {createTheme,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import theme from "../../style/theme";

export default function BasicPagination(){
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
        <PaginationWrap>
            <StyledPagination count={5} color="primary" />
        </PaginationWrap>
        </>
    )
}

const PaginationWrap = styled(Box)`
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${() => theme.device.mobile} {
        margin-top: 3rem;
    }
`;

const StyledPagination = styled(Pagination)`
    button{
        font-size: 1.4rem;
    }
    .Mui-selected{
        color: #fff !important;
    }
    svg{
        width: 2rem;
        height: 2rem;
    }
`;