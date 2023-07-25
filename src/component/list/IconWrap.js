import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

export default function IconWrap({type}){
    return(
        <>
            <IconList>
                <ul className="icon-wrap">
                    <li><RemoveRedEyeIcon/><span>128</span></li>
                    <li><FavoriteIcon/><span>120</span></li>
                    {
                        type == "noComment" ?
                        <></> : <li><CommentIcon/><span>5</span></li> 
                    }
                </ul>
            </IconList>
        </>
    )
}

const IconList = styled(Box)`
    .icon-wrap{
        display: flex;
        align-items: center;
        li{
            display: flex;
            align-items: center;
            margin-right: .5rem;
            svg{
                color: rgba(0,0,0,.5);
            }
            span{
                font-size: 1.2rem;
                color: rgba(0,0,0,.5);
                margin-left:.3rem;
            }
        }
        li:last-of-type{
            margin: 0;
        }
    }

`;