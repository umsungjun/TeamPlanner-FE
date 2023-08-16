import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import { Check } from "@mui/icons-material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function CheckBtn({type}){
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
            {
                type == "like"?
                <CheckBoxBtn>
                    <FormControlLabel control={<Checkbox defaultChecked icon={<FavoriteBorder />} checkedIcon={<Favorite />} />} label="좋아요" />
                </CheckBoxBtn>
                : <></>
            }
            {
                type == "scrap" ?
                  <CheckBoxBtn>
                        <FormControlLabel control={<Checkbox defaultChecked icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />} label="스크랩" />
                </CheckBoxBtn>
                 : <></>
            }

            </ThemeProvider>
        </>
    )
}

const CheckBoxBtn = styled(FormGroup)`
    padding: .5rem 1rem;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.1);
    width: fit-content;
    span{
        font-size: 1.4rem;
        padding: 0;
    }
    svg{
        margin-right: .5rem;
        width: 1.5rem;
        height: 1.5rem;
    }
    label{
        margin: 0;
    }
`;