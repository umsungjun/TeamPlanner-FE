import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import SolidBtn from "../button/SolideBtn";
import FilledBtn from "../button/FilledBtn";
import { API } from "../../api/api";

export default function ParticipationCard({boardId,
    boardName,
    recruitmentApplyContent,
    recruitmentApplyId,
    recruitmentTitle,
    recruitmentContent,
    recruitmentId,
    fetchData,
    boardImage

}){


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

    const onCancel = () => {
        API.delete(`/api/v1/recruitment/${recruitmentId}/apply`, {
            }
        )
        .then(res => {
            console.log('res', res)
            alert("참여신청이 취소되었습니다.")
            fetchData();
        }).catch(err => {
            console.log('err', err)
            if (err.response?.data?.message) alert(err.response?.data?.message)
        })
    }

    const recuritmentPage = () => {
        window.location.href = `/recruitment/${recruitmentId}`;
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <ParticipationCardWrap>
                    <div className="padding">
                        <ul className="participation-list">
                            <li className="img-box">
                                <img src={boardImage} />
                            </li>
                            <li className="text-wrap">
                                 <a href={`/recruitment/${recruitmentId}`}><h2>모집 글 제목 : {recruitmentTitle}</h2></a>
                                <p>참여신청 글 : {recruitmentApplyContent}</p>
                            </li>
                        </ul>
                        <div className="button-wrap">
                            <SolidBtn text={"취소"} handle={onCancel}></SolidBtn>
                            <FilledBtn text={"모집 글 확인 "} handle={recuritmentPage}/>
                        </div>
                    </div>
                </ParticipationCardWrap>
            </ThemeProvider>
        </>
    )
}

const ParticipationCardWrap = styled(Box)`
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    .padding{
        padding: 3rem;
    }
    .participation-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 2rem 0;
        li{
            margin: 0;
        }
        .img-box{
            width: 32%;
            img{
                border-radius: 1rem;
                width: 100%;
                height: 130px;
            }
        }
        .text-wrap{
            width: 63%;
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                font-weight: 600;
                line-height: 150%;
                margin-bottom: .5rem;
            }
            p{
                font-size: 1.6rem;
                color: #3b3b3b;
                font-weight: 400;
                line-height: 150%;
            }
        }
    }
    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        div{
            width: 49%;
            button{
                width: 100% !important;
            }
        }
        button{
            padding:.3em 0;
            width: 49%;
        }
    }
    @media ${() => theme.device.mobile2} {
        .participation-list{
            .img-box{
                width: 30%;
                img{
                    height: 100px;
                }
            }
            .text-wrap{
                width: 65%;
            }
        }
    }
`;