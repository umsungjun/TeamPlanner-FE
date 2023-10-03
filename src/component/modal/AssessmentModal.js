import React, { useState,useEffect } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,Menu,ThemeProvider} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FilledBtn from "../button/FilledBtn";
import SolidBtn from "../../component/button/SolideBtn";
import CloseIcon from '@mui/icons-material/Close';
import theme from "../../style/theme";
import Rating from '@mui/material/Rating';
import { API } from "../../api/api";
import TextField from '@mui/material/TextField';
import AssessmentModal2 from "./AssessmentModal2";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Content, ContentWrap } from "../../pages/mypage/ProfileSetting";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

//   export const data = { 
//     labels: ['창의성', '리더쉽', '성실함', '기술력', '커뮤니케이션'],
//     datasets: [
//       {
//         label: '',
//         data: [4, 5, 7, 6, 5],
//         backgroundColor: 'rgba(255, 115, 0, 0.2)',
//         borderColor: 'rgba(255, 115, 0, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

export const options = {
    responsive: true,
    scales: {
       r: {
       min: 0, // MIN
       max: 10, // MAX
       beginAtZero: true,
       angleLines: {
          display: true,
          // color: 'red',
       },
       ticks: {
        stepSize: 1, // the number of step
       },
     },
   },
   plugins: {
    legend: {
      display: false,
    }
  }
}


export default function AssessmentModal({nickname,endDate,teamId,memberId}){
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
    

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme2 = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [evaluationsData, setEvaluationsData] = useState([]); // Initialize with an empty array

    const [chartData, setChartData] = useState({
        labels: ['창의성', '리더쉽', '성실함', '기술력', '커뮤니케이션'],
        datasets: [
          {
            label: '',
            data: [0, 0, 0, 0, 0], // 초기값
            backgroundColor: 'rgba(255, 115, 0, 0.2)',
            borderColor: 'rgba(255, 115, 0, 1)',
            borderWidth: 1,
          },
        ],
    });
  
    const handleClickOpen = () => {
 
    API.get(`/api/v1/profile/${nickname}`)
        .then(res => {

            if (new Date(endDate) > new Date()) {
            

            const evaluations = res.data.evaluations;
            const valueAvg = evaluations.reduce((sum, item) => sum + item.stat1, 0) / evaluations.length;
            const value2Avg = evaluations.reduce((sum, item) => sum + item.stat2, 0) / evaluations.length;
            const value3Avg = evaluations.reduce((sum, item) => sum + item.stat3, 0) / evaluations.length;
            const value4Avg = evaluations.reduce((sum, item) => sum + item.stat4, 0) / evaluations.length;
            const value5Avg = evaluations.reduce((sum, item) => sum + item.stat5, 0) / evaluations.length;

            const totalSum = evaluations.reduce((sum, item) => sum + item.stat1 + item.stat2 + item.stat3 + item.stat4 + item.stat5, 0) / evaluations.length;
            setValueSum(totalSum / 2);

            setChartData({
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: [valueAvg, value2Avg, value3Avg, value4Avg, value5Avg]
                    }
                ]
            });

            setValue(valueAvg);
            setValue2(value2Avg);
            setValue3(value3Avg);
            setValue4(value4Avg);
            setValue5(value5Avg);
            setEvaluationsData(evaluations); // S
        }
    })

    if (new Date(endDate) > new Date()) {
        setOpen(true);
    } else {
        setOpen2(true);
    }
    };
  
    const handleClose = () => {
    if (open) {
        setOpen(false);
    }
    if (open2) {
        setOpen2(false);
    }
    };


    const [value, setValue] = React.useState(5);
    const [value2, setValue2] = React.useState(5);
    const [value3, setValue3] = React.useState(5);
    const [value4, setValue4] = React.useState(5);
    const [value5, setValue5] = React.useState(5);
    const [valueSum, setValueSum] = React.useState(50);


    

    useEffect(() => {
        const totalValue = value*2 + value2*2 + value3*2 + value4*2 + value5*2;
        setValueSum(totalValue);
        
        
    }, [value, value2, value3, value4, value5]);

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleEvaluation=()=>{

        const evaluationData = {
            comment: comment,
            stat1: value,
            stat2: value2,
            stat3: value3,
            stat4: value4,
            stat5: value5
        };
     
        API.post(`/api/v1/team/evaluation/${teamId}/${memberId}`,evaluationData)
        .then(res => {
            window.alert("평가완료");
            window.location.reload(); // 페이지 새로고침
        }).catch(err => {
            window.alert(err.response.data.message);
          });
    }

    


    return(
        <ThemeProvider theme={theme}>
            <div>

                    {
                       new Date(endDate) > new Date() ?
                    <StyledMenuItem variant="outlined" onClick={handleClickOpen}>
                        평가보기
                    </StyledMenuItem>
                    :
                    <StyledMenuItem variant="outlined" onClick={handleClickOpen}>
                        평가하기
                    </StyledMenuItem>
                                        
                    }
                
                <AssessmentModalWrap
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div className="close-btn">
                        <IconButton onClick={handleClose} sx={{p : 0}}><CloseIcon/></IconButton>
                    </div>
                    <DialogTitle id="responsive-dialog-title">
                        <h1>팀 평가</h1>
                    </DialogTitle>
                    <StyledDialogContent sx={{p : 0}}>
                        <div className="padding">
                        <div className="chart-box">
                            <Radar
                            data={chartData}
                            options={options}
                            />
                        </div>
                        <ul className="rating-wrap">
                            <li>
                                <div>
                                    <h3>총 별점</h3>
                                    <h4>{evaluationsData.length > 0 ? `${valueSum} / 50` : '0 / 50'}</h4>
                                </div>
                                <div>
                                    <h3>창의성</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value/2}
                                        // onChange={(event, newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>리더십</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value2/2}
                                        // onChange={(event, newValue) => {
                                        //     setValue2(newValue);
                                        // }}
                                        />
                                </div>
                                <div>
                                    <h3>성실함</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value3/2}
                                        // onChange={(event, newValue) => {
                                        //     setValue3(newValue);
                                        // }}
                                        />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>기술력</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value4/2}
                                        // onChange={(event, newValue) => {
                                        //     setValue4(newValue);
                                        // }}
                                        />
                                </div>
                                <div>
                                    <h3>커뮤니케이션</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value5/2}
                                        // onChange={(event, newValue) => {
                                        //     setValue5(newValue);
                                        // }}
                                        />
                                </div>
                            </li>
                        </ul>
                        <ContentWrap style={{ width: "100%" }}>
                            <h1>평가의견</h1>
                            <Content>
                                <div className="review-box">
                                    <div className="review-wrap">
                                        <div className="review-list-modal">
                                            {evaluationsData.length === 0 ? (
                                                <center><h3>평가의견이 존재하지 않습니다</h3></center>
                                                
                                            ) : (
                                                evaluationsData.map((item) => {
                                                    return <h3>{item.comment}</h3>;
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </ContentWrap>

                      

                            {/* {evaluationsData.map((ev) => {

                            <div className="review-wrap">   
                                <div className="review-list">
                                    <h3></h3>
                    
                                 </div>
                            </div>  
                            })}; 
                            
                 */}
                        {/* <div className="textarea">
                            <h3>한줄평</h3>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                defaultValue="성실하고 리더쉽이 좋습니다."
                                fullWidth
                            />
                        </div> */}
                        {/* <div className="button-wrap">
                            <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                            <FilledBtn  handle={handleClose} text={"참여신청"} />
                        </div> */}
                        </div>
                    </StyledDialogContent>
                </AssessmentModalWrap>
                <AssessmentModalWrap
                    fullScreen={fullScreen}
                    open={open2}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

<               StyledDialogContent sx={{p : 0}}>
                        <div className="padding">
                        {/* <h1>{nickname.length > 10 ? ` ${nickname.substring(0, 10)} 평가해주세요 !` : `${nickname}님을 평가해주세요!`}</h1> */}
                        {/* <div className="chart-box">
                            <Radar
                            // data={data}
                            options={options}
                            />
                        </div> */}
                        <ul className="rating-wrap">
                            <li>
                                <div>
                                    <h3>총 점</h3>
                                    <h4> {valueSum}/ 50</h4>
                                </div>
                                <div>
                                    <h3>창의성</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>리더십</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value2}
                                        onChange={(event, newValue) => {
                                            setValue2(newValue);
                                        }}
                                        />
                                </div>
                                <div>
                                    <h3>성실함</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value3}
                                        onChange={(event, newValue) => {
                                            setValue3(newValue);
                                        }}
                                        />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>기술력</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value4}
                                        onChange={(event, newValue) => {
                                            setValue4(newValue);
                                        }}
                                        />
                                </div>
                                <div>
                                    <h3>커뮤니케이션</h3>
                                    <Rating
                                        name="simple-controlled"
                                        value={value5}
                                        onChange={(event, newValue) => {
                                            setValue5(newValue);
                                        }}
                                        />
                                </div>
                            </li>
                        </ul>
                        <div className="textarea">
                            <h3>한줄평</h3>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={handleCommentChange}
                                fullWidth
                            />
                        </div>
                        <div className="button-wrap">
                            <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                            <FilledBtn  handle={handleEvaluation} text={"평가하기"} />
                        </div>
                        </div>
                    </StyledDialogContent>

                </AssessmentModalWrap>
            </div>
        </ThemeProvider>
    )
}

const StyledMenuItem = styled(MenuItem)`
    &:hover{
        background-color: transparent;
    }
`;

const AssessmentModalWrap = styled(Dialog)`
    .MuiPaper-root{
        width: 50rem;
        padding: 2rem 2rem 0 2rem;
    }
    .close-btn{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        svg{
            width: 2.5rem;
            height: 2.5rem;
        }
    }
    h1{
        font-size: 2rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: bold;
    }
    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        width: 100%;
        button{
            padding:.3em 0;
        }
        button:first-of-type{
            margin-right: 1rem;
        }
    }
    @media ${() => theme.device.mobile} {
        .MuiPaper-root{
            width: 100%;
            padding: 2rem 2rem 0 2rem;
        }
    }
`;

const StyledDialogContent = styled(DialogContent)`
    .padding{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /* width: 100%; */
        padding: 2rem;
    }
    .chart-box{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        width: 80%;
    }
    .rating-wrap{
        width: 100%;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 2rem;
        li{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div{
                h3{
                    font-size: 1.4rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                }
                h4{
                    font-size: 1.4rem;
                    color: #3b3b3b;
                    line-height: 150%;
                }
                width: 48%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
        }
    }
    .textarea{
        width: 100%;
        h3{
            font-size: 1.6rem;
            color: #3b3b3b;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        textarea{
            font-size: 1.6rem;
            line-height: 150%;
            color: #3b3b3b;
            width: 100%;
        }
    }
    @media ${() => theme.device.mobile} {
        padding-bottom: 5rem;
        .chart-box{
            /* width: 80%; */
        }
    }
`;

