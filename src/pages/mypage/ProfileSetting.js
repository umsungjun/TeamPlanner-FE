import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Title from "../../component/title/Title";
import MyPageMenu from "../../component/menu/MypageMenu";
import FilledBtn from "../../component/button/FilledBtn";
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import RecomandTeamCard from "../../component/card/RecomandTeamCard";
import ChatBox from "../../component/chat/ChatBox";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  export const data = {
    labels: ['연구실 분위기', '강의 전달력', '논문 지도력', '실질 인건비', '인품'],
    datasets: [
      {
        label: '',
        data: [4, 5, 7, 6, 5],
        backgroundColor: 'rgba(255, 115, 0, 0.2)',
        borderColor: 'rgba(255, 115, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

export const options = {
    responsive: true,
    scales: {
       r: {
       min: 0, // MIN
       max: 10, // MAX
       beginAtZero: true,
       angleLines: {
          display: true,
          // color: 'red',
       },
       ticks: {
        stepSize: 1, // the number of step
       },
     },
   },
}

export default function ProfileSetting(){
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

    const [edit, setEdit] = React.useState(true);

    const handleChange = () => {
        setEdit(!edit);
    };

    


    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                <Container>
                    <PaddingWrap>
                        <Title text={"마이페이지"}/>
                        <ContentWrap>
                            <SideList>
                                <MyPageMenu select={"프로필관리"} />
                            </SideList>
                            <Content>
                                <div className="title dp-flex space-between">
                                    <h1>프로필 관리</h1>
                                    {
                                        edit ?
                                        <FilledBtn text={"프로필 수정하기"} handle={handleChange}></FilledBtn>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className="profile-box">
                                    <div className="profileImage">
                                        <img src="/img/profile/profile.png" alt="프로필 이미지" />
                                        {
                                            edit? <></> :
                                            <IconButton><AddCircleIcon/></IconButton>
                                        }
                                    </div>
                                    {
                                        edit ?
                                        <div className="introduce-box">
                                            <h2>소개글</h2>
                                            <p>
                                            안녕하세요. 소개글입니다.
                                            </p>
                                        </div>
                                        : 
                                        <>
                                        <div className="textarea-box">
                                             <h2>소개글</h2>
                                             <textarea cols={5} value="안녕하세요. 소개글입니다."></textarea>
                                        </div>
                                        </>
                                    }
                                </div>
                                <div className="skill-box">
                                    <h3 className="sub-title">기술스택</h3>
                                    <ul className="skill-list">
                                        <li className="skill">
                                            <img src="/img/profile/icon/Ps.svg"/>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        <li className="skill">
                                            <img src="/img/profile/icon/Pr.svg"/>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        <li className="skill">
                                            <img src="/img/profile/icon/Ai.svg"/>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        <li className="skill">
                                            <img src="/img/profile/icon/An.svg"/>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        {
                                            edit ? <></> :
                                            <li className="add-skill">
                                                <IconButton>
                                                    <AddIcon />
                                                </IconButton>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                <div className="info-box">
                                    <h3 className="sub-title">기본정보</h3>
                                    <ul className="info-list">
                                        <li className="dp-flex">
                                            <h4>공개범위설정</h4>
                                            <div className="radio-wrap">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        
                                                    >
                                                        {
                                                            edit ?
                                                            <>
                                                                <FormControlLabel value="female" control={<Radio  />} label="전체공개" checked/>
                                                                <FormControlLabel value="male" control={<Radio  />} label="팀원공개" disabled/>
                                                                <FormControlLabel value="other" control={<Radio />} label="비공개" disabled/>
                                                            </>
                                                            :
                                                            <>
                                                                <FormControlLabel value="female" control={<Radio  />} label="전체공개" defaultChecked/>
                                                                <FormControlLabel value="male" control={<Radio  />} label="팀원공개" />
                                                                <FormControlLabel value="other" control={<Radio />} label="비공개" />
                                                            </>
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>거주지</h4>
                                            {
                                                edit ?
                                                <p>거주지</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="거주지"/>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>대학</h4>
                                            {
                                                edit ?
                                                <p>대학</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="대학"/>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>이메일</h4>
                                            {
                                                edit ?
                                                <p>이메일</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="이메일"/>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>나이</h4>
                                            {
                                                edit ?
                                                <p>나이</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="나이"/>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>학년</h4>
                                            {
                                                edit ?
                                                <p>학년</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="학년"/>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>전화번호</h4>
                                            {
                                                edit ?
                                                <p>전화번호</p>
                                                :
                                                <StyledTextField variant="outlined" size="small" value="전화번호"/>
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="history-box">
                                    <h3 className="sub-title">수상이력 및 활동내역</h3>
                                    <div className="dp-flex space-between add-title">
                                        <h4>완료활동</h4>
                                        {
                                            edit ? <></>
                                            :
                                            <Button>
                                                추가하기<AddIcon />
                                            </Button>
                                        }
                                    </div>
                                    <ul className="activity-box">
                                        <li>
                                            <span>2023.05</span>
                                            <h4>게시판 프로젝트</h4>
                                            <p>
                                            스프링 게시판<br/>
                                            Spring JPA , MVC 학습 및 활용
                                            </p>
                                            <div className="tag-wrap">
                                                <h5>Spring Boot</h5>
                                                <h5>Spring Data JPA</h5>
                                                <h5>MVC</h5>
                                            </div>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        <li>
                                            <span>2023.05</span>
                                            <h4>게시판 프로젝트</h4>
                                            <p>
                                            스프링 게시판<br/>
                                            Spring JPA , MVC 학습 및 활용
                                            </p>
                                            <div className="tag-wrap">
                                                <h5>Spring Boot</h5>
                                                <h5>Spring Data JPA</h5>
                                                <h5>MVC</h5>
                                            </div>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                    </ul>
                                    <div className="dp-flex space-between add-title">
                                        <h4>자격증</h4>
                                        {
                                            edit ? <></>
                                            :
                                            <Button>
                                                추가하기<AddIcon />
                                            </Button>
                                        }
                                    </div>
                                    <ul className="certificate-box">
                                        <li>
                                            <span>2023. 05</span>
                                            <h4>정보처리기사 (Engineer Information Processing)</h4>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                        <li>
                                            <span>2023. 05</span>
                                            <h4>제 9회 한양대학교 프로그래밍 경시대회 HCPC (Advanced division) 우수상 3등</h4>
                                            {
                                                edit? <></> :
                                                <IconButton><RemoveCircleOutlineIcon/></IconButton>
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="review-box">
                                    <h3 className="sub-title">팀원평가</h3>
                                    <div className="check-box">
                                        <h4>공개범위설정</h4>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                {
                                                    edit ?
                                                    <>
                                                    <FormControlLabel value="female" control={<Radio  />} label="전체공개" checked/>
                                                    <FormControlLabel value="male" control={<Radio  />} label="팀원공개" disabled/>
                                                    <FormControlLabel value="other" control={<Radio />} label="비공개" disabled/>
                                                    </>
                                                    :
                                                    <>
                                                    <FormControlLabel value="female" control={<Radio  />} label="전체공개" checked/>
                                                    <FormControlLabel value="male" control={<Radio  />} label="팀원공개" />
                                                    <FormControlLabel value="other" control={<Radio />} label="비공개" />
                                                    </>
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="review-wrap">
                                        {
                                            edit ? 
                                            <div className="chart-box">
                                            <Radar
                                            data={data}
                                            options={options}
                                            />
                                            </div>
                                            :<></>
                                        }
                                        <div className="review-list">
                                            <h3>성실하고 책임감이 커서 활...</h3>
                                            <h3>시간을 잘 지켜요</h3>
                                            <h3>리더십이 뛰어나요</h3>
                                            <h3>소통이 잘돼요</h3>
                                            <h3>소통이 잘돼요</h3>
                                            <h3>소통이 잘돼요</h3>
                                            <h3>소통이 잘돼요</h3>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </ContentWrap>
                            {
                                edit ? <></> :
                                <SaveBtn>
                                    <FilledBtn text={"저장하기"}></FilledBtn>
                                </SaveBtn>
                            }
                    </PaddingWrap>
                </Container>
                <Footer />
                {/* *채팅버튼 추가
                <ChatBox /> */}
            </ThemeProvider>
        </>
    )
}

const Container = styled(Box)`
    width: 100%;
    @media ${() => theme.device.tablet} {
       height: auto;
    }
`;

const PaddingWrap = styled(Box)`
    padding: 13rem 15% 0 15%;   
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .space-between{
        justify-content: space-between;
    }
    @media ${() => theme.device.tablet} {
       padding : 16rem 5% 0 5% ;
    }
`;

export const ContentWrap = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }

`;

const SideList = styled(Box)`
    width: 18%;
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;

export const Content = styled(Box)`
    width: 80%;
    .title{
        margin-bottom: 5rem;
        margin-top: 1rem;
        h1{
            font-size: 2rem;
            color: #3b3b3b;
            font-weight: bold;
            line-height: 150%;
        }
        /*수정 */
        button{
            width: 15%;
            /* padding: 5px 0; */
        }
    }
    .sub-title{
        font-size: 1.8rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 600;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 2rem;
    }
    .profile-box{
        display: flex;
        align-items: center;
        margin-bottom: 5rem;
        .profileImage{
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            img{
                width: 60%;
                border-radius: 100%;
            }
            button{
                position: absolute;
                bottom: 0;
                right: 40px;
                background-color: #fff;
                padding: .5rem;
                svg{
                    width: 3rem;
                    height: 3rem;
                    color: #3b3b3b;
                }
            }
        }
        h2{
            font-size: 1.8rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: bold;
        }
        .textarea-box{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 75%;
            textarea{
                width: 98%;
                height: 9rem;
                margin-top: 1rem;
                border-color: rgba(0,0,0,.2);
                border-radius: 4px;
                padding: 1rem;
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
            }
        }
        .introduce-box{
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 10px;
            padding: 2rem;
            width: 75%;
            min-height: 10rem;
            p{
                font-size: 1.6rem;
                line-height: 150%;
                color: #3b3b3b;
                margin-top: 1rem;
            }
        }
    }
    .skill-box{
        margin-bottom: 5rem;
        .skill-list{
            display: flex;
            align-items: center;
            .skill{
                border-radius: 100px;
                border: 1px solid rgba(0,0,0,.1);
                width: 7rem;
                height: 7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                background-color: #fff;
                box-shadow: 0 0 5px 2px rgba(0,0,0,.03);
                position: relative;

                button{
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: #fff;
                    padding: 0;
                    svg{
                        width: 2.5rem;
                        height: 2.5rem;
                        color: #F30C0C;
                    }
                }
            }
            .add-skill{
                button{
                    background-color: transparent;
                    border: 1px solid #FF7300;
                    border-style: dashed;
                    width: 7rem;
                    height: 7rem;
                    svg{
                        width: 3rem;
                        height: 3rem;
                        color: #FF7300;
                    }
                }
            }
        }
    }
    .info-list{
        margin-bottom: 5rem;
        li{
            margin-bottom: 1rem;
            h4{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                width: 15rem;
            }
            p{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 400;
            }
            .radio-wrap{
                span{
                    font-size: 1.6rem;
                }
                input{
                }
            }
        }
    }
    .history-box{
        h4{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 500;
        }
        .add-title{
            margin-bottom: 1rem;
            button{
                font-size: 1.6rem;
                font-weight: bold;
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        .activity-box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            li{
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 4px;
                width: 45%;
                padding: 2rem;
                position: relative;
                span{
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.4);
                    line-height: 150%;
                    font-weight: 600;
                }
                p{
                    font-size: 1.4rem;
                    color: #3b3b3b;
                    line-height: 150%;
                }
                h4{
                    font-weight: bold;
                    margin: 0;
                    margin-bottom: .5rem;
                }
                .tag-wrap{
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    h5{
                        font-size: 1.2re;
                        color: #3b3b3b;
                        background-color: #EFEFEF;
                        padding: .5rem;
                        margin-right: 1rem;
                        border-radius: 2px;
                    }
                    h5:last-of-type{
                        margin: 0;
                    }
                }
                button{
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background-color: #fff;
                    padding: 0;
                    svg{
                        width: 2.5rem;
                        height: 2.5rem;
                        color: #F30C0C;
                    }
                }
            }
        }
        .certificate-box{
            margin-bottom: 5rem;
            li{
                display: flex;
                align-items: center;
                width: 100%;
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 10px;
                background-color: #fff;
                margin-bottom: 1rem;
                position: relative;
                h4{
                    margin: 0;
                }
                span{
                    padding: 2rem;
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.6);
                    line-height: 150%;
                    margin-right: 1rem;
                }
                button{
                    position: absolute;
                    top: 50%;
                    right: 1rem;
                    transform: translate(-50%,-50%);
                    background-color: #fff;
                    padding: 0;
                    svg{
                        width: 2.5rem;
                        height: 2.5rem;
                        color: #F30C0C;
                    }
                }
            }
            li:last-of-type{
                margin: 0;
            }
        }
    }
    .review-box{
        .check-box{
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            h4{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                width: 15rem;
            }
            span{
                    font-size: 1.6rem;
                }
        }
        .review-wrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .chart-box{
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .review-list{
            width: 55%;
            height: 30rem;
            overflow-y: scroll;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 4px;
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0,0,0,.1);
                background-color: #fff;
            }
            h3:hover{
                background-color: #FFEFE1;
            }
        }
        .review-list-modal{
            width: 100%;
            height: 30rem;
            overflow-y: scroll;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 4px;
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0,0,0,.1);
                background-color: #fff;
            }
            h3:hover{
                background-color: #FFEFE1;
            }
        }
    }
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
    @media ${() => theme.device.tablet}{
        .profile-box{
            .textarea-box{
                width: 100%;
                textarea{
                    width: 95%;
                }
            }
        }
        .history-box{
            .activity-box{
            li{
                width: 44%;
            }
        }
    }
    @media ${() => theme.device.mobile}{
       .title{
        button{
            width: 20%;
        }
       }
    }
    @media ${() => theme.device.mobile2}{
        .title{
        button{
            width: 30%;
        }
       }
       .profile-box{
        flex-direction: column;
        .profileImage{
            width: 70%;
        }
        .introduce-box{
            margin-top: 2rem;
            width: 90%;
        }
        .textarea-box{
            textarea{
                width: 93%;
            }
        }
       }
       .skill-box{
        .skill-list{
            .skill{
                width: 5rem;
                height: 5rem;
                img{
                    width: 50%;
                }
                button{
                    right: -10px;
                }
            }
            .add-skill{
                button{
                    width: 5rem;
                    height: 5rem;
                }
            }
        }
       }
       .history-box{
        .activity-box{
            li{
                width: 100%;
                margin-bottom: 1rem;
            }
            li:last-of-type{
                margin: 0;
            }
        }
        .certificate-box {
            li{
                flex-direction: column;
                align-items: flex-start;
                padding: 2rem 0;
                span{
                    padding: 0 2rem;
                }
                h4{
                    padding: 0 5rem 0 2rem;
                }
            }
        }
    }
    .review-box{
        .review-list{
            width: 100%;
        }
        .review-wrap{
            flex-direction : column;
        }
        .chart-box{
            width: 80%;
            margin: 3rem 0;
        }
    }
}
}
`;

const StyledTextField = styled(TextField)`
    width: 50%;
    input{
        font-size: 1.4rem;
    }
    @media ${() => theme.device.mobile}{
       width: 80%;
    }
`;

const SaveBtn = styled(Box)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    margin-top: 5rem;
    button{
        width: 15%;
    }
    @media ${() => theme.device.mobile}{
        button{
            width: 100%;
        }
    }
`;