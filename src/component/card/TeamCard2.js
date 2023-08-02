import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import theme from "../../style/theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssessmentModal from "../modal/AssessmentModal";

export default function TeamCard2({type}){
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return(
        <>
          <ThemeProvider theme={theme}>
            <TeamCard2Wrap
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className="padding-wrap">
                    <div className="info-text">
                        <ul className="name">
                            <li>
                                <AccountCircleIcon/>
                                <h3>유저</h3>
                            </li>
                            <li>
                                {
                                    type == "ing" ?
                                    <h4 className="ing">참여중</h4>
                                    :
                                    <h4>마감</h4>
                                }
                            </li>
                        </ul>
                        <h2>공모전</h2>
                        <p>2023.08.21 ~ 2023.08.26</p>
                    </div>
                    <div className="profile-img">
                        <div className="img-box">
                            <img src="/img/card/sample3.png"/>
                        </div>
                        <div className="img-box">
                            <img src="/img/card/sample3.png"/>
                        </div>
                        <div className="img-box">
                            <img src="/img/card/sample3.png"/>
                        </div>
                        <div className="img-box">
                            <img src="/img/card/sample3.png"/>
                        </div>
                        <div className="img-box">
                            <img src="/img/card/sample3.png"/>
                        </div>
                    </div>
                </div>
            </TeamCard2Wrap>
            <StyledMenu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
                }}
            >
                <StyledMenuItem onClick={handleClose}>프로필 보기</StyledMenuItem>
                <MenuItem><AssessmentModal /></MenuItem>
            </StyledMenu>
          </ThemeProvider>
        </>
    )
}

const TeamCard2Wrap = styled(Box)`
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    .padding-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
    }
    .info-text{
        width:28%;
        .name{
            display: flex;
            align-items: center;
            justify-content: space-between;
            li{
                display: flex;
                align-items: center;
                svg{
                    width: 3rem;
                    height: 3rem;
                    color: #FFAD6A;
                    margin-right: .5rem;
                }
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    font-weight: 600;
                    line-height: 150%;
                }
                h4{
                    padding: .3rem 1rem;
                    border-radius: 100px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #fff;
                    background-color: #929292;
                }
                .ing{
                    background-color: #FF7300;
                }
            }
        }
        h2{
            font-size: 1.8rem;
            color: #3b3b3b;
            font-weight: 700;
            line-height: 150%;
            margin-bottom: 2rem;
        }
        p{
            font-size: 1.4rem;
            color: rgba(0,0,0,.6);
            line-height: 150%;
            font-weight: 400;
        }
    }
    .profile-img{
        width: 70%;
        display: flex;
        align-items: center;
        .img-box{
            margin-right: 1rem;
            width: 20%;
        }
        .img-box:last-of-type{
            margin: 0;
        }
        img{
            border-radius: 1rem;
            width: 100%;
            height: 130px;
        }

    }
    @media ${() => theme.device.tablet} {
        .padding-wrap{
            flex-direction: column;
        }
        .info-text{
            width: 100%;
        }
        .info-text{
            h2{
                margin: 0;
            }
        }
        .profile-img{
            width: 100%;
            margin-top: 1rem;
        }
    }
    @media ${() => theme.device.mobile} {
        .profile-img{
            .img-box{
                img{
                    height: 100px;
                }
            }
        }
    }
    @media ${() => theme.device.mobile3} {
        .profile-img{
            .img-box{
                img{
                    height: 50px;
                }
            }
        }
    }
`;

const StyledMenu = styled(Menu)`
    li{
        font-size: 1.6rem;
        font-weight: 400;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    padding: 1.2rem 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;