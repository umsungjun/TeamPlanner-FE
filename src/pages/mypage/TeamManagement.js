import React, { useEffect, useState } from "react";
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import TeamCard2 from "../../component/card/TeamCard2";
import BasicPagination from "../../component/pagination/Pagination";
import AttendCard from "../../component/card/AttendCard";
import ProduceModal from "../../component/modal/ProduceModal";
import { API } from "../../api/api";
import TeamCard2Less from "../../component/card/TeamCard2Less";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    


    
  
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function TeamManagement(){

    const [teams,setTeams] = useState([]);
    const [applicant, setApplicant] = useState([]); 
    const [selectedMembers,setSelectedMembers] =useState([]);


    useEffect(() => {
      API.get("/api/v1/member/applicant-list")
      .then(res => {
        setApplicant(res.data);
          
      })
      .catch (err => {
          console.log(err);
          return alert(err.response.data.message)
    });
    }, []);

    useEffect(() => {
        API.get("/api/v1/team/my-team")
        .then(res => {
            setTeams(res.data);
            
        })
        .catch (err => {
            console.log(err);
            return alert(err.response.data.message)
      });
      }, []);


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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [edit, setEdit] = React.useState(true);

    const handleChange2 = () => {
        setEdit(!edit);
    };

    const [edit2, setEdit2] = React.useState(true);

    const handleChange3 = () => {
        setEdit2(!edit2);
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
                                <MyPageMenu select={"팀관리"} />
                            </SideList>
                            <Content>
                                <div className="title dp-flex space-between">
                                    <h1>팀 관리</h1>
                                </div>
                                <TabWrap 
                                    sx={{ width: '100%' }}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs 
                                    value={value} onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                    >
                                        <Tab label="참여중인 팀" {...a11yProps(0)} sx={{width : '33%'}}/>
                                        <Tab label="활동 마감 팀" {...a11yProps(1)} sx={{width : '33%'}} />
                                        <Tab label="참여 신청 리스트" {...a11yProps(2)} sx={{width : '33%'}}/>
                                    </Tabs>
                                </Box>
                                <StyledTabPanel value={value} index={0} sx={{p : 0}}>
                                    <ul>

                                    {teams.map((team) => {
                                        if(new Date(team.endDate) >= new Date()){
                                                
                                            if(team.memberInfos.length >=5){
                                                return (
                                                    <li>
                                                        <TeamCard2 type={team}/>
                                                    </li>
                                                )
                                            }else{
                                                return (
                                                    <li>
                                                        <TeamCard2Less type={team} />
                                                    </li>
                                                )
                                            }
                                        }
                                    })};

                                       
                                        {/* <li>
                                            <TeamCard2 type={"ing"}/>
                                        </li>
                                        <li>
                                            <TeamCard2 type={"ing"}/>
                                        </li>
                                        <li>
                                            <TeamCard2 type={"ing"}/>
                                        </li> */}
                                    </ul>
                                    <BasicPagination />
                                </StyledTabPanel>
                                <StyledTabPanel value={value} index={1} >
                                    <ul>
                                    {teams.map((team) => {

            

                                    if(new Date(team.endDate) < new Date()){
                                        if(team.memberInfos.length >=5){
                                            return (
                                                <li>
                                                    <TeamCard2 type={team}/>
                                                </li>
                                            )
                                        }
                                        else{
                                            return (
                                                <li>
                                                    <TeamCard2Less type={team} />
                                                </li>
                                            )
                                        }
                                    }
                                        
                                        
                                    })};

                                    </ul>
                                    <BasicPagination />
                                </StyledTabPanel>
                                <StyledTabPanel value={value} index={2} >
                                    

                                    {applicant.map((applicantMap) => {
                                        return (
                                            <TeamList>
                                                <div className="team-name">
                                                    <h2>{applicantMap.activityName}</h2>

                                                    {
                                                    edit ? 
                                                    <FilledBtn text={"팀 생성하기"} handle={handleChange2}></FilledBtn> 
                                                        :
                                                        <div className="btn-wrap">
                                                            <FilledBtn text={"취소"} handle={handleChange2} color={"gray"}></FilledBtn>
                                                            <ProduceModal selectedMember={selectedMembers} recruitmentId={applicantMap.recruitmentId} />
                                                        </div>
                                                    }
                                                </div>
                                                {applicantMap.applicantIntro .filter(applyMember => applyMember.state === "STAND_BY")
                                                .map((applyMember) => 

                                                    <ul>
                                                        <li>
                                                            <AttendCard applyMember={applyMember} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers}/>
                                                        </li>
                                                    </ul>
                                        
                                                )}
                                            </TeamList>
                                        )
                                    })};
                                        {/* {
                                        teams.map((team) => 
                                        <TeamList>
                                                <div className="team-name">
                                                <h2>{team.activityName}</h2>
                                                {
                                                edit ? 
                                                 <FilledBtn text={"팀 생성하기"} handle={handleChange2}></FilledBtn> 
                                                    :
                                                    <div className="btn-wrap">
                                                        <FilledBtn text={"취소"} handle={handleChange2} color={"gray"}></FilledBtn>
                                                        <ProduceModal />
                                                    </div>
                                                }
                                            </div>
                                        {
                                        team.applicantIntro.map((applyMember) => 
                                        
                                            <ul>
                                                 <li>
                                                    <AttendCard applyMember={applyMember}/>
                                                </li>
                                     
                                            </ul>
                                        
                                        )}

                                            
                                        </TeamList>
                                            )
                                        }
                                        */}
                                        
                                    {/* <TeamList>
                                        <div className="team-name">
                                            <h2>공모전 2</h2>
                                            {
                                                edit2 ? 
                                                <FilledBtn text={"팀 생성하기"} handle={handleChange3}></FilledBtn> 
                                                :
                                                <div className="btn-wrap">
                                                    <FilledBtn text={"취소"} handle={handleChange3} color={"gray"}></FilledBtn>
                                                    <ProduceModal />
                                                </div>
                                            }
                                        </div>
                                        <ul>
                                            <li>
                                                <AttendCard edit={edit2}/>
                                            </li>
                                            <li>
                                                <AttendCard edit={edit2}/>
                                            </li>
                                        </ul>
                                    </TeamList> */}
                                </StyledTabPanel>
                                </TabWrap>
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
        margin-bottom: 3rem;
        margin-top: 1rem;
        h1{
            font-size: 2rem;
            color: #3b3b3b;
            font-weight: bold;
            line-height: 150%;
        }
        button{
            width: 13%;
            padding: 5px 0;
        }
    }
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;


const TabWrap = styled(Box)`
    padding: 0 !important;
    button{
        font-size: 1.6rem;
        line-height: 150%;
    }
    svg{
        width: 2rem;
        height: 2rem;
    }
    @media ${() => theme.device.mobile} {
        button{
            width : 50%;
        }
    }
`;

const StyledTabPanel = styled(CustomTabPanel)`
    &>div{
        padding: 2rem 0;
    }
    .dp-end{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    ul{
        li{
            margin-bottom: 2rem;
        }
    }
    @media ${() => theme.device.mobile} {
        &>div{
            padding: 2rem 1rem 1rem 1rem;
        }
    }
`;


const TeamList = styled(Box)`
    padding-bottom: 2rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
    .team-name{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        h2{
            font-size: 1.8rem;
            color: #3b3b3b;
            font-weight: 600;
            line-height: 150%;
        }
        .btn-wrap{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button:first-of-type{
                margin-right: 1rem;
            }
        }
        button{
            width: 15%;
        }

    }
    &:last-of-type{
        margin: 0;
    }
    @media ${() => theme.device.mobile} {
        .team-name{
            flex-direction: column;
            align-items: flex-start;
            h2{
                margin-bottom: 1rem;
            }
            button{
                width: 100%;
            }
            .btn-wrap{
                width: 100%;
            }
        }
    }
`;