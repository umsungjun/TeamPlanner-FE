import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Nav from "../component/common/Nav";
import { Box , Grid } from "@mui/material";
import KeywordBtn from "../component/button/KeywordBtn";
import BasicSelect from "../component/select/Select";
import CompetitionCard from "../component/card/CompetitionCard";
import { createTheme, ThemeProvider } from "@mui/material";
import BasicPagination from "../component/pagination/Pagination";
import Footer from "../component/common/Footer";
import theme from "../style/theme";
import { API } from "../api/api";
import { useLocation } from "react-router-dom";
import { contest } from "./category";
import { externalActivity } from "./category";
import { club } from "./category";
import loader from '../loader.gif';
import ChatBox from "../component/chat/ChatBox";


const Item = styled(Box)(({ theme }) => ({



  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
  // boxShadow : 0
}));

const NotFoundText = styled.span`
  font-size: 2rem; /* 폰트 크기 조정 */
  color: #555; /* 원하는 텍스트 색상을 지정하세요 */
  margin-bottom: 100px; /* 아래쪽 패딩 추가 */
`;

const NotFoundData = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;




export default function Index() {
  //인기 있는 공모전
  const [data, setData] = useState([]);
  // 활동분야 필터링
  const[activityField,setActivityField]=useState([]);
  // 마감 직전 공모전
  const [data2, setData2] = useState([]);
  // 10 조회순 , 20 최신순 , 30 좋아요 순
  const [selectedSort, setSelectedSort] = useState("10"); // Default sort value

  // 현재페이지
  const [currentPage, setCurrentPage] = useState(1);

  //전체페이지
  const [totalPages, setTotalPages] = useState(0);

  const [currentChecked, setCurrentChecked] = useState([]);

  const history = useLocation();

  // 로딩
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  let translatedPath = "";

  switch (history.pathname) {
    case "/contest":
      translatedPath = "/공모전";
      break;
    case "/externalActivity":
      translatedPath = "/대외활동";
      break;
    case "/club":
      translatedPath = "/동아리";
      break;
    case "/":
      translatedPath = "/공모전";
      break;
    default:
      // Default path in case none of the above conditions match
      translatedPath = history.pathname;
      break;
  }

  if (translatedPath.startsWith("/")) {
    translatedPath = translatedPath.slice(1);
  }

  useEffect(() => {
    const result = currentChecked.join('/');
    setActivityField(result);
    
  }, [currentChecked])

  useEffect(() => {
    let sortParam;
    
    switch (selectedSort) {
      case 10:
        sortParam = "view,desc";
        break;
      case 20:
        sortParam = "recruitmentPeriod,desc";
        break;
      case 30:
        sortParam = "likeCount,desc";
        break;
      default:
        sortParam = "view,desc";
        break;
    }

    API.get(
      `/api/v1/board?category=${translatedPath}&activityField=${activityField}&page=0&size=12&sort=${sortParam}`
    ).then((res) => {
      setTotalPages(res.data.totalPages);
    })
  }, [activityField]);

  const fetchData = async () => {
    try {
      let sortParam = "";
      switch (selectedSort) {
        case 10:
          sortParam = "view,desc";
          break;
        case 20:
          sortParam = "recruitmentPeriod,desc";
          break;
        case 30:
          sortParam = "likeCount,desc";
          break;
        default:
          sortParam = "view,desc";
          break;
      }

      const response = await API.get(
        `/api/v1/board?category=${translatedPath}&activityField=${activityField}&page=${
          currentPage - 1
        }&size=12&sort=${sortParam}`
      ).then(response => {
        setData(response.data.content || []);
        setLoading(false);
        setTotalPages(response.data.totalPages);
      })
      // .catch(err => {
      //   console.log('err', err)
      // }) 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch initial data on component mount and whenever selectedSort changes
  useEffect(() => {
    fetchData();
  }, [selectedSort, translatedPath, currentPage, activityField]);

  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
    palette: {
      primary: {
        main: "#FF7300",
      },
    },
  });

  // // 인기 있는 공모전
  // useEffect(() => {
  //   API.get(
  //     `/api/v1/board?category=${translatedPath}&page=${
  //       currentPage - 1
  //     }&size=12&sort=view,desc`
  //   ).then((res) => {
  //     setData(res.data.content);
  //     setTotalPages(res.data.totalPages);
  //   });
  // }, [translatedPath, currentPage]);

  // 최신공모전
  useEffect(() => {
    API.get(
      `/api/v1/board?category=${translatedPath}&page=${
        currentPage - 1
      }&size=12&sort=recruitmentPeriod,desc`
    ).then((res) => {
      setData2(res.data.content);
      setLoading2(false);
    });
  }, [translatedPath, currentPage]);

  useEffect(() => {
    setActivityField([]);
    setCurrentPage(1);
  }, [translatedPath]);

  const Loading = styled.img`
    position: absolute;
    left: 50%;
    transform: translate(0, -50%);
    width: 5%;
  `


  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <PaddingWrap>
          <div className="scroll">
          {history.pathname === "/contest" && (
              <KeywordWrap>
                {contest?.map((item, key) => {
                  return (
                    <KeywordBtn key={key} text={item} translatedPath={ translatedPath} setCurrentChecked={setCurrentChecked} currentChecked={currentChecked}/>
                  )
                })}
              </KeywordWrap>  
            
            )}
            </div>
            <div className="scroll">
            {history.pathname === "/externalActivity" && (
            
            <KeywordWrap>
            {externalActivity?.map((item, key) => {
              return (
                <KeywordBtn key={key} text={item} setCurrentChecked={setCurrentChecked} currentChecked={currentChecked}/>
              )
            })}
          </KeywordWrap>
            
            )}
            </div>
            <div className="scroll">
            {history.pathname === "/club" && (
            
            <KeywordWrap>
            {club?.map((item, key) => {
              return (
                <KeywordBtn key={key} text={item} setCurrentChecked={setCurrentChecked} currentChecked={currentChecked}/>
              )
            })}
          </KeywordWrap>
            
            )}
            </div>
            <CompetitionList>
              <ul className="title">
                <li>
                  <h2>인기있는 {translatedPath}</h2>
                  <p>인기있는 {translatedPath}을 카테고리 별로 확인 하세요</p>
                </li>
                <li>
                {history.pathname !== "/" && (
                  <BasicSelect onChange={setSelectedSort} />
                )}
                </li>
              </ul>
              <div className="competition-list">
              <Grid container spacing={1}>
                {data.length > 0 ? data.map((item) => {

                  let title;
                  if (item.activitiyName.length >= 8) {
                    title = item.activitiyName.slice(0, 8) + "...";
                  } else {
                    title = item.activitiyName;
                  }
                  {/*수정*/}
                  return (
                     
                           
                        <Card item xs={6} md={2}>
                        <Item><CompetitionCard  
                            id={item.boardId}
                            activityImg={item.activityImg}
                            activityName={title}
                            likeCount={item.likeCount}
                            viewCount={item.viewCount}
                            deadlineInDays={item.deadlineInDays}
                            commentCount={item.commentCount}/>
                        </Item>
                          
                        </Card>     
                    
                    
                  );
                }) : 
                <NotFoundData>
                    <NotFoundText>데이터가 존재하지 않습니다.</NotFoundText>
                </NotFoundData>}
                  </Grid>
                {/* <Card>
                                <CompetitionCard id={"box1"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box1"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box1"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box1"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box1"}/>
                            </Card>
                            <Card>
                               <CompetitionCard id={"box1"}/>
                            </Card> */}
              </div>
            </CompetitionList>
            {history.pathname === "/" && (
            <CompetitionList className="mt-5">
              <ul className="title">
                <li>
                  <h2>최신 {translatedPath}</h2>
                  <p>최신 {translatedPath}을 카테고리 별로 확인 하세요</p>
                </li>
              </ul>
              <div className="competition-list">
              <Grid container spacing={1}>
                {!loading2 ? data2.map((item) => {

                  let title;
                  if (item.activitiyName.length >= 8) {
                    title = item.activitiyName.slice(0, 8) + "...";
                  } else {
                    title = item.activitiyName;
                  }
                  return (
                    <Card item xs={6} md={2}>
                      <Item><CompetitionCard  
                        id={item.boardId}
                        activityImg={item.activityImg}
                        activityName={title}
                        likeCount={item.likeCount}
                        viewCount={item.viewCount}
                        deadlineInDays={item.deadlineInDays}
                        commentCount={item.commentCount}/>
                      </Item>
                      
                    </Card>     
                  
                  );
                }): 
                <NotFoundData>
                    <NotFoundText>데이터가 존재하지 않습니다.</NotFoundText>
                </NotFoundData>}
                </Grid>
                {/* <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                            <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card> */}
              </div>
            </CompetitionList>
            )}
             {data.length > 0 && history.pathname !== "/" && (
              <BasicPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={(event) => setCurrentPage(event)}
              />
             )}
          </PaddingWrap>
        </Container>
        <Footer />
        {/* {localStorage.getItem("userInfo") && <ChatBox/>} */}
      </ThemeProvider>
    </>
  );
}

const Container = styled(Box)`
    width: 100%;
    margin-top: 13rem;
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
        .scroll{
            overflow-x: scroll;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
        .scroll::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }
`;

const PaddingWrap = styled(Box)`
  padding: 0 5%;
  .mt-5 {
    margin-top: 5rem;
  }
  @media ${() => theme.device.mobile} {
    .mt-5 {
      margin-top: 3rem;
    }
  }
`;

const KeywordWrap = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  /*수정 */
  /* input[type="radio"]{
      display: none;
  } */
  label{
      margin: 0 1rem 1.5rem 0;
  }
  /* input[type="radio"]:checked+label {
      background-color: #FF7300;
      color: #fff;
  }    */
  @media ${() => theme.device.tablet} {
      flex-wrap: nowrap;
      width: 100%;
      margin-bottom: 1rem;
  }
`;

const CompetitionList = styled(Box)`
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    h2 {
      font-size: 2.5rem;
      color: #3b3b3b;
      font-weight: bold;
      line-height: 150%;
    }
    p {
      font-size: 1.6rem;
      color: #3b3b3b;
      line-height: 150%;
      font-weight: 300;
    }
  }
  .competition-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media ${() => theme.device.mobile} {
    .title {
      h2 {
        font-size: 2rem;
      }
      p {
        font-size: 1.4rem;
      }
      li:first-of-type {
        margin-right: 5rem;
      }
    }
  }
`;

{/*수정*/}
const Card = styled(Grid)`
`;