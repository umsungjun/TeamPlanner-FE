import React, { useEffect,useState } from "react";
import styled from "@emotion/styled";
import {Box, createTheme,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";
import CompetitionCard from "../card/CompetitionCard";
import { API } from "../../api/api";

export default function ScrollList({category}){


    const [data, setData] = useState([]);
    // useEffect(() => {
    //     API.get(`/api/v1/board?category=${category}&page=0&size=6&sort=view,desc`).then((res) => {      
    //         setData(res.data.content);            
    //     })
    // }, [data]);


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
               <ScrollListWrap>
                    <h3>{category} <strong>인기 소식</strong></h3>
                    <div className="scroll-list">
                        <div className="scroll">

                        {data.map((item) => {
                                let title;
                                if (item.activitiyName.length >= 10) {
                                    title = item.activitiyName.slice(0,10) + "...";
                                } else {
                                    title = item.activitiyName;
                                }
                                return (
                                    
                                    <div className="card">
                                        <CompetitionCard  
                                            id={item.boardId} 
                                            className={"small"}
                                            activityImg={item.activityImg} 
                                            activityName={title} 
                                            likeCount={item.likeCount} 
                                            viewCount={item.viewCount}
                                        
                                        />
                                    </div>
                              
                                )
                            })}
                            
                            {/* <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div>
                            <div className="card">
                                <CompetitionCard  id={"box1"} className={"small"}/>
                            </div> */}
                        </div>
                    </div>
               </ScrollListWrap>
            </ThemeProvider>
        </>
    )
}

const ScrollListWrap = styled(Box)`
    width: 100%;
    h3{
        font-size: 1.8rem;
        color: #3b3b3b;
        line-height: 150%;
        strong{
            font-weight: bold;
        }
    }
    .scroll{
        height: 108vh;
        overflow-y: scroll;
        margin-top: 2rem;
    }
    .card{
        margin-bottom: 1.5rem;
    }
    .card:last-of-type{
        margin: 0;
    }
    @media ${() => theme.device.desktop} {
        margin-top: 5rem;
        .scroll-list{
            width: 100%;
            overflow-x: scroll;
        }
        .scroll{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: auto;
            overflow-y: auto;
            width: 120vw;
        }
        .card{
            width: 100%;
            margin-right: 2rem;
        }
        .card:last-of-type{
        margin-bottom: 1.5rem;
        }
    }
    @media ${() => theme.device.mobile2} {
        .scroll{
            width: 280vw;
        }
    }
`;