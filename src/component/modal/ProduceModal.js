import React, { useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import SolidBtn from "../../component/button/SolideBtn";
import theme from "../../style/theme";
import FilledBtn from "../button/FilledBtn";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ProduceModal(){

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

    const theme2 = useTheme();
    const fullScreen = useMediaQuery(theme2.breakpoints.down('md'));

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return(
        <>
            <ThemeProvider theme={theme}>
                <ApplicationBtn>
                    <FilledBtn text={"팀 생성하기"} handle={handleOpen}></FilledBtn>
                </ApplicationBtn>
                <ProduceModalWrap
                    fullScreen={fullScreen}
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Box>
                        <div className="close-btn">
                            <IconButton onClick={handleClose} sx={{p : 0}}><CloseIcon/></IconButton>
                        </div>
                        <DialogTitle id="responsive-dialog-title">
                            <h1>팀 생성</h1>
                        </DialogTitle>
                        <DialogContent>
                            <ul className="input-wrap">
                                <li>
                                    <h3>팀명</h3>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth/>
                                </li>
                                <li className="dp-flex">
                                    <div className="date">
                                        <h3>시작 날짜</h3>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                        <DatePicker />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="date">
                                        <h3>마감 날짜</h3>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                        <DatePicker />
                                        </LocalizationProvider>
                                    </div>
                                </li>
                            </ul>
                            <ul className="checkbox-wrap">
                                <li className="text">
                                    <h3>팀 일정 관리</h3>
                                    <p>체크버튼 클릭 시 팀 캘린더를 만들어드립니다.</p>
                                </li>
                                <li>
                                <Checkbox {...label} defaultChecked size="large"/>
                                </li>
                            </ul>
                            <div className="button-wrap">
                                <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                                <FilledBtn text={"생성완료"} handle={handleClose}/>
                            </div>
                        </DialogContent>
                    </Box>
                </ProduceModalWrap>
            </ThemeProvider>
        </>
    )
}

const ProduceModalWrap = styled(Dialog)`
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
    .input-wrap{
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        h3{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .dp-flex{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        li{
            margin-bottom: 2rem;
            input[type="text"]{
                font-size: 1.4rem;
                color: #3b3b3b;
            }
        }
    }
    .checkbox-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 0;
        h3{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 600;
        }
        p{
            font-size: 1.4rem;
            color: #3b3b3b;
            line-height: 150%;
        }
    }
    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
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
        }
        .input-wrap{
            li{
                .date:first-of-type{
                    margin-right: 1rem;
                }
            }
        }
    }
`;


const ApplicationBtn = styled(Box)` 
    button{
        width: 100% !important;
    }
    @media ${() => theme.device.mobile} {
        width: 100%;
        & > button{
            width: 100% !important;
        }
    }
`;