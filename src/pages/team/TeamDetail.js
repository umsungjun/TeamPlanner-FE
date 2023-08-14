import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {Avatar, createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import Nav from "../../component/common/Nav"
import Footer from "../../component/common/Footer"
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import ScrollList from "../../component/list/ScrollList";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconWrap from "../../component/list/IconWrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comment from "../../component/recruitmentComment/Comment";
import Button from "@mui/material/Button";
import ApplicationModal from "../../component/modal/ApplicationModal";
import { useParams } from "react-router";
import { API } from "../../api/api";
import { now } from "moment/moment";


export default function TeamDetail({done}){
    const {recruitmentId} = useParams();
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
    const [commentData, setCommentData] = useState([]);
    const [flag, setChangeFlag] = useState(false);
    const [commentCount, setCommentCount] = useState(0)
    const [data, setData] = useState({
        commentList: []
    });
    const {
        id,
        title,
        content,
        currentMemberSize,
        maxMemberSize,
        likeCount,
        viewCount,
        commentList = [],
        boardActivityName,
        boardEndDate,
        authorNickname,
        authorProfileImg,
    } = data;


    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        API.get(`/api/v1/recruitment/${recruitmentId}`)
        .then(resp => {
            console.log(resp);
            console.log(data);
            // console.log()
            
            const tmpList = resp.data.commentList;
            setCommentCount(tmpList.length);
            let parents = tmpList.filter(c => c.parentCommentId === null);
            const childs = tmpList.filter(c => c.parentCommentId !== null);

            // console.log('parents', parents)
            // console.log('childs', childs)

            parents.map(p => {
                p.childCommentList = childs.filter(c => c.parentCommentId === p.id);
            });

            resp.data.commentList = parents;
            console.log('resp.data.commentList', resp.data.commentList)
            setData(resp.data);
            // console.log('tmp', tmp)
            // console.log(typeof(tmp));
            // console.log(Object.values(tmp))
        })
    }

    function dateDiff(_date1, _date2) {
        var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
     
        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
     
        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
     
        return diff;
    }
     
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
                                        <h1>{boardActivityName}</h1>
                                        <IconWrap viewCount={viewCount} likeCount={likeCount} commentCount={commentCount}/>
                                    </div>
                                    <ul className="team-info">
                                        <li className="info-wrap">
                                            <div className="info-box">
                                                <h2>모집 마감까지 <strong>D-{dateDiff(now(), boardEndDate)}</strong></h2>
                                            </div>
                                            <div className="info-box">
                                                <h2>현재인원/최대인원 : <strong>{currentMemberSize}/{maxMemberSize}</strong></h2>
                                            </div>
                                        </li>
                                        <li className="button-wrap">
                                            {
                                                done ? 
                                                <Button variant="contained" disabled>이미 참여한 공고입니다</Button> :
                                                <ApplicationModal recruitmentId={recruitmentId}/>
                                            }
                                        </li>
                                    </ul>
                             
                                </div>
                                <div className="content">
                                    <div className="profile dp-flex">
                                        <Avatar src={authorProfileImg}></Avatar>
                                        <h3>{authorNickname}</h3>
                                    </div>
                                    <div className="text-wrap">
                                        <h4>{title}</h4>
                                        {content?.split('\n').map(l => <p>{l}</p>)}
                                    </div>
                                </div>
                                <div className="comment-wrap">
                                    <Comment changeFlag={setChangeFlag} flag={flag} commentData={data.commentList} />
                                </div>
                            </div>
                        </Content>
                        <SideScroll>
                            <ScrollList category={"공모전"}/>
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
            h1{
                font-size: 3rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
        }
        .team-info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 2rem;
            border-bottom: 1px solid #FF7300;
            .info-wrap{
                display: flex;
                align-items: center;
                .info-box:first-of-type{
                    margin-right: 1rem;
                }
                .info-box{
                    padding: 1rem 2rem;
                    border: 1px solid rgba(0,0,0,.1);
                    border-radius: 4px;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    h2{
                        font-size: 1.6rem;
                        color: #3b3b3b;
                        line-height: 150%;
                        font-weight: 600;
                        text-align: center;
                        strong{
                            color: #FF7300;
                            font-weight: bold;
                        }
                    }
                }
            }
            li{
                button{
                    padding: .8rem 3rem !important;
                }
            }
            .button-wrap{
                button{
                    font-size: 1.6rem;
                }
            }
        }
        .content{
            padding: 3rem 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            .profile{
                margin-bottom: 2rem;
                svg{
                    width: 4rem;
                    height: 4rem;
                    color: #FFAD6A;
                }
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 130%;
                    font-weight: 700;
                    margin-left: .5rem;
                }
            }
            .text-wrap{
                h4{
                    font-size: 1.8rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                p{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                }
            }
        }
        .comment-wrap{
            margin-top: 2rem;
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
                flex-direction: column;
                align-items: flex-start;
                h1{
                    margin-bottom: 1rem;
                    font-size: 2.5rem;
                }
            }
            .team-info{
                flex-direction: column;
                align-items: flex-start;
                .info-wrap{
                    width: 100%;
                    margin-bottom: 1rem;
                    .info-box{
                        padding: 1rem;
                        width: 48%;
                        h2{
                            font-size : 1.4rem;
                        }
                    }
                }
                .button-wrap{
                    width: 100%;
                }
            }
        }
    }
`;
