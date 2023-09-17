import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router";
import { API } from "../../api/api";

export default function Update(){
    
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
    const {recruitmentId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
    });

    const queryParams = new URLSearchParams(location.search);
    const boardId = queryParams.get("boardId") || 1;
    useEffect(() => {
        // console.log("write hello")

        // console.log(queryParams.get("boardId"));
        fetchData();
    }, [])
    const fetchData = () => {
        API.get(`/api/v1/recruitment/${recruitmentId}`)
        .then(resp => {
            console.log(resp)
            // console.log()
            
            // const tmpList = resp.data.commentList;
            // setCommentCount(tmpList.length);
            // let parents = tmpList.filter(c => c.parentCommentId === null);
            // const childs = tmpList.filter(c => c.parentCommentId !== null);

            // // console.log('parents', parents)
            // // console.log('childs', childs)

            // parents.map(p => {
            //     p.childCommentList = childs.filter(c => c.parentCommentId === p.id);
            // });

            // resp.data.commentList = parents;
            // console.log('resp.data.commentList', resp.data.commentList)
            setData(resp.data);
            const tmpInput = {
                title: resp.data.title,
                content: resp.data.content,
                currentMemberSize: resp.data.currentMemberSize,
                maxMemberSize: resp.data.maxMemberSize
            }
            setInputs(tmpInput);
            // console.log('tmp', tmp)
            // console.log(typeof(tmp));
            // console.log(Object.values(tmp))
        })
    }
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        currentMemberSize: 1,
        maxMemberSize: 3,
    });
    const { title, content, currentMemberSize, maxMemberSize } = inputs;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
    };

    const handleWriteButton = (event) => {
        console.log("handle write button")
        console.log(`input = ${inputs}`)
        console.log('inputs', JSON.stringify(inputs, null, 2))
        API.put(`/api/v1/recruitment/${recruitmentId}`, {
            newTitle: inputs.title,
            newContent: inputs.content,
            newCurrentMemberSize: inputs.currentMemberSize,
            newMaxMemberSize: inputs.maxMemberSize,
        }).then(resp => {
            console.log(`resp ${resp}`);
            navigate(`/recruitment/${recruitmentId}`)
        }).catch(err => {
            console.log(`err = ${err}`);
        })
    };
    const handleCancelButton = (event) => {
        console.log("handle cancel button")
        navigate(-1);
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
                                    {/* <div className="title">
                                        <h1>제 10회 물류산업진흥재단 논문 공모전</h1>
                                    </div> */}
                                </div>
                                <div className="select-wrap">
                                    <div className="select">
                                        <h3>현재 인원</h3>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="currentMemberSize"
                                                value={currentMemberSize}
                                                onChange={onInputChange}
                                                fullWidth
                                                sx={{fontSize : "1.4rem"}}
                                            >

                                                {
                                                    [...Array(10).keys()].map(i => {
                                                        return (
                                                        <MenuItem sx={{fontSize : "1.4rem"}} value={i}>{i}</MenuItem>
                                                        )
                                                    })
                                                }
                                                {/* <MenuItem sx={{fontSize : "1.4rem"}} value={20}>2</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={30}>3</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="select">
                                        <h3>최대 인원</h3>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="maxMemberSize"
                                                value={maxMemberSize}
                                                onChange={onInputChange}
                                                fullWidth
                                                sx={{fontSize : "1.4rem"}}
                                            >
                                                {
                                                    [...Array(10).keys()].map(i => {
                                                        return (
                                                        <MenuItem sx={{fontSize : "1.4rem"}} value={i}>{i}</MenuItem>
                                                        )
                                                    })
                                                }
{/* 
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={10}>1</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={20}>2</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={30}>3</MenuItem>
                                                 */}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="input-wrap">
                                    <div className="name">
                                        <h3>제목</h3>
                                        <TextField 
                                        name="title"
                                        value={title}
                                        onChange={onInputChange}
                                        placeholder="제목을 입력해주세요..."
                                        id="outlined-basic" variant="outlined" fullWidth />
                                    </div>
                                    <div className="content">
                                        <h3>내용</h3>
                                        <TextField 
                                        name="content"
                                        value={content}
                                        onChange={onInputChange}
                                        placeholder="내용을 입력해주세요..."
                                        id="outlined-basic" variant="outlined" fullWidth multiline />
                                    </div>
                                </div>
                                <div className="dp-end">
                                    <div className="btn-wrap">
                                        <FilledBtn text={"취소"} handle={handleCancelButton} color={"gray"}></FilledBtn>
                                        <FilledBtn text={"모집글 수정"} handle={handleWriteButton}></FilledBtn>
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