import React, { useState, useEffect } from "react";
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
import SolidBtn from "../../component/button/SolideBtn";
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { API } from "../../api/api";



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
   plugins: {
    legend: {
      display: false,
    }
  }
}



export default function Profile({handleClick}){

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

    const img="/img/profile/profile.png";
    const { nickname } = useParams();

    const [genders, setGenders] = useState([]);

    const [jobs, setJobs] = useState([]);

    const [educations, setEducations] = useState([]);

    const [fetchedAll, setFetchedAll] = useState(false);

    
    //fetched data
    const [profileData, setProfileData] = useState({
        basicProfile:[],
        techStacks:[],
        activities:[],
        certifications:[],
        evaluations:[],
        recommendedUsers:[]
    });


    const [edit, setEdit] = React.useState(true);

    const [chatBoxOpen,setChatboxOpen]=useState(false);


    //이미지
    const [imageFileURL, setImageFileURL] = useState(["/img/profile/profile.png"]);

    useEffect(() =>{
        fetchImage();
    },[profileData.basicProfile.profileImage]);

    const fetchImage = async () =>{
        if(profileData.basicProfile.profileImage!=''){
            setImageFileURL(profileData.basicProfile.profileImage);
        }
    };

    const toggleChatbox = () => {


        API.get(`/api/v1/chat/room-check/${nickname}`)
        .then(res => {
            if(res.data.roomCheck===false){
                window.alert("이미 채팅방이 존재합니다");
            }else{
                localStorage.setItem("img",imageFileURL);
                localStorage.setItem("targetNickname",nickname);
                handleClick(img,nickname);
            }
        }).catch(err => {
            console.log('err', err)
        }).finally()
    };

    const fetchEnum = async () => {
        try {
            const response = await API.get('/api/v1/member/signup/enums');
            setGenders(response.data.gender.map(option => ({ value: option.name, label: option.label })));
            setJobs(response.data.job.map(option => ({ value: option.name, label: option.label })));
            setEducations(response.data.education.map(option => ({ value: option.name, label: option.label })));
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    //프로필 정보 get
    const fetchProfile = async () => {
        try {
            const response = await API.get('/api/v1/profile/'+nickname);
            console.log(response);
            setProfileData(prevData => ({
                ...prevData,
                ...response.data
            }));

        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    //평가
    const [evaluationData,setevaluationData] = useState({
        labels: ['창의성', '리더십', '성실함', '기술력', '커뮤니케이션'],
        datasets: [
            {
                label: '',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 115, 0, 0.2)',
                borderColor: 'rgba(255, 115, 0, 1)',
                borderWidth: 1,
            },
        ],
    });

    const updateEvaluationData = () =>{

        const evaluations = profileData.evaluations;
    
        // 각 stat의 합을 계산
        const totalStats = {
            stat1: 0,
            stat2: 0,
            stat3: 0,
            stat4: 0,
            stat5: 0,
        };

        evaluations.forEach((evaluation) => {
            totalStats.stat1 += evaluation.stat1;
            totalStats.stat2 += evaluation.stat2;
            totalStats.stat3 += evaluation.stat3;
            totalStats.stat4 += evaluation.stat4;
            totalStats.stat5 += evaluation.stat5;
        });

        // 각 stat의 평균 계산
        const avgStats = {
            stat1: totalStats.stat1 / evaluations.length,
            stat2: totalStats.stat2 / evaluations.length,
            stat3: totalStats.stat3 / evaluations.length,
            stat4: totalStats.stat4 / evaluations.length,
            stat5: totalStats.stat5 / evaluations.length,
        };

        // evaluationData 업데이트
        setevaluationData((prevData) => ({
        ...prevData,
        datasets: [
            {
            ...prevData.datasets[0],
            data: [
                avgStats.stat1*2,
                avgStats.stat2*2,
                avgStats.stat3*2,
                avgStats.stat4*2,
                avgStats.stat5*2,
            ],
            },
        ],
        }));
    }

    //useEffect
    useEffect(()=>{
        const fetchData = async () => {
            try {
              await Promise.all([fetchEnum(), fetchProfile()]);
              // 여기서 모든 API 호출이 완료됨
              // 원하는 작업을 수행할 수 있음
              setFetchedAll(true);
            } catch (error) {
              console.error('API 호출 오류:', error);
            }
          };
        
          fetchData();
    },[]);

    useEffect(()=>{
        updateEvaluationData();
    },[profileData.evaluations]);




    const [showButton, setShowButton] = useState(false);


    useEffect(() => {
        // 로컬 스토리지에서 userInfo 가져오기
        const userInfoStr = localStorage.getItem('userInfo');
    
        if (userInfoStr) {
          // userInfo 문자열을 파싱하여 객체로 변환
          const userInfo = JSON.parse(userInfoStr);
    
          // userInfo의 nickname과 userParam 비교
          if (userInfo.nickname !== nickname) {
            setShowButton(true);
          }
        }
      }, [nickname]);

  
  
    if (fetchedAll)
    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                <Container>
                    <PaddingWrap>
                        {/* <Title text={"프로필"}/> */}
                        <ContentWrap>
                            {/* <SideList>
                                <MyPageMenu select={"프로필관리"} />
                            </SideList> */}
                            <Content>
                                <div className="title dp-flex space-between"></div>
                                <div className="profile-box">
                                    
                                    <div className="profile-img">
                                        <img src={imageFileURL} alt="프로필 이미지" />
                                    </div>
                                    <div className="profile-nickname">
                                        <p>{nickname}</p>
                                    </div>
                                    <div className="profile-btn-wrap">
                                        <SolidBtn text={"1:1 대화하기"} handle={toggleChatbox}/>
                                    </div>
                                    <div className="profileIntro">
                                        <h2>자기소개</h2>
                                        <p>
                                            {profileData.basicProfile.profileIntro}
                                        </p>
                                    </div>
                                </div>
                                <div className="review-box">
                                    <h3 className="sub-title">팀원평가</h3>
                                    <div className="review-wrap">
                                        <div className="chart-box">
                                            <Radar
                                                data={evaluationData}
                                                options={options}
                                            />
                                        </div>
                                        <div className="review-list">
                                            {profileData.evaluations.map((evaluation, index) => (
                                                <h3 key={index}>{evaluation.comment}</h3>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="skill-box">
                                    <h3 className="sub-title">기술스택</h3>
                                    <ul className="skill-list">
                                        {profileData.techStacks.map((techStack) => (
                                            <li className="skillWrap" key={techStack.techStackItem.id}>
                                                <div className="skill-img">
                                                    <img src={techStack.techStackItem.imageUrl} alt={techStack.techStackItem.name} />
                                                </div>
                                                <div className="skill-name">
                                                    <span>{techStack.techStackItem.name}</span>
                                                </div>
                                                <div className="skill-level">
                                                    <i class={`${techStack.skillLevel >= 1 ? 'active' : ''}` }></i>
                                                    <i class={`${techStack.skillLevel >= 2 ? 'active' : ''}`}></i>
                                                    <i class={`${techStack.skillLevel >= 3 ? 'active' : ''}`}></i>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="info-box">
                                    <h3 className="sub-title">기본정보</h3>
                                    <ul className="info-list">
                                        <li className="dp-flex">
                                            <h4>성별</h4>
                                            <p>{genders.find(option => option.value === profileData.basicProfile.gender)?.label ? genders.find(option => option.value === profileData.basicProfile.gender)?.label : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>생년월일</h4>
                                            <p>{profileData.basicProfile.birth ? profileData.basicProfile.birth : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>직업</h4>
                                            <p>{jobs.find(option => option.value === profileData.basicProfile.job)?.label ? jobs.find(option => option.value === profileData.basicProfile.job)?.label : "미입력"}</p>        
                                        </li>
                                        <li className="dp-flex">
                                            <h4>최종학력</h4>
                                            <p>{educations.find(option => option.value === profileData.basicProfile.education)?.label ? educations.find(option => option.value === profileData.basicProfile.education)?.label : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>입학날짜</h4>
                                            <p>{profileData.basicProfile.admissionDate ? profileData.basicProfile.admissionDate : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>졸업날짜</h4>
                                            <p>{profileData.basicProfile.graduationDate ? profileData.basicProfile.graduationDate : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>카카오아이디</h4>
                                            <p>{profileData.basicProfile.kakaoId ? profileData.basicProfile.kakaoId : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>연락처(이메일)</h4>
                                            <p>{profileData.basicProfile.contactEmail ? profileData.basicProfile.contactEmail : "미입력"}</p>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>거주지</h4>
                                            <p>{profileData.basicProfile.address ? profileData.basicProfile.address : "미입력"}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="history-box">
                                    <h3 className="sub-title">수상이력 및 활동내역</h3>
                                    <div className="dp-flex space-between add-title">
                                        <h4>완료활동</h4>
                                    </div>
                                    <ul className="activity-box">
                                        {profileData.activities.map((activity, index) => (
                                            <li key={index}>
                                                <span>{activity.startDate} ~ {activity.endDate}</span>
                                                <h4>{activity.subject}</h4>
                                                <p>{activity.detail}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="dp-flex space-between add-title">
                                        <h4>자격증/수상이력</h4>
                                    </div>
                                    <ul className="certificate-box">
                                        {profileData.certifications.map((certification, index) => (
                                            <li key={index}>
                                                <span>{certification.gainDate}</span>
                                                <h4>{certification.name}</h4>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <RecomandTeam>
                                    <h3><strong>{nickname}</strong> 님과 비슷한 프로필을 추천해드려요</h3>
                                    <div className="recomand-team-wrap">
                                        <ul className="scorll-wrap">
                                            {profileData.recommendedUsers.map((recommendedUser, index) => (
                                                <li key={index}>
                                                <RecomandTeamCard
                                                    nickname={recommendedUser.nickname}
                                                    profileImage={recommendedUser.profileImage}
                                                    profileIntro={recommendedUser.profileIntro}
                                                    similarities={recommendedUser.similarities}
                                                />
                                            </li>
                                            ))}
                                            
                                        </ul>
                                    </div>
                                </RecomandTeam>
                            </Content>
                        </ContentWrap>
                    </PaddingWrap>
                </Container>
                <Footer />
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

const ContentWrap = styled(Box)`
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

const Content = styled(Box)`
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
        flex-direction: column;
        align-items: center;
        margin-bottom: 5rem;
        .profile-btn-wrap{

            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            button{
                width: 59%;
            }
        }
        .profile-img{
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
            width: 100%;
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
        .profile-nickname{
            justify-content: center;
            font-size: 2rem;
            flex-direction: row;
            color: #3b3b3b;
            line-height: 1.6rem;
            margin-top: 1rem;
            margin-bottom: 2.3rem;
            font-weight: 700;
            align-items : center;
            position: relative;
        }
        .profileIntro{
            width: 100%;
            p{
                border: 1px solid rgba(0,0,0,.1);
                min-height: 10rem;
                border-radius: 10px;
                padding: 2rem;
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
            .skillWrap{
                .skill-img{
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
                    img {
                        max-width: 70%;
                        max-height: 70%;
                    }
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
                .skill-name {
                    color: #000000;
                    font-size : 1.5rem;
                    text-align: center;
                    margin-right: 1rem;
                    margin-top: 1rem;
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    font-style: italic; 
                }
                .skill-level {
                    width: 6rem; /* 세 개의 별을 담을 크기 */
                    height: 2rem;
                    display: flex;
                    margin-top: 1rem;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                    i {
                        width: 1.8rem; 
                        height: 1.7rem;
                        margin-right: 0.3rem;
                        background-image: url('/img/icon/star2.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center; 
                    }
                    i.active {
                        background-image: url('/img/icon/star1.png');
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
        margin-bottom: 5rem;
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
            width: 40%;
        }
       }
       .profile-box{
        flex-direction: column;
        .profile-btn-wrap{
            width: 100%;
        }
        .profile-img{
            width: 70%;
        }
        .profileIntro{
            margin-top: 2rem;
            width: 100%;
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

const RecomandTeam = styled(Box)`
    h3{
        font-size: 1.8rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 700;
        strong{
            font-weight: bold;
            color: #FF7300;
        }
    }
    .recomand-team-wrap{
        width: 100%;
        overflow-y: scroll;
        margin-top: 2rem;
    }
    .scorll-wrap{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        li{
            width: 24%;
            min-width: 240px;
            margin-right: 1rem;
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
