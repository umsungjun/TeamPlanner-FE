import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import Title from "../../component/title/Title";
import MyPageMenu from "../../component/menu/MypageMenu";
import FilledBtn from "../../component/button/FilledBtn";
import theme from "../../style/theme";
import ParticipationCard from "../../component/card/ParticipationCard";
import { API } from "../../api/api";


export default function Participation(){

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


    const [data, setData] = useState({})
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        API.get(`/api/v1/recruitment/apply`)
        .then(res => {
            console.log('res', res)
            setData(res.data);
            let tmp = {};
            res.data.forEach(d => {
                console.log('d', d)
                tmp[`${d.boardId}`] = tmp[`${d.boardId}`] ? [...tmp[`${d.boardId}`], d] : [d];
            })

            Object.keys(tmp).forEach(e => {
                console.log('e', e)
            })
            console.log('tmp', tmp)

            setData(tmp)
        }).catch(err => {
            console.log('err', err)
        }).finally()
    }
    

    return(
        <>
        <ThemeProvider theme={theme}>
            <Nav/>
            <Container>
                <PaddingWrap>
                    <Title text={"마이페이지"}/>
                    <ContentWrap>
                        <SideList>
                            <MyPageMenu select={"참여신청"} />
                        </SideList>
                        <Content>
                            <div className="title dp-flex space-between">
                                <h1>내가 참여 신청한 리스트</h1>
                            </div>

                            {
                                Object.keys(data).map(e => {
                                    return (
                                    <ParticipationList>
                                        <h2>{data[e][0].boardName}</h2>
                                        <ul>
                                            {
                                            data[e].map(p => {
                                                return (
                                                <li>
                                                    <ParticipationCard {...p} fetchData={fetchData} />
                                                </li>   
                                                ) 
                                            })
                                            }
                                        </ul>
                                    </ParticipationList>
                                    )
                                })
                            }
                            {/* <ParticipationList>
                                <h2>현대오토에버 알고리즘 경진대회</h2>
                                <ul>
                                    <li>
                                        <ParticipationCard />
                                    </li>
                                    <li>
                                        <ParticipationCard />
                                    </li>
                                </ul>
                            </ParticipationList>
                            <ParticipationList>
                                <h2>아프리카 자원봉사활동 모집단</h2>
                                <ul>
                                    <li>
                                        <ParticipationCard />
                                    </li>
                                    <li>
                                        <ParticipationCard />
                                    </li>
                                    <li>
                                        <ParticipationCard />
                                    </li>
                                </ul>
                            </ParticipationList> */}
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


const ParticipationList = styled(Box)`
    margin-bottom: 2rem;
    h2{
        font-size: 1.8rem;
        color: #3b3b3b;
        font-weight: 600;
        line-height: 150%;
    }
    ul{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 2rem;
        li{
            width: 49%;
            margin-bottom: 2rem;
        }
    }
    @media ${() => theme.device.mobile2} {
        ul{
            li{
                width: 100%;
            }
        }
    }
`;