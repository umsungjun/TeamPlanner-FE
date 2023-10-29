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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import moment from "moment"; // Moment.js 라이브러리
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Pagination, Navigation, Autoplay]);

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
            >
                <div className="padding-wrap">
                    <div className="info-text">
                        <ul className="name">
                        <li>
                                    {/* <AccountCircleIcon color="black"/> */}
                                    <img src={type.leaderProfileImage} width="30rem" height="30rem" style={{borderRadius:"50px", marginRight : "0.5rem"}}></img>
                                    <h3>팀장 : {type.teamLeader.length > 10 ? `${type.teamLeader.slice(0,12)}...` : type.teamLeader}</h3>
                                </li>
                                <li>
                                    
                                    {
                                        type.teamStateEnum=="ONGOING" ?
                                        <h4 className="ing">진행 중</h4>
                                        :
                                        <h4>마감</h4>
                                    }
                                </li>
                            </ul>
                            <h2>활동명 : {type.activityName}</h2>
                            <p>{moment(type.startDate).format("YYYY-MM-DD")} ~ {moment(type.endDate).format("YYYY-MM-DD")}</p>
                    </div>
                    {/**수정 */}
                    <div className="profile-img">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={5}
                            navigation
                            loop={true}
                            breakpoints={{
                                0: {
                                slidesOffsetBefore: 0,
                                slidesPerView: 2,
                                spaceBetween: 5,
                                centeredSlides: false,
                                },
                                500: {
                                    slidesOffsetBefore: 0,
                                    slidesPerView: 3 ,
                                    spaceBetween: 5,
                                    centeredSlides: false,
                                    },
                                800: {
                                slidesOffsetBefore: 0,
                                slidesPerView: 4 ,
                                spaceBetween: 5,
                                centeredSlides: false,
                                },
                                1200: {
                                slidesOffsetBefore: 0,
                                slidesPerView: 5,
                                spaceBetween: 5,
                                centeredSlides: false,
                                },
                            }}
                            >

                            {type.memberInfos.map((member) => (
                            
                            <SwiperSlide>
                            <div className="img-box"
                                key={member.memberId}
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                 <img src={member.profileImage} alt={`Profile ${member.memberId + 1}`} />
                            </div>
                            </SwiperSlide>
                        
                        
                            ))}
                        {/* <SwiperSlide>
                            <div className="img-box"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="img-box"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src="/img/card/sample3.png"/>
                        </div>
                        </SwiperSlide> */}
                        </Swiper>
                    </div>ƒ
                </div>
            </TeamCard2Wrap>
            <StyledMenu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'bottom',
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
            width: 100%;
            cursor: pointer;
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
      /*수정 */
    .swiper-button-prev, .swiper-rtl .swiper-button-next{
        height: 40px;
        width: 10px;
    }
    .swiper-button-next, .swiper-rtl .swiper-button-prev{
        height: 40px;
        width: 10px;
    }
    .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after{
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        background-color: rgba(0,0,0,.6);
        padding: 8px 10px;
        border-radius: 100px;
        
    }
    .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after{
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        background-color: rgba(0,0,0,.6);
        padding: 8px 10px;
        border-radius: 100px;
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
        /*수정 */
        .profile-img{
            width: 100%;
            margin-top: 1rem;
            .img-box{
                img{
                    height: auto;
                }
            }
        }
    }
`;

const StyledMenu = styled(Menu)`
    ul{
        padding: 0;
    }
    li{
        font-size: 1.6rem;
        font-weight: 400;
        height: 4rem;
        width: 10rem;
    }
    li:last-of-type{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const StyledMenuItem = styled(MenuItem)`
    padding: 1.2rem 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
