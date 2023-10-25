import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import SolidBtn from "../../component/button/SolideBtn";
import theme from "../../style/theme";
import FilledBtn from "../button/FilledBtn";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import { API } from "../../api/api";
import { subDays, isBefore ,isSameDay} from "date-fns"; // date-fns의 subDays 함수와 isBefore 함수를 사용합니다.
import dayjs from 'dayjs';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ProduceModal({selectedMember,recruitmentId}){

    const [maxMemberSize,setMaxMembmerSize]= useState([]);
      

    const [inputs, setInputs] = useState({
        selectedUserIds: selectedMember,
        recruitId : recruitmentId,
        teamName: "",
        startDate: null,
        endDate: "",
        maxTeamSize: maxMemberSize,
    });


    console.log(maxMemberSize);



      
    const handleDateChange = (name, date) => {
        const formatDateToString = (date) => {
          return date.format("YYYY-MM-DD HH:mm:ss");
        };
    
        const today = dayjs(); // Use Day.js for date operations
        
        if (name === "startDate" && date.isBefore(today)) {
          alert("시작 날짜는 현재 날짜 이후로 선택해야 합니다.");
          setInputs({
            ...inputs,
            startDate: today, // Set the startDate to the current date
          });
          return; // Do not update the state if the start date is invalid
        }

        if (inputs.startDate && name === "endDate" && date.isBefore(inputs.startDate)) {
            alert("마감 날짜는 시작날짜 보다 커야 합니다.");
            setInputs({
                ...inputs,
                endDate: null, // Set the startDate to the current date
              });
            return; // Do not update the state if the end date is invalid
          }
    
        const updatedInputs = {
          ...inputs,
          [name]: formatDateToString(date),
        };
    
        setInputs(updatedInputs);
      };

      const handleCreate = () => {
        console.log({...inputs})
        API.post("/api/v1/team", {...inputs})
            .then(res => {
                console.log(res);
                handleClose();
                alert("팀이 성공적으로 생성되었습니다!");
                window.location.reload();
            })
            .catch (err => {
            console.log(err);
            return alert(err.response.data.message)
            
        })
    }

   

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

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setMaxMembmerSize(value)
        console.log(name,value);
        setInputs({
          ...inputs,
          [name]: value,
        });
    };

    const theme2 = useTheme();
    const fullScreen = useMediaQuery(theme2.breakpoints.down('md'));

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
     
        setInputs({
            selectedUserIds: selectedMember,
            recruitId: recruitmentId,
            teamName: "",
            startDate: "",
            endDate: "",
            maxTeamSize: "",
        });
        setOpenModal(false);   
    }


    const today = new Date(); // 현재 날짜를 가져옵니다.
    const minSelectableDate = subDays(today, 1); // 현재 날짜 이전의 날짜를 가져옵니다.
  
    const shouldDisableDate = (date) => {
        // 시작 날짜가 현재 날짜보다 이전인 경우 true를 반환하여 해당 날짜를 비활성화합니다.
        return isBefore(date, today) || isSameDay(date, today);
      };


      useEffect(() => {
        API.get(`/api/v1/recruitment/${recruitmentId}`)
        .then(resp => {
            setMaxMembmerSize(resp.data.maxMemberSize)

        })
      }, [recruitmentId]);



   
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
                                    <TextField id="outlined-basic" variant="outlined" fullWidth name="teamName" onChange={onInputChange}/>
                                </li>
                                <li className="dp-flex">
                                    <div className="date">
                                        <h3>시작 날짜</h3>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                        <DatePicker  value={inputs.startDate}
                                        onChange={(date) => handleDateChange("startDate", date)}
                                        shouldDisableDate={shouldDisableDate}/>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="date">
                                        <h3>마감 날짜</h3>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                        <DatePicker value={inputs.endDate} onChange={(date) => handleDateChange('endDate', date)}/>
                                        </LocalizationProvider>
                                    </div>
                                </li>
                                <li>
                                <h3>최대 인원</h3>
                                <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="maxTeamSize"
                                                value={maxMemberSize}
                                                onChange={onInputChange}
                                                fullWidth
                                                sx={{fontSize : "1.4rem"}}
                                            >
                                                {
                                                    [...Array(10).keys()].map(i => {
                                                        if(i>=2){
                                                            return (
                                                                <MenuItem sx={{fontSize : "1.4rem"}} value={i}>{i}</MenuItem>
                                                                )
                                                        }
                                                       
                                                    })
                                                }
{/* 
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={10}>1</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={20}>2</MenuItem>
                                                <MenuItem sx={{fontSize : "1.4rem"}} value={30}>3</MenuItem>
                                                 */}
                                            </Select>
                                        </FormControl>
                                </li>
                            </ul>
                            <ul className="checkbox-wrap">
                                <li className="text">
                                    <h3>팀 채팅 관리</h3>
                                    <p>체크버튼 클릭 시 팀 채팅방을 만들어드립니다.</p>
                                </li>
                                <li>
                                <Checkbox {...label} defaultChecked size="large"/>
                                </li>
                            </ul>
                            <div className="button-wrap">
                                <SolidBtn text={"취소"} handle={handleClose}></SolidBtn>
                                <FilledBtn text={"생성완료"} handle={handleCreate}/>
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