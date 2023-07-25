import React, { useState } from "react";
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


export default function ApplicationModal(){


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
            <ThemeProvider theme={theme2}>
                <ApplicationBtn>
                    <FilledBtn text={"참여신청"} handle={handleOpen}></FilledBtn>
                </ApplicationBtn>
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
                            <h1>참여메세지를 남겨주세요!</h1>
                        </DialogTitle>
                        <DialogContent>
                            <div className="profile">
                                <IconButton sx={{p : 0}}>
                                    <AccountCircleIcon/>
                                </IconButton>
                                <h3>유저 1</h3>
                            </div>
                            <div className="textarea">
                                <textarea placeholder="내용 입력">열심히 하겠습니다!</textarea>
                            </div>
                            <div className="button-wrap">
                                <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                                <FilledBtn text={"참여신청"} />
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
    }
    .profile{
        display: flex;
        align-items: center;
        margin:1rem 0;
        svg{
            width: 4rem;
            height: 4rem;
            color: #FFAD6A;
        }
        h3{
            font-size: 1.6rem;
            color: #3b3b3b;
            font-weight: 600;
            line-height: 150%;
            margin-left: .5rem;
        }
    }
    .textarea{
        textarea{
            width: 99%;
            height: 20rem;
            font-size: 1.6rem;
            line-height: 150%;
            color: #3b3b3b;
            border: 1px solid rgba(0,0,0,.2);
            border-radius: 4px;
        }
    }
    .button-wrap{ 
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        button{
            padding:.3em 0;
            width: 49%;
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