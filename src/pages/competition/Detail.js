import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import DetailMenu from "../../component/menu/DetailMenu";
import IconWrap from "../../component/list/IconWrap";
import ScrollList from "../../component/list/ScrollList";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import TaemCard from "../../component/card/TeamCard";
import BasicPagination from "../../component/pagination/Pagination";
import Comment from "../../component/comment/Comment";
import FilledBtn from "../../component/button/FilledBtn";
import { API } from "../../api/api";
import KakaoButton from "./kakaoButton";
import { Opacity } from "@mui/icons-material";
import CheckBtn from "../../component/button/CheckBtn";
import CommonModal from "../../component/modal/CommonModal";



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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Detail() {
  const { boardId } = useParams();

  // details
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  //comments.length
  let [commentCount, setCommentCount] = useState([]);
  const [flag, setChangeFlag] = useState(false);

  useEffect(() => {
    API.get(`/api/v1/board/${boardId}`).then((res) => {
      setData(res.data[0]);
      setCommentData(res.data[0].comments);
      if (Object.keys(res.data[0].comments).length !== 0) {
        setCommentCount(res.data[0].comments.length);
      }
    });
  }, [flag]); 

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

  const [recruitmentList, setRecruitmentList] = useState([]);
  // 현재페이지
  const [currentPage, setCurrentPage] = useState(1);
  //전체페이지
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    fetchRecruitmentList();
  }, [currentPage]);

  useEffect(() => {
    API.get(`/api/v1/recruitment?page=${currentPage}&size=5&boardIdContain=${boardId}`,
      )
      .then(res => {
        setTotalPages(res.data.totalPages);
        // console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }, [])
  

  const fetchRecruitmentList = () => {
    API.get(`/api/v1/recruitment?page=${currentPage - 1}&size=5&boardIdContain=${boardId}`,
      )
        .then(res => {
          setRecruitmentList(res.data.content);
          // console.log(res.data.content);
        }).catch(err => {
          console.log(err);
        })
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ContentDiv = styled.div`
    width: 100%;

    div {
      width: 100%;
    }

    img {
      width: 100%;
    }
  `

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container>
          <PaddingWrap>
            <SideList>
              <DetailMenu />
            </SideList>
            <Content>
              <h1>{data.activitiyName}</h1>
              <ul className="content-wrap">
                <li className="thumbnail">
                  <img
                    src={data.activityImg}
                    alt="공모전 썸네일"
                    width="100%"
                  ></img>
                </li>
                <li className="detail-list">
                  <div className="dp-flex space-between">
                    <h2>{data.activitiyName}</h2>
                    <IconWrap type="noComment" likeCount={data.likeCount} viewCount={data.viewCount} commentCount={data.commentCount} />
                    {/*3차추가 */}
                    <CheckBtn type={"scrap"}/>
                  </div>
                  <ol className="detail-info">
                    <li className="dp-flex space-between">
                      <div className="col dp-flex">
                        <h3>기업형태</h3>
                        <p>{data.companyType}</p>
                      </div>
                      <div className="col dp-flex">
                        <h3>참여대상</h3>
                        <p>{data.target}</p>
                      </div>
                    </li>
                    <li className="dp-flex space-between">
                      <div className="col dp-flex">
                        <h3>시상규모</h3>
                        <p>{data.prizeScale}</p>
                      </div>
                      <div className="col dp-flex">
                        <h3>접수기간</h3>
                        <p>{data.recruitmentPeriod}</p>
                      </div>
                    </li>
                    <li className="dp-flex space-between">
                      <div className="col dp-flex">
                        <h3>홈페이지</h3>
                        <a href={data.activityUrl} target="_blank">
                          <p style={{ color: "#FF7300", opacity: "80%", fontWeight: "bold"}}>지원하러 바로가기</p></a>
                      </div>
                      <div className="col dp-flex">
                        <h3>활동혜택</h3>
                        <p>{data.activityBenefits}</p>
                      </div>
                    </li>
                    <li className="dp-flex space-between">
                      <div className="col dp-flex">
                        <h3>공모분야</h3>
                        <p>{data.activityField}</p>
                      </div>
                      <div className="col dp-flex">
                        <h3>추가혜택</h3>
                        <p>{data.activityBenefits}</p>
                      </div>
                    </li>
                    <li className="dp-flex space-between border-none">
                      <div className="dp-flex">
                        <h3>공유하기</h3>
                        <div className="sns-button-list">
                          <IconButton>
                            <img src="/img/icon/sns/facebook.png"></img>
                          </IconButton>
                          <IconButton>
                            <img src="/img/icon/sns/twiter.png"></img>
                          </IconButton>
                          <IconButton>
                            <img src="/img/icon/sns/naver.png"></img>
                          </IconButton>
                          <IconButton>
                            <img src="/img/icon/sns/band.png"></img>
                          </IconButton>
                          <IconButton>
                            <img src="/img/icon/sns/kakaostory.png"></img>
                          </IconButton>
                          <IconButton>
                            <KakaoButton activityName={data.activitiyName} activityImg={data.activityImg} boardId={boardId} />
                          </IconButton>
                        </div>
                      </div>
                    </li>
                  </ol>
                </li>
              </ul>
              <TabWrap sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label="상세내용"
                      {...a11yProps(0)}
                      sx={{ width: "33%" }}
                    />
                    <Tab
                      label="팀원 모집"
                      {...a11yProps(1)}
                      sx={{ width: "33%" }}
                    />
                    <Tab
                      label={`댓글 ${commentCount}`}
                      {...a11yProps(2)}
                      sx={{ width: "33%" }}
                    />
                  </Tabs>
                </Box>
                <StyledTabPanel value={value} index={0}>
                  {/*         
                                    <img src="/img/competition/sample.png" alt="공모전 이미지" width="100%"/> */}
                  <ul className="competition-info">
                    <li>
                      <div className="title dp-flex">
                        <CircleIcon />
                        <h2>모집개요</h2>
                      </div>
                      {/* <p>금융권 취업을 희망하는 분들을 위한 삼성생명에서 주관하는 단기 강의입니다. 현재 금융권의 트렌드 및 현직자의 조언을 얻어 취업에 도움되시길 바랍니다.</p> */}
                      <ContentDiv
                        dangerouslySetInnerHTML={{
                          __html: data.activitiyDetail,
                        }}
                        >
                      </ContentDiv>
                    </li>
                    {/* <li>
                                            <div className="title dp-flex">
                                                <CircleIcon/>
                                                <h2>신청기간 및 일정</h2>
                                            </div>
                                            <p>
                                                - 신청기간 : 6월23일 ~ 7월14일<br/>
                                                - 교육기간 : 7월19일 ~ 7월26일<br/>
                                                - 장소 : 서울 강남구 테헤란로 424 대치타워 22층 컨퍼런스홀
                                            </p>
                                        </li>
                                        <li>
                                            <div className="title dp-flex">
                                                <CircleIcon/>
                                                <h2>지원대상</h2>
                                            </div>
                                            <p>
                                                - 대학 4학년 이상 재학 / 휴학 / 졸업생<br/>
                                                - 전문대학의 경우 2학년 이상
                                            </p>
                                        </li>
                                        <li>
                                            <div className="title dp-flex">
                                                <CircleIcon/>
                                                <h2>지원방법</h2>
                                            </div>
                                            <p>
                                                - 온라인지원 : <a href="https://forms.gle/w8eFk3hnbZxaiMEd6">https://forms.gle/w8eFk3hnbZxaiMEd6</a>
                                            </p>
                                        </li>
                                        <li>
                                            <div className="title dp-flex">
                                                <CircleIcon/>
                                                <h2>활동혜택</h2>
                                            </div>
                                            <p>
                                                - 삼성생명 수료증
                                            </p>
                                        </li> */}
                  </ul>
                </StyledTabPanel>
                <StyledTabPanel value={value} index={1}>
                  {/* 팀원 모집글 탭 */}
                  <TeamCardWrap>
                    {
                      recruitmentList.map(r => 
                        <Card>
                          <TaemCard {...r}/>
                        </Card>
                      )
                    }
                    {/* <Card>
                      <TaemCard />
                    </Card>
                    <Card>
                      <TaemCard />
                    </Card>
                    <Card>
                      <TaemCard />
                    </Card>
                    <Card>
                      <TaemCard />
                    </Card>
                    <Card>
                      <TaemCard />
                    </Card> */}
                  </TeamCardWrap>
                  <div className="dp-end">
                     {/*3차추가 */}
                     { <>
                    <CommonModal button={
                    <FilledBtn text={"글쓰기"} handle={() => {console.log("/recruitment/write?boardId=" + boardId); window.location.href=`/recruitment/write?boardId=${boardId}`}}/>
                    } />
                      </>
                     }
                  </div>

                  <BasicPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChange={(event) => setCurrentPage(event)}
                  />

                </StyledTabPanel>
                <StyledTabPanel value={value} index={2}>
                  <Comment changeFlag={setChangeFlag} flag={flag} commentData={commentData} />
                </StyledTabPanel>
              </TabWrap>
            </Content>
            <SideScroll>
              <ScrollList category={data.category} />
            </SideScroll>
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
  }
  @media ${() => theme.device.mobile} {
    margin-top: 13rem;
  }
`;

const PaddingWrap = styled(Box)`
  padding: 0 5%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .dp-flex {
    display: flex;
    align-items: center;
  }
  .space-between {
    justify-content: space-between;
  }
  @media ${() => theme.device.desktop} {
    flex-direction: column;
  }
`;

const SideList = styled(Box)`
  width: 15%;
  @media ${() => theme.device.desktop} {
    width: 100%;
  }
`;

const Content = styled(Box)`
  width: 65%;
  h1 {
    font-size: 3rem;
    color: #3b3b3b;
    font-weight: bold;
    line-height: 150%;
  }
  .content-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 2rem 0;
    .thumbnail {
      width: 30%;
    }
    .detail-list {
      width: 68%;
      & > div {
        margin-bottom: 1rem;
      }
      h2 {
        font-size: 2rem;
        color: #3b3b3b;
        font-weight: bold;
        line-height: 150%;
      }
      .detail-info {
        width: 100%;
        .border-none {
          border-bottom: none;
        }
        li {
          padding: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          .col {
            width: 48%;
          }
          h3 {
            font-size: 1.6rem;
            color: #ff7300;
            font-weight: bold;
            line-height: 150%;
            width: 40%;
          }
          p {
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            text-align: left;
          }
          .sns-button-list {
            display: flex;
            align-items: center;
            margin-left: 6rem;
          }
        }
      }
    }
  }
  @media ${() => theme.device.desktop} {
    width: 100%;
  }
  @media ${() => theme.device.mobile} {
    h1 {
      font-size: 2.5rem;
    }
    .content-wrap {
      flex-direction: column;
      .thumbnail {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 3rem;
        img {
          width: 60%;
        }
      }
      .detail-list {
        width: 100%;
        .detail-info {
          li {
            flex-direction: column;
            padding: 0;
            border: none;
            .col {
              width: 100%;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              padding: 1rem 0;
            }
            h3 {
              width: auto;
              margin-right: 5rem;
            }
            .sns-button-list {
              margin-left: 0;
              button {
                padding: 0;
                margin-right: 0.5rem;
                width: 3rem;
                img {
                  width: 100%;
                }
              }
            }
          }
          li:last-of-type > div {
            width: 100%;
            margin: 1rem 0;
          }
        }
      }
    }
  }
`;

const SideScroll = styled(Box)`
  width: 13%;
  @media ${() => theme.device.desktop} {
    width: 100%;
  }
`;

const TabWrap = styled(Box)`
  button {
    font-size: 1.6rem;
    /* color: #3b3b3b; */
    line-height: 150%;
  }
  .competition-info {
    margin-top: 1rem;
    li {
      margin-bottom: 2rem;
    }
    .title {
      margin-bottom: 1rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: #ff7300;
        margin-right: 1rem;
      }
      h2 {
        font-size: 1.8rem;
        color: #ff7300;
        font-weight: 600;
        line-height: 150%;
      }
    }
    p {
      font-size: 1.6rem;
      line-height: 150%;
      color: #3b3b3b;
      font-weight: 400;
      a {
        color: #3b3b3b;
        text-decoration: underline;
      }
    }
  }
`;

const StyledTabPanel = styled(CustomTabPanel)`
.dp-end{
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  /*3차 수정*/
  button{
      width: 100%;
      padding: 1rem 5rem !important;
  }
  /*3차 수정*/
  a{
      width: fit-content;
      padding: .8rem 5rem !important;
  }
}
@media ${() => theme.device.mobile} {
  &>div{
      padding: 2rem 1rem 1rem 1rem;
  }
  .dp-end{
      a{
          width: 100%;
      }
  }
}
`;

const TeamCardWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Card = styled(Box)`
  width: 49%;
  margin-bottom: 2rem;
  @media ${() => theme.device.mobile2} {
    width: 100%;
  }
`;
