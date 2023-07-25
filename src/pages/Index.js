import React, { useState } from "react";
import styled from "@emotion/styled";
import Nav from "../component/common/Nav";
import { Box } from "@mui/material";
import KeywordBtn from "../component/button/KeywordBtn";
import BasicSelect from "../component/select/Select";
import CompetitionCard from "../component/card/CompetitionCard";
import {createTheme,ThemeProvider} from '@mui/material';
import BasicPagination from "../component/pagination/Pagination";
import Footer from "../component/common/Footer";
import theme from "../style/theme";

export default function Index(){

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


    return(
        <>
            <ThemeProvider theme={theme}>
            <Nav />
            <Container>
                <PaddingWrap>
                    <div className="scroll">
                        <KeywordWrap>
                            <KeywordBtn text={"기획 아이디어"}/>
                            <KeywordBtn text={"광고 · 마케팅"} />
                            <KeywordBtn text={"사진 · 영상 · UCC"} />
                            <KeywordBtn text={"디자인 · 순수미술 · 공예"} />
                            <KeywordBtn text={"네이밍 · 슬로건"} />
                            <KeywordBtn text={"캐릭터 · 만화 · 게임"} />
                            <KeywordBtn text={"건축 건설 인테리어"} />
                            <KeywordBtn text={"과학 공학"} />
                            <KeywordBtn text={"예처능 패션"} />
                            <KeywordBtn text={"전시 페스티벌"} />
                            <KeywordBtn text={"문학 시나리오"} />
                            <KeywordBtn text={"해외"} />
                            <KeywordBtn text={"학술"} />
                            <KeywordBtn text={"창업"} />
                            <KeywordBtn text={"기타"} />
                        </KeywordWrap>
                    </div>
                    <CompetitionList>
                        <ul className="title">
                            <li>
                                <h2>인기있는 공모전</h2>
                                <p>인기있는 공모전을 카테고리 별로 확인 하세요</p>
                            </li>
                            <li>
                                <BasicSelect />
                            </li>
                        </ul>
                        <div className="competition-list">
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
                            </Card>
                            <Card>
                               <CompetitionCard id={"box1"}/>
                            </Card>
                        </div>
                    </CompetitionList>
                    <CompetitionList className="mt-5">
                        <ul className="title">
                            <li>
                                <h2>인기있는 공모전</h2>
                                <p>인기있는 공모전을 카테고리 별로 확인 하세요</p>
                            </li>
                        </ul>
                        <div className="competition-list">
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
                            </Card>
                            <Card>
                                <CompetitionCard id={"box2"}/>
                            </Card>
                        </div>
                    </CompetitionList>
                    <BasicPagination />
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
    .mt-5{
        margin-top: 5rem;
    }
    @media ${() => theme.device.mobile} {
        .mt-5{
            margin-top: 3rem;
        }
    }
`;

const KeywordWrap = styled(Box)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    input[type="radio"]{
        display: none;
    }
    label{
        margin: 0 1rem 1.5rem 0;
    }
    input[type="radio"]:checked+label {
        background-color: #FF7300;
        color: #fff;
    }   
    @media ${() => theme.device.tablet} {
        flex-wrap: nowrap;
        width: 100%;
        margin-bottom: 1rem;
    }
`;

const CompetitionList = styled(Box)`
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        h2{
            font-size: 2.5rem;
            color: #3b3b3b;
            font-weight: bold;
            line-height: 150%;
        }
        p{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 300;
        }
    }
    .competition-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    @media ${() => theme.device.mobile} {
        .title{
            h2{
                font-size: 2rem;
            }
            p{
                font-size: 1.4rem;
            }
            li:first-of-type{
                margin-right: 5rem;
            }
        }

    }
`;

const Card = styled(Box)`
    width: 16%;

    @media ${() => theme.device.tablet} {
        width: 32%;
        margin-bottom: 2rem;
    }

    @media ${() => theme.device.mobile2} {
        width: 49%;
    }
`;