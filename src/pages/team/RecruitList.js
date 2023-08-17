import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav"
import Footer from "../../component/common/Footer"
import theme from "../../style/theme";
import { Box, Grid } from "@mui/material";
import ScrollList from "../../component/list/ScrollList";
import TeamRecruiteCard from "../../component/card/TeamRecruitCard";
import BasicPagination from "../../component/pagination/Pagination";

const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
  }));


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
                            <Grid container spacing={1}>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"ing"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"ing"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                                <Card item xs={12} md={6}>
                                    <Item><TeamRecruiteCard state={"done"}/></Item>
                                </Card>
                            </Grid>
                            <BasicPagination />
                        </div>
                      </Content>
                      <SideScroll>
                          <ScrollList />
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
            border-bottom: 2px solid #FF7300;
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