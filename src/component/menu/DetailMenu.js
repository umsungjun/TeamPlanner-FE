import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function DetailMenu(){

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
                <MenuWrap>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="" className="select">
                            <ListItemText primary="공모분야" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="">
                            <ListItemText primary="시상규모" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="">
                            <ListItemText primary="접수기간" />
                        </ListItemButton>
                    </ListItem>
                </MenuWrap>
            </ThemeProvider>
        </>
    )
}

const MenuWrap = styled(List)`
    width: 100%;
    span{
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
    }
    .select{
        border-left: 2px solid #FF7300;
        span{
            font-weight: 600;
        }
    }
    @media ${() => theme.device.desktop} {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 3rem;
        .select{
            border: none;
            span{
                color: #FF7300;
            }
        }
        li{
            width: auto;
        }
        ul{
        }
    }
`;