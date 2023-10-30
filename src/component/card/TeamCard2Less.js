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
import { useHistory } from 'react-router-dom';
import { API } from "../../api/api";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function TeamCard2Less({type}){
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
    const [currentNickname,setCurrentNickname]=useState('');
    const [endDate,setEndDate]=useState('');
    const [teamId,setTeamId]=useState('');
    const [memberId,setMemberId]=useState('');

    const handleClick = (event,nickname,endDate,teamId,mebmerId) => {
      setEndDate(endDate);
      setCurrentNickname(nickname);
      setAnchorEl(event.currentTarget);
      setMemberId(mebmerId);
      setTeamId(teamId);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfileClick = () => {
        const url = `/profile/${currentNickname}`;
        window.location.href = url;
    };


    const handleTeamClose = () => {
        console.log(type.id);
        if (window.confirm("정말로 마감하시겠습니까?"),{}) {
            API.put(`/api/v1/team/${type.id}`,)
            .then(res => {
                if (res.status === 200) {
                    window.alert("팀이 정상적으로 마감되었습니다");
                    window.location.reload();
                    // 마감 처리 후 필요한 작업을 수행할 수 있습니다.
                  }
            }).catch(err => {
                console.log(`err = ${err}`);
            })
        }
    };
    return(
        <>
          <ThemeProvider theme={theme}>
          {type ? (
            <PC>
                <TeamCard2Wrap>
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

                                        <div>
                                            <h4 className="ing">진행 중</h4>
                                    
                                        </div>
                                        :
                                        <h4>마감</h4>
                                    }
                                </li>
                            </ul>
                            <h2>{type.activityName}</h2>
                           
                           
                            <p>{moment(type.startDate).format("YYYY-MM-DD")} ~ {moment(type.endDate).format("YYYY-MM-DD")} </p>
                            {
                                type.teamStateEnum==="ONGOING" && type.teamLeader == JSON.parse(localStorage.getItem("userInfo")).username ?
                                ( <p> <Button onClick={handleTeamClose}>활동 마감</Button></p>)
                                :
                                ("")
                            }
                           
                        </div>
                        
                        <div className="profile-img2">

                            
                        {type.memberInfos.map((member) => (
                            
                                
                                <div
                                    key={member.memberId}
                                    className="img-box"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(event) => handleClick(event, member.nickname,type.endDate,type.id,member.memberId)}
                                >
                                    <img src={member.profileImage} alt={`Profile ${member.memberId + 1}`} />
                          
                                </div>  
                                
                            ))}
                            {/* <div className="img-box"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <img src="/img/card/sample3.png"/>
                            </div>
                            <div className="img-box"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <img src="/img/card/sample3.png"/>
                            </div>
                            <div className="img-box"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <img src="/img/card/sample3.png"/>
                            </div>
                            <div className="img-box"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <img src="/img/card/sample3.png"/>
                            </div> */}
                        </div>
                    </div>
                </TeamCard2Wrap>
            </PC>
          ) : (

            <PC>
            <TeamCard2Wrap>
                <div className="padding-wrap">
                    <div className="info-text">
                        <ul className="name">
                           <h3>마감 된 팀의 정보가 없습니다.</h3>
                        </ul>
                    </div>
                    
                    <div className="profile-img2">
                    <h3>마감 된 팀의 정보가 없습니다.</h3>
                    </div>
                </div>
            </TeamCard2Wrap>
        </PC>
          )}
            <Mobile>
                <TeamCard2Wrap>
                    <div className="padding-wrap">
                        <div className="info-text">
                            <ul className="name">
                            <li>
                                    
                                    {/* <AccountCircleIcon color="black"/> */}
                                    <img src={type.leaderProfileImage} width="30rem" height="30rem" style={{borderRadius:"50px", marginRight : "0.5rem"}}></img>
                                    <h3>팀장 : {type.teamLeader}</h3>
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
                            <div className="profile-img2">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={5}
                                    navigation
                                    loop={true}
                                    breakpoints={{
                                        0: {
                                        slidesOffsetBefore: 0,
                                        slidesPerView: type.memberInfos.length,
                                        spaceBetween: 5,
                                        centeredSlides: false,
                                        },
                                    }}
                                    >

                                        

                             {type.memberInfos.map((member) => (
                                <SwiperSlide>
                                <div className="img-box"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                     <img src={member.profileImage} alt={`Profile ${member.memberId + 1}`} />
                                </div>
                                </SwiperSlide>
                            
                            
                                ))}
{/*                                
                                <SwiperSlide>
                                <div className="img-box"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <img src="/img/card/sample2.png"/>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="img-box"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <img src="/img/card/sample2.png"/>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="img-box"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <img src="/img/card/sample2.png"/>
                                </div>
                                </SwiperSlide> */}
                                </Swiper>
                            </div>
                        </div>
                    </TeamCard2Wrap>
                </Mobile>

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
                <StyledMenuItem onClick={handleProfileClick}>프로필 보기</StyledMenuItem>
                <MenuItem><AssessmentModal nickname={currentNickname} endDate={endDate} teamId={teamId} memberId={memberId} teamStateEnum={type.teamStateEnum}/></MenuItem>
            </StyledMenu>
          </ThemeProvider>
        </>
    )
    }


const PC = styled(Box)`
    @media ${() => theme.device.tablet} {
        display: none;
    }
`;
const Mobile = styled(Box)`
    display: none;
    @media ${() => theme.device.tablet} {
        display: block;
    }
`;


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
    .profile-img2{
        width: 70%;
        display: flex;
        align-items: center;
        .img-box{
            margin-right: .5rem;
            cursor: pointer;
        }
        .img-box:last-of-type{
            margin: 0;
        }
        img{
            border-radius: 1rem;
            width: 125px;
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

    @media ${() => theme.device.desktop} {
        .profile-img2{
            img{
                width: 135px;
                height: 130px;
            }
        }
    }
    @media ${() => theme.device.desktop2} {
        .profile-img2{
            img{
                width: 100%;
            }
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
        .profile-img2{
            margin-top: 1rem;
            width: 100%;
            img{
                width: 100%;
                // height: auto;
            }
        }
    }

    @media ${() => theme.device.mobile} {

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
