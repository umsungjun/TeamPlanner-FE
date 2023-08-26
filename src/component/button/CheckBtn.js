import React, { useState ,useEffect} from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import { Check } from "@mui/icons-material";
import { API } from "../../api/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function CheckBtn({type,scrapCountFlag,setScrapCountFlag,recruitmentState,likeCountFlag,setLikeCountFlag}){

    const Toast = Swal.mixin({
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

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

    const { boardId } = useParams();

    const { recruitmentId } = useParams();

    // 스크랩
    const [scrap,setScrap] =useState(false);
    //좋아요 번호
    const [boardLikeId, setBoardLikeId] = useState(null);
    
    // 모집 글 좋아요 state값
    const [recruitmentLike,setRecruitmentLike] =useState(recruitmentState);
    // 좋아요아이디
    const [currentRecruitmentLikeId, setCurrentRecruitmentLikeId] = useState(null);


    const scrapState=()=>{
            API.get(`/api/v1/board/${boardId}/boardLike/state`,
            )
            .then(res => {
                setScrap(res.data.stateMessage);
                if(res.data.stateMessage){
                setBoardLikeId(res.data.boardLikeId);
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const handleScrap = () => {
        
        if (scrap) {
        API.delete(`/api/v1/board/${boardId}/boardLike/${boardLikeId}`)
            .then(() => {
                setScrapCountFlag(!scrapCountFlag); // 스크랩 플래그 변경;
                setScrap(false); // 스크랩 취소 시 상태 변경
                scrapState();
                Swal.fire({
                    title:'스크랩 삭제',         // Alert 제목
                    text:'스크랩을 삭제하였습니다.',  // Alert 내용
                    icon:'success',                         // Alert 타입
                  });
            })
            .catch(err => {
            console.log(err);
            });
        }
        else{
        API.get(`/api/v1/board/${boardId}/boardLike`)
            .then(() => {
                setScrapCountFlag(!scrapCountFlag); // 스크랩 플래그 변경
                setScrap(true); // 스크랩 추가 시 상태 변경
                scrapState();
                Swal.fire({
                    title:'스크랩 추가',         // Alert 제목
                    text:'스크랩에 추가하였습니다.',  // Alert 내용
                    icon:'success',                         // Alert 타입
                  });
                
            })
            .catch(err => {
            console.log(err);
            });
        }
    };

    
    const handleLike = () => {

        if(recruitmentLike){
            API.delete(`/api/v1/recruitment/${recruitmentId}/like`)
            .then((res) => {
                setRecruitmentLike(!recruitmentLike);
                setLikeCountFlag(!likeCountFlag);
                Swal.fire({
                    title:'좋아요',         // Alert 제목
                    text:'모집 글 좋아요',  // Alert 내용
                    icon:'success',                         // Alert 타입
                  });
            })
            .catch(err => {
            console.log(err);
            });

        }else{
            API.post(`/api/v1/recruitment/${recruitmentId}/like`)
            .then((res) => {
                setCurrentRecruitmentLikeId(res.data.recruitmentLikeId);
                setRecruitmentLike(!recruitmentLike);
                setLikeCountFlag(!likeCountFlag);
                Swal.fire({
                    title:'좋아요',         // Alert 제목
                    text:'모집 글 좋아요',  // Alert 내용
                    icon:'success',                         // Alert 타입
                  });
            })
            .catch(err => {
            console.log(err);
            });
        }
 
       
    }

    // const handleLike = () => {
    //         console.log(localStorage.getItem("userInfo"));
            // API.delete(`/api/v1/recruitment/${recruitmentId}/like`)
            //     .then((res) => {
            //         setRecruitmentLike(!recruitmentLike);
            //         setLikeCountFlag(!likeCountFlag);
            //         Swal.fire({
            //             title:'좋아요',         // Alert 제목
            //             text:'모집 글 좋아요',  // Alert 내용
            //             icon:'success',                         // Alert 타입
            //           });
            //     })
            //     .catch(err => {
            //     console.log(err);
            //     });
            // }

    console.log(scrap);
    return (
        <>
            <ThemeProvider theme={theme}>
                {
                    type == "like"?
                        
                        <CheckBoxBtn>
                            <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={recruitmentLike}/>} label="좋아요" onClick={handleLike}  />
                        </CheckBoxBtn>
                        : <></> 
                      
                }
                {
            type =="scrap" ?
                <CheckBoxBtn>
                    
                    <FormControlLabel
                        control={<Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} checked={scrap} />}
                        label="스크랩"
                        onClick={handleScrap}
                    />
                </CheckBoxBtn> : <></>
                        
                }

            </ThemeProvider>
        </>
    )
}

const CheckBoxBtn = styled(FormGroup)`
    padding: .5rem 1rem;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.1);
    width: fit-content;
    span{
        font-size: 1.4rem;
        padding: 0;
    }
    svg{
        margin-right: .5rem;
        width: 1.5rem;
        height: 1.5rem;
    }
    label{
        margin: 0;
    }
`;