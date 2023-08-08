import React, { useState } from "react";
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
import TextField from '@mui/material/TextField';

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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  export const data = {
    labels: ['연구실 분위기', '강의 전달력', '논문 지도력', '실질 인건비', '인품'],
    datasets: [
      {
        label: '',
        data: [4, 5, 7, 6, 5],
        backgroundColor: 'rgba(255, 115, 0, 0.2)',
        borderColor: 'rgba(255, 115, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

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
}


export default function AssessmentModal(){

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
    const theme2 = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [value, setValue] = React.useState(2);
    const [value2, setValue2] = React.useState(2);
    const [value3, setValue3] = React.useState(2);
    const [value4, setValue4] = React.useState(2);
    const [value5, setValue5] = React.useState(2);
    
    return(
        <ThemeProvider theme={theme}>
            <div>
                <StyledMenuItem variant="outlined" onClick={handleClickOpen}>
                    평가보기
                </StyledMenuItem>
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
                            data={data}
                            options={options}
                            />
                        </div>
                        <ul className="rating-wrap">
                            <li>
                                <div>
                                    <h3>남은 별점</h3>
                                    <h4> 0 / 20</h4>
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
                                defaultValue="성실하고 리더쉽이 좋습니다."
                                fullWidth
                            />
                        </div>
                        <div className="button-wrap">
                            <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                            <FilledBtn  handle={handleClose} text={"참여신청"} />
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