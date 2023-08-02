import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider,Box} from '@mui/material';
import Button from "@mui/material/Button";
import Nav from "../../component/common/Nav"
import theme from "../../style/theme";
import Footer from "../../component/common/Footer";
import ScrollList from "../../component/list/ScrollList";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FilledBtn from "../../component/button/FilledBtn";

export default function Writing(){
    
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

    const [person, setPerson] = React.useState(10);

    const handleChange = (event) => {
        setPerson(event.target.value);
    };
    const [person2, setPerson2] = React.useState(10);

    const handleChange2 = (event) => {
        setPerson2(event.target.value);
    };
    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                <Container>
                    <PaddingWrap>
                        <Content>
                            <div className="content-wrap">
                                <div className="title-wrap">
                                    <IconButton className="prev-btn"><KeyboardArrowLeftIcon/></IconButton>
                                    <div className="title">
                                        <h1>제 10회 물류산업진흥재단 논문 공모전</h1>
                                    </div>
                                </div>
                                <div className="select-wrap">
                                    <div className="select">
                                        <h3>현재 인원</h3>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={person}
                                                onChange={handleChange}
                                                fullWidth
                                                sx={{fontSize : "1.4rem"}}
                                            >
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={10}>1</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={20}>2</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={30}>3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="select">
                                        <h3>최대 인원</h3>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={person2}
                                                onChange={handleChange2}
                                                fullWidth
                                                sx={{fontSize : "1.4rem"}}
                                            >
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={10}>1</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={20}>2</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={30}>3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="input-wrap">
                                    <div className="name">
                                        <h3>제목</h3>
                                        <TextField id="outlined-basic" variant="outlined" fullWidth />
                                    </div>
                                    <div className="content">
                                        <h3>내용</h3>
                                        <TextField id="outlined-basic" variant="outlined" fullWidth multiline />
                                    </div>
                                </div>
                                <div className="dp-end">
                                    <div className="btn-wrap">
                                        <FilledBtn text={"취소"} handle={handleChange2} color={"gray"}></FilledBtn>
                                        <FilledBtn text={"참여신청"} handle={handleChange2}></FilledBtn>
                                    </div>
                                </div>
                            </div>
                        </Content>
                        <SideScroll>
                            <ScrollList />
                        </SideScroll>
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
        width: 65%;
        .prev-btn{
            padding: 0;
            svg{
                width: 3rem;
                height: 3rem;
            }
        }
        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin: 2rem 0;
            padding-bottom: 2rem;
            border-bottom: 1.5px solid #FF7300;
            h1{
                font-size: 3rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
        }
        .select-wrap{
            display: flex;
            align-items: center;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            .select{
                width: 15%;
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                
            }
            .select:first-of-type{
                margin-right: 2rem;
            }
        }
        .input-wrap{
            h3{
                font-size: 1.8rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                margin-bottom: 1rem;
            }
            input{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
            }
            textarea{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                height: 40rem !important;
            }
            div{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            .name{
                margin: 2rem 0;
            }
        }
        .dp-end{
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }
        .btn-wrap{
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 3rem;
            button:first-of-type{
                margin-right: 1rem;
            }
        }
    }
    @media ${() => theme.device.desktop} {
        .content-wrap{
            width: 100%;
        }
    }
    @media ${() => theme.device.tablet} {
        .content-wrap{
            .btn-wrap{
                width: 100%;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        .content-wrap{
            .select-wrap{
                .select{
                    width: 100%;
                }
            }
        }
    }
`;