import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav"
import Footer from "../../component/common/Footer"
import theme from "../../style/theme";
import { Box, Grid } from "@mui/material";
import ScrollList from "../../component/list/ScrollList";
import TeamRecruiteCard from "../../component/card/TeamRecruitCard";
import BasicPagination from "../../component/pagination/Pagination";
import { API } from "../../api/api";
import { useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
  }));

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

export default function RecruitList(){

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

    const [currentPage_0, setCurrentPage_0] = useState(1);
    const [totalPages_0, setTotalPages_0] = useState(10);
    const [recruitmentList_0, setRecruitmentList_0] = useState([]);
    const [totalElements_0, setTotalElements_0] = useState(0)
    
    const [currentPage_1, setCurrentPage_1] = useState(1);
    const [totalPages_1, setTotalPages_1] = useState(10);
    const [recruitmentList_1, setRecruitmentList_1] = useState([]);
    const [totalElements_1, setTotalElements_1] = useState(0)
    
    const [currentPage_2, setCurrentPage_2] = useState(1);
    const [totalPages_2, setTotalPages_2] = useState(10);
    const [recruitmentList_2, setRecruitmentList_2] = useState([]);
    const [totalElements_2, setTotalElements_2] = useState(0)
    
    const [currentPage_3, setCurrentPage_3] = useState(1);
    const [totalPages_3, setTotalPages_3] = useState(10);
    const [recruitmentList_3, setRecruitmentList_3] = useState([]);
    const [totalElements_3, setTotalElements_3] = useState(0)

    const boardCategory = ["", "공모전", "대외활동", "동아리"]

    const fetchRecruitmentList = (category, currentPage, setRecruitmentList, setTotalPages, setTotalElements) => {
        API.get(`/api/v1/recruitment?page=${currentPage - 1}&size=4&boardCategoryContain=${category}`,
          )
            .then(res => {
              setRecruitmentList(res.data.content);
            //   console.log(res.data);
              setTotalPages(res.data.totalPages)
              setTotalElements(res.data.totalElements);
            //   console.log(res.data.content[0])
            //   console.log(res.data.content[0].recruitmentBoardRecruitmentPeriod)
            }).catch(err => {
              console.log(err);
            })
    }

    useEffect(() => {
        fetchRecruitmentList(boardCategory[0], currentPage_0, setRecruitmentList_0, setTotalPages_0, setTotalElements_0);
    }, [currentPage_0])
    useEffect(() => {
        fetchRecruitmentList(boardCategory[1], currentPage_1, setRecruitmentList_1, setTotalPages_1, setTotalElements_1);
    }, [currentPage_1])
    useEffect(() => {
        fetchRecruitmentList(boardCategory[2], currentPage_2, setRecruitmentList_2, setTotalPages_2, setTotalElements_2);
    }, [currentPage_2])
    useEffect(() => {
        fetchRecruitmentList(boardCategory[3], currentPage_3, setRecruitmentList_3, setTotalPages_3, setTotalElements_3);
    }, [currentPage_3])

    const getRecruitmentList = (value) => {
        switch (value) {
                case 0: return recruitmentList_0
                case 1: return recruitmentList_1
                case 2: return recruitmentList_2
                case 3: return recruitmentList_3
        }
    }
    const getCurrentPage = (value) => {
        switch (value) {
                case 0: return currentPage_0
                case 1: return currentPage_1
                case 2: return currentPage_2
                case 3: return currentPage_3
        }
    }
    const getSetCurrentPage = (value) => {
        switch (value) {
                case 0: return setCurrentPage_0
                case 1: return setCurrentPage_1
                case 2: return setCurrentPage_2
                case 3: return setCurrentPage_3
        }
    }
    const getTotalPages = (value) => {
        switch (value) {
                case 0: return totalPages_0
                case 1: return totalPages_1
                case 2: return totalPages_2
                case 3: return totalPages_3
        }
    }
    

    const xs = 12

    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return(
        <>
            <ThemeProvider theme={theme}>
               <Nav />
              <Container>
                  <PaddingWrap>
                      <Content>
                      <div className="content-wrap">
                            <div className="title">
                                <h1>팀원 모집게시판</h1>
                            </div>

                            <SearchTabWrap >
                                    <TabWrap sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <StyledTab label={<><h3>전체<br/><strong>{totalElements_0}</strong></h3></>} {...a11yProps(0)} sx={{width : '25%'}}/>
                                                <StyledTab label={<><h3>공모전<br/><strong>{totalElements_1}</strong></h3></>} {...a11yProps(1)} sx={{width : '25%'}} />
                                                <StyledTab label={<><h3>대외활동<br/><strong>{totalElements_2}</strong></h3></>}{...a11yProps(2)} sx={{width : '25%'}}/>
                                                <StyledTab label={<><h3>동아리<br/><strong>{totalElements_3}</strong></h3></>} {...a11yProps(3)} sx={{width : '25%'}}/>
                                            </Tabs>
                                        </Box>
                                    </TabWrap>

                                    <StyledTabPanel value={value} index={value}>
                                        <Grid container spacing={1}>
                                            {
                                            getRecruitmentList(value).map(r =>  
                                                <Card item xs={xs} md={xs / 2} 
                                                    onClick={() => {
                                                        navigate(`/recruitment/${r.id}`)
                                                    }}
                                                >
                                                    <Item>

                                                        <TeamRecruiteCard {...r} state={ "ing"}/>
                                                    </Item>
                                                </Card>
                                            )
                                            }
                                        </Grid>
                                        <BasicPagination 
                                            totalPages={getTotalPages(value)}
                                            currentPage={getCurrentPage(value)}
                                            onChange={(event) => getSetCurrentPage(value)(event)}
                                        />
                                    </StyledTabPanel>
                                </SearchTabWrap>
                        </div>
                      </Content>
                      <SideScroll>
                          <ScrollList category={"공모전"} />
                      </SideScroll>
                    </PaddingWrap>
                    <Footer/>
                </Container>
            </ThemeProvider>
        </>
    )
}


const Container = styled(Box)`
    width: 100%;
    margin-top: 13rem;
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
    }
`;

const PaddingWrap = styled(Box)`
    padding: 0 5%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .space-between{
        justify-content: space-between;
    }
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }
`;


const SideScroll = styled(Box)`
    width: 14%;
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;

const Content = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .content-wrap{
        width: 80%;
        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 1.5rem;
            // border-bottom: 2px solid #FF7300;
            margin-bottom: 2rem;
            h1{
                font-size: 2.5rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
        }
    }
    @media ${() => theme.device.desktop} {
        .content-wrap{
            width: 100%;
        }
    }
    @media ${() => theme.device.mobile} {
        .content-wrap{
            .title{
                h1{
                    font-size: 2rem;
                }
            }
        }

    }
`;

const Card = styled(Grid)`
`;

const SearchTabWrap = styled(Box)`
    width: 100%;
    margin-top: 2rem;
`;

const TabWrap = styled(Box)`
    button{
        font-size: 1.6rem;
        color: #3b3b3b;
        line-height: 150%;
    }
    .competition-info{
        margin-top: 1rem;
        li{
            margin-bottom: 2rem;
        }
        .title{
            margin-bottom: 1rem;
            svg{
                width: 1.5rem;
                height: 1.5rem;
                color: #FF7300;
                margin-right: 1rem;
            }
            h2{
                font-size: 1.8rem;
                color: #FF7300;
                font-weight: 600;
                line-height: 150%;
            }
        }
        p{
            font-size: 1.6rem;
            line-height: 150%;
            color: #3b3b3b;
            font-weight: 400;
            a{
                color: #3b3b3b;
                text-decoration: underline;
            }
        }
    }
    .Mui-selected{
        border: none;
        h3{
        color: #3b3b3b;
        font-weight: bold;
            strong{
                color: #FF7300;
                font-weight: bold;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        button{
            padding: 1rem;
        }
        h3{
            font-size: 1.4rem;
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
        a{
            width: 15%;
        }
    }
    @media ${() => theme.device.mobile} {
        .dp-end{
            a{
                width: 100%;
            }
        }
    }
`;

const StyledTab = styled(Tab)`
    border-top: 1px solid rgba(0,0,0,.1);
    border-right: .5px solid rgba(0,0,0,.1);
    border-left: .5px solid rgba(0,0,0,.1);

`;

const NoResult = styled(Box)`
    border-top: 1px solid rgba(0,0,0,.1);
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 20rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .no-result-title{
        display: flex;
        align-items: center;
        h1{
            font-size: 3rem;
            color: #808080;
            font-weight: 600;
            line-height: 150%;
        }
        svg{
            color: #808080;
            width: 3rem;
            height: 3rem;
            margin-right: .5rem;
        }
    }
    h2{
        text-align: center;
        color: #808080;
        font-size: 1.8rem;
        line-height: 150%;
        margin-top: 1rem;
    }
    @media ${() => theme.device.mobile} {
        .no-result-title{
            h1{
                font-size: 2.5rem;
            }
        }
        h2{
            font-size: 1.6rem;
        }
    }
`;

