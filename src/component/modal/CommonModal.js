import React, { useState,useEffect } from "react";
import styled from "@emotion/styled";
import {createTheme,Icon,IconButton,ThemeProvider} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import SolidBtn from "../../component/button/SolideBtn";
import theme from "../../style/theme";
import Box from "@mui/material/Box";
import FilledBtn from "../button/FilledBtn";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function CommonModal({button}){


    const isLoggedIn = localStorage.getItem("userInfo");


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
    const ModalOpen = () => {
        setOpenModal(true)
    };
    const handleClose = () => setOpenModal(false);
  
    useEffect(() => {
        // 로컬스토리지에 "isLoggedIn" 키가 있으면 모달을 닫음
        if (isLoggedIn) {
            setOpenModal(false);
        }
    }, [isLoggedIn]);


    return(
        <>
            <ThemeProvider theme={theme}>
                    <div className="btn" onClick={ModalOpen}>
                        {
                            button 
                        }
                    </div>
                <ApplicationModalWrap
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
                            <h1>로그인 후 이용가능한 서비스입니다.<br/>
                                로그인 하시겠습니까?</h1>
                        </DialogTitle>
                        <DialogContent>
                            <div className="button-wrap">
                                <FilledBtn text={"확인"}  handle={handleClose}/>
                            </div>
                        </DialogContent>
                    </Box>
                </ApplicationModalWrap>
            </ThemeProvider>
        </>
    )
}

const ApplicationModalWrap = styled(Dialog)`
    .MuiPaper-root{
        width: 40rem;
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
        text-align: center;
    }

    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        /*수정 */
        button{
            padding:.3em 0;
            /* width: 49%; */
        }
        /*수정 */
        button:first-of-type{
            margin-right: 1rem;
        }
    }
    @media ${() => theme.device.mobile} {
        .MuiPaper-root{
            width: 100%;
        }
    }
`;


const ApplicationBtn = styled(Box)`
    @media ${() => theme.device.mobile} {
        width: 100%;
        & > button{
            width: 100% !important;
        }
    }
`;