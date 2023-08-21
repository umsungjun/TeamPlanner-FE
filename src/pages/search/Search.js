import React, { useState , useEffect} from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav"
import Footer from "../../component/common/Footer"
import theme from "../../style/theme";
import { Box, Grid } from "@mui/material";
import ScrollList from "../../component/list/ScrollList";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TeamRecruiteCard from "../../component/card/TeamRecruitCard";
import BasicPagination from "../../component/pagination/Pagination";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { API } from "../../api/api";
import { Link } from "react-router-dom";

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

export default function Search(){

    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const searchQuery = queryParams.s;

    const [searchWord, setSearchWord] = useState(searchQuery);
    const [content,setContent] = useState([])
    const [ongoingContent,setOngoingContent] =useState([]);
    const [closedContent,setClosedContent] =useState([]);
    const [totalElements,setTotalElements] = useState([]);
    const [totalOngoing,setTotalOngoing] = useState(0);
    const [totalClosed,setTotalClosed] = useState(0);
    // 현재페이지
    const [currentPage, setCurrentPage] = useState(1);
    //전체페이지
    const [totalPages, setTotalPages] = useState(0);

    // 진행 중

    const [ongoingCurrentPage, setOngoingCurrentPage] = useState(1);
    //전체페이지
    const [ongoingTotalPages, setOngoingTotalPages] = useState(0);
    // 마감 중
    const [closedCurrentPage, setClosedCurrentPage] = useState(1);
    //전체페이지
    const [closedTotalPages, setClosedTotalPages] = useState(0);


    
    useEffect(() => {
        const updatedSearchQuery = queryParams.s;
        setSearchWord(updatedSearchQuery);
    }, [queryParams.s]);

    //진행 중 마감된 공고 글 전부 가져오는 api

    useEffect(() => {

        API.get(`/api/v1/board/search?searchWord=${searchWord}&boardState=ONGOING,CLOSED&page=${currentPage-1}&size=10`)
            .then(res => {
                setTotalElements(res.data.totalElements);
                setContent(res.data.content);
                setTotalPages(res.data.totalPages);
                
            })
            .catch(err => {
                alert(err);
            });
        }, [searchWord,currentPage]);


    // 진행 중 만 가져오는 api

    useEffect(() => {
        API.get(`/api/v1/board/search?searchWord=${searchWord}&boardState=ONGOING&page=${ongoingCurrentPage-1}&size=10`)
            .then(res => {
                setOngoingContent(res.data.content);
                setTotalOngoing(res.data.totalElements);
                setOngoingTotalPages(res.data.totalPages);
                
            })
            .catch(err => {
                alert(err);
            });
    }, [searchWord,ongoingCurrentPage]);

     // 마감됨 가져오는 api

     useEffect(() => {
        API.get(`/api/v1/board/search?searchWord=${searchWord}&boardState=CLOSED&page=${closedCurrentPage-1}&size=10`)
            .then(res => {
      
                setClosedContent(res.data.content);
                setTotalClosed(res.data.totalElements);
                setClosedTotalPages(res.data.totalPages);
            })
            .catch(err => {
                alert(err);
            });
    }, [searchWord,closedCurrentPage]);

    
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

  

    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                <Container>
                    <PaddingWrap>
                        <Content>
                            <div className="content-wrap">
                                <h1><strong>"{searchWord}"</strong> 검색결과</h1>
                                <SearchTabWrap >
                                    <TabWrap sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <StyledTab label={<><h3>전체<br/><strong>{totalElements}</strong></h3></>} {...a11yProps(0)} sx={{width : '25%'}}/>
                                                <StyledTab label={<><h3>진행 중 공고<br/><strong>{totalOngoing}</strong></h3></>} {...a11yProps(1)} sx={{width : '25%'}} />
                                                <StyledTab label={<><h3>마감 된 공고<br/><strong>{totalClosed}</strong></h3></>}{...a11yProps(2)} sx={{width : '25%'}}/>
                                                <StyledTab label={<><h3>모집글<br/><strong>0</strong></h3></>} {...a11yProps(3)} sx={{width : '25%'}}/>
                                            </Tabs>
                                        </Box>
                                    </TabWrap>
                                    <StyledTabPanel value={value} index={0}>
                                        <Grid container spacing={1}>

                                        {content.length > 0 ? (
                                            content.map((item) => (
                                                <Card item xs={12} md={6} key={item.id}>
                                                    <Link to={`/competition/detail/${item.boardId}`}>
                                                        <Item><TeamRecruiteCard item={item}/></Item>
                                                    </Link>
                                                </Card>
                                            ))
                                        ) : (
                                         <NoResult>
                                                <div className="no-result-title">
                                                    <SearchIcon/>
                                                    <h1>검색 결과가 없습니다.</h1>
                                                </div>
                                                <h2>단어의 철자가 정확한지 확인하세요.<br/>
                                                다른 검색어를 사용해보세요.<br/>
                                                더 일반적인 검색어를 사용해보세요.</h2>
                                        </NoResult>
                                        )}

                                            {/* <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card> */}
                                        </Grid>
                                        <BasicPagination 
                                            totalPages={totalPages}
                                            currentPage={currentPage}
                                            onChange={(event) => setCurrentPage(event)}
                                        />
                                    </StyledTabPanel>
                                    <StyledTabPanel value={value} index={1} >

                                            
                                    <Grid container spacing={1}>

                                        {ongoingContent.length > 0 ? (
                                            ongoingContent.map((item) => (
                                                <Card item xs={12} md={6} key={item.id}>
                                                    <Link to={`/competition/detail/${item.boardId}`}>
                                                        <Item><TeamRecruiteCard item={item}/></Item>
                                                    </Link>
                                                </Card>
                                            ))
                                        ) : (
                                        <NoResult>
                                                <div className="no-result-title">
                                                    <SearchIcon/>
                                                    <h1>검색 결과가 없습니다.</h1>
                                                </div>
                                                <h2>단어의 철자가 정확한지 확인하세요.<br/>
                                                다른 검색어를 사용해보세요.<br/>
                                                더 일반적인 검색어를 사용해보세요.</h2>
                                            </NoResult>
                                        )}

                                            {/* <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card> */}
                                             
                                        </Grid>
                                        <BasicPagination 
                                            totalPages={ongoingTotalPages}
                                            currentPage={ongoingCurrentPage}
                                            onChange={(event) => setOngoingCurrentPage(event)}
                                        />
                                    </StyledTabPanel>
                                    <StyledTabPanel value={value} index={2} >
                                    <Grid container spacing={1}>

                                        {closedContent.length > 0 ? (
                                            closedContent.map((item) => (
                                                <Card item xs={12} md={6} key={item.id}>
                                                    <Link to={`/competition/detail/${item.boardId}`}>
                                                        <Item><TeamRecruiteCard item={item}/></Item>
                                                    </Link>
                                                </Card>
                                            ))
                                        ) : (
                                        <NoResult>
                                            <div className="no-result-title">
                                                <SearchIcon/>
                                                <h1>검색 결과가 없습니다.</h1>
                                            </div>
                                            <h2>단어의 철자가 정확한지 확인하세요.<br/>
                                            다른 검색어를 사용해보세요.<br/>
                                            더 일반적인 검색어를 사용해보세요.</h2>
                                        </NoResult>
                                        )}

                                            {/* <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card>
                                            <Card item xs={12} md={6}>
                                                <Item><TeamRecruiteCard state={"ing"}/></Item>
                                            </Card> */}
                                        
                                        </Grid>
                                        <BasicPagination 
                                            totalPages={closedTotalPages}
                                            currentPage={closedCurrentPage}
                                            onChange={(event) => setClosedCurrentPage(event)}
                                        />
                                    </StyledTabPanel>
                                    <StyledTabPanel value={value} index={3} >
                                        <NoResult>
                                            <div className="no-result-title">
                                                <SearchIcon/>
                                                <h1>검색 결과가 없습니다.</h1>
                                            </div>
                                            <h2>단어의 철자가 정확한지 확인하세요.<br/>
                                            다른 검색어를 사용해보세요.<br/>
                                            더 일반적인 검색어를 사용해보세요.</h2>
                                        </NoResult>
                                    </StyledTabPanel>
                                </SearchTabWrap>  
                             
                            </div>
                        </Content>
                        {/* <SideScroll>
                            <ScrollList />
                        </SideScroll> */}
                    </PaddingWrap>
                </Container>
                <Footer />
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
        h1{
            font-size: 3rem;
            color: #3b3b3b;
            line-height: 150%;
            strong{
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
            h1{
                font-size: 2.5rem;
            }
        }
    }
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

const Card = styled(Grid)`
`;