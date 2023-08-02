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

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
  // boxShadow : 0
}));

export default function Index() {
  //인기 있는 공모전
  const [data, setData] = useState([]);
  // 마감 직전 공모전
  const [data2, setData2] = useState([]);
  // 10 조회순 , 20 최신순 , 30 좋아요 순
  const [selectedSort, setSelectedSort] = useState("10"); // Default sort value

  // 현재페이지
  const [currentPage, setCurrentPage] = useState(1);

  //전체페이지
  const [totalPages, setTotalPages] = useState(0);

  console.log("현재페이지", currentPage);

  const history = useLocation();

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
      `/api/v1/board?category=${translatedPath}&page=0&size=12&sort=${sortParam}`
    ).then((res) => {
      setTotalPages(res.data.totalPages);
      setCurrentPage(1);
    })
  }, [translatedPath]);


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
        `/api/v1/board?category=${translatedPath}&page=${
          currentPage - 1
        }&size=12&sort=${sortParam}`
      );
      console.log(response.data.content);
      setData(response.data.content);
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch initial data on component mount and whenever selectedSort changes
  useEffect(() => {
    fetchData();
  }, [selectedSort, translatedPath, currentPage]);

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
    });
  }, [translatedPath, currentPage]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <PaddingWrap>
          <div className="scroll">
          {history.pathname === "/contest" && (
              <KeywordWrap>
                <KeywordBtn text={"기획/아이디어"} />
                <KeywordBtn text={"광고/마케팅"} />
                <KeywordBtn text={"사진/영상/UCC"} />
                <KeywordBtn text={"디자인/순수미술/공예"} />
                <KeywordBtn text={"네이밍/슬로건"} />
                <KeywordBtn text={"캐릭터/만화/게임"} />
                <KeywordBtn text={"건축/건설/인테리어"} />
                <KeywordBtn text={"과학/공학"} />
                <KeywordBtn text={"예체능/패션"} />
                <KeywordBtn text={"전시/페스티벌"} />
                <KeywordBtn text={"문학/시나리오"} />
                <KeywordBtn text={"해외"} />
                <KeywordBtn text={"학술"} />
                <KeywordBtn text={"창업"} />
                <KeywordBtn text={"기타"} />
              </KeywordWrap>
            
            )}
            </div>
            <div className="scroll">
            {history.pathname === "/externalActivity" && (
            
              <KeywordWrap>
                <KeywordBtn text={"서포터즈"} />
                <KeywordBtn text={"해외탐방-무료"} />
                <KeywordBtn text={"해외탐방-유료"} />
                <KeywordBtn text={"봉사단-해외"} />
                <KeywordBtn text={"봉사단-국내"} />
                <KeywordBtn text={"마케터"} />
                <KeywordBtn text={"기자단"} />
                <KeywordBtn text={"강연"} />
                <KeywordBtn text={"멘토링"} />
                <KeywordBtn text={"기타"} />
                <KeywordBtn text={"문학/시나리오"} />
                <KeywordBtn text={"해외"} />
                <KeywordBtn text={"학술"} />
                <KeywordBtn text={"창업"} />
              </KeywordWrap>
            
            )}
            </div>
            <div className="scroll">
            {history.pathname === "/club" && (
            
              <KeywordWrap>
                <KeywordBtn text={"연합"} />
                <KeywordBtn text={"교내"} />
                <KeywordBtn text={"문화생활"} />
                <KeywordBtn text={"친목"} />
                <KeywordBtn text={"어학"} />
                <KeywordBtn text={"예술"} />
                <KeywordBtn text={"음악/공연"} />
                <KeywordBtn text={"스터디/연구"} />
                <KeywordBtn text={"스포츠/레저"} />
                <KeywordBtn text={"창업"} />
                <KeywordBtn text={"종교"} />
                <KeywordBtn text={"신문/잡지"} />
                <KeywordBtn text={"기획단"} />
                <KeywordBtn text={"여행"} />
                <KeywordBtn text={"봉사"} />
                <KeywordBtn text={"기타"} />
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
                {data.length > 0 && data.map((item) => {
                  let title;
                  if (item.activitiyName.length >= 10) {
                    title = item.activitiyName.slice(0, 10) + "...";
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
                })}
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
                {data2.map((item) => {
                  let title;
                  if (item.activitiyName.length >= 10) {
                    title = item.activitiyName.slice(0, 10) + "...";
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
                })}
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
             {history.pathname !== "/" && (
              <BasicPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={(event) => setCurrentPage(event)}
              />
             )}
          </PaddingWrap>
        </Container>
        <Footer />
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
