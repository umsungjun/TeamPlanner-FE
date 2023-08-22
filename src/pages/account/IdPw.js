import React, { useState ,useEffect} from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { API } from "../../api/api";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import FilledBtn from "../../component/button/FilledBtn";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function IdPw(){

    const navigate = useNavigate();
    const [verifyButton,setVerifyButton] = useState(false);
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const[userId,setUserId]= useState();
    const[email,setEmail]=useState();

    const [isVerificationRequested, setIsVerificationRequested] = useState(false);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    if (minutes > 0) {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59;
                    } else {
                        clearInterval(countdown);
                        return 0;
                    }
                }
            });
        }, 1000);
        return () => clearInterval(countdown);
    }, [isVerificationRequested, minutes]);

    const handleVerificationClick = () => {

            // Start the timer and set the flag to prevent multiple requests
            setMinutes(3);
            setSeconds(0);
            setIsVerificationRequested(true);

        // Here you can also add the logic to send the verification request to the server
    };

    const theme = createTheme({
        typography:{
            fontFamily : "Pretendard"
        },
        palette: {
            primary: {
              main: "#FF7300",
            },
            secondary : {
                main : "#3b3b3b"
            }
         },
    })

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [change, setChange] = React.useState(true);

    const handleChange2 = () => {
        setChange(!change);
    };

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const user_id = document.getElementById('id').value.trim();
        const email_id = document.getElementById('email').value.trim();
        const verifyNum = document.getElementById('verifyNum').value.trim();
        if(email_id.match(emailRegEx)===null) { //형식에 맞지 않을 경우 아래 콘솔 출력
            alert('이메일 형식을 확인해주세요');
            return;
        }

        API.post("/api/v1/member/signup/verify", {
            email : email_id,
            code : verifyNum,
            verifyPurpose : "FORGOT_PASSWORD"
          }).then((res) => {
        
            console.log(res)
        }).catch(err => {
            return
        });;

        API.post("/api/v1/member/forgot-password", {
            username: user_id,
            email: email_id,
            code : verifyNum
          }).then((res) => {
            alert("임시번호 전송완료")
            navigate("/login");
        }).catch(err => {
            // console.log(err.response)
            alert("인증번호가 만료되었거나 일치하지 않습니다!");
        });;
    };

    const EmailFormSubmit= (event)=>{
        
        event.preventDefault(); // Prevent the default form submission behavior
        const email = document.getElementById('email').value.trim();
        const user_id = document.getElementById('id').value.trim();

        if(email===null || user_id === null){
            alert("이메일 및 닉네임을 입력해주세요");
        }
        
        if(email.match(emailRegEx)===null) { //형식에 맞지 않을 경우 아래 콘솔 출력
            alert('이메일 형식을 확인해주세요');
            return;
        }

        API.post("/api/v1/member/email-verify", {
            email :email,
            username : user_id
          }).then((res) => {
            API.post("/api/v1/member/signup/send-verification", {
                "email" :email,
                "verifyPurpose" : "FORGOT_PASSWORD"
              }).then((res) => {
                setEmail(email);
                setUserId(user_id);
                setVerifyButton(true); //버튼 비활성화 및 readonly로 수정못하게
                alert("이메일 전송이 완료되었습니다.");
                handleVerificationClick(); //타이머 돌아가게
            }).catch(err => {
                setVerifyButton(false);
                alert(err.response.data.message);
            });;
           
        }).catch(err => {
            alert(err.response.data.message);
            return
        });;

    }



    const EmailFormSubmitForId= (event)=>{
        
        event.preventDefault(); // Prevent the default form submission behavior
        const email = document.getElementById('nicknameEmail').value.trim();
        const user_name = document.getElementById('nickname').value.trim();

        if(email===null || user_name === null){
            alert("이메일 및 닉네임을 입력해주세요");
            return;
        }

        if(email.match(emailRegEx)===null) { //형식에 맞지 않을 경우 아래 콘솔 출력
            alert('이메일 형식을 확인해주세요');
            return;
        }

        API.post("/api/v1/member/idEmail-verify", {
            email :email,
            nickname : user_name
          }).then((res) => {
            API.post("/api/v1/member/signup/send-verification", {
                "email" :email,
                "verifyPurpose" : "FORGOT_ID"
              }).then((res) => {
                
                document.getElementById('nicknameEmail').value="";
                document.getElementById('nickname').value="";
                alert("이메일로 아이디가 전송되었습니다.");

            }).catch(err => {
                alert(err.response.data.message);
            });;
           
        }).catch(err => {
            alert(err.response.data.message);
            return
        });;

    }
  

    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                    <Container>
                        <IdPWWrap> 
                            {
                                change ?
                                <>
                                    <h1>아이디 찾기</h1>
                                    <h2>아이디를 찾기 위해 아래정보를 정확하게 입력해주세요.</h2>
                                </>
                                :
                                <>
                                    <h1>비밀번호 찾기</h1>
                                    <h2>비밀번호를 찾기 위해 아래정보를 정확하게 입력해주세요.</h2>
                                </>
                            }                           
                            <TabWrap sx={{ width: '100%' }}>
                                <Box>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <StyledTab label={<><h3>아이디 찾기</h3></>} {...a11yProps(0)} sx={{width : '50%'}} onClick={handleChange2}/>
                                        <StyledTab label={<><h3>비밀번호 찾기</h3></>} {...a11yProps(1)} sx={{width : '50%'}} onClick={handleChange2}/>
                                    </Tabs>
                                </Box>
                            </TabWrap>
                            <StyledTabPanel value={value} index={0}>
                                <p>회원가입시에 사용했던 이름과 이메일로 아이디를 보내드립니다.</p>
                                <ul>
                                    <li>
                                        <h3>이름</h3>
                                        <div className="input-wrap">
                                            <TextField id="nickname" type="text" variant="outlined" fullWidth placeholder="이름을 입력하세요." />
                                        </div>
                                    </li>
                                    <li>
                                        <h3>이메일</h3>
                                        <div className="input-wrap">
                                            <TextField id="nicknameEmail" type="text" variant="outlined" fullWidth placeholder="이메일을 입력하세요."/>
                                        </div>
                                    </li>
                                    <li>
                                        <FilledBtn text={"이메일로 아이디 전송"} handle={EmailFormSubmitForId}/>
                                    </li>
                                </ul>
                                <div className="login-join-wrap">
                                    <Button variant="outlined" color="secondary" fullWidth>로그인</Button>
                                    <Button variant="outlined" color="secondary" fullWidth>회원가입</Button>
                                </div>
                            </StyledTabPanel>
                            <StyledTabPanel value={value} index={1}>
                                <p>회원가입 시 사용한 이메일을 입력하시면<br/>
                                새로운 임시비밀번호를 입력하신 이메일로 보내 드립니다.</p>
                                <ul>
                                    <li>
                                        <h3>아이디</h3>
                                        <div className="input-wrap">
                                            <TextField id="id" type="text" value={userId} inputProps={{ readOnly: verifyButton }} variant="outlined" fullWidth placeholder="아이디를 입력하세요." />
                                        </div>
                                    </li>
                                    <li>
                                        <h3>이메일</h3>
                                        <div className="input-wrap">
                                            <TextField id="email" type="text" value={email} inputProps={{ readOnly: verifyButton }} variant="outlined" fullWidth placeholder="이메일을 입력하세요." />
                                            {isVerificationRequested ? (
                                            <div className="sBtn"><FilledBtn disabled={verifyButton} text="발송완료" handle={EmailFormSubmit}/></div>):
                                            (
                                                <div className="sBtn"><FilledBtn text="전송하기" handle={EmailFormSubmit}/></div>
                                            )}
                                        </div>
                                    </li>
                                    <li>

                                        {isVerificationRequested ? (
                                            <>
                                            <h3>인증번호</h3>
                                        
                                            <div className="input-wrap">
                                                <TextField id="verifyNum" variant="outlined" fullWidth/>
                                            
                                            </div>
                                            </>
                                            ):
                                            (
                                                ""
                                            )
                                           
                                        }
                                            
                                    </li> 
                                    <li>
                                    {isVerificationRequested ? (
                                                <span>인증번호가 발송되었습니다 <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></span>
                                            ) : (
                                                ""
                                            )}
                                            {isVerificationRequested && (
                                                <a href="#" onClick={EmailFormSubmit}>재전송</a>
                                            )}
                                    </li>

                                        
                                    <li>
                                        <FilledBtn handle={handleFormSubmit} text={"비밀번호 재설정 링크 전송"}/>
                                    </li>
                                </ul>
                                <div className="login-join-wrap">
                                    <Button variant="outlined" color="secondary" fullWidth>로그인</Button>
                                    <Button variant="outlined" color="secondary" fullWidth>회원가입</Button>
                                </div>
                            </StyledTabPanel>
                        </IdPWWrap>
                    </Container>
                <Footer />
            </ThemeProvider>
        </>
    )
}

const Container = styled(Box)`
    width: 100%;
    margin-top: 20rem;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
    }
    @media ${() => theme.device.mobile} {
        height: auto;
    }
`;

const IdPWWrap = styled(Box)`
    border: 1px solid rgba(0,0,0,.1);
    padding: 5rem;
    border-radius: 1rem;
    width: 60rem;
    h1{
        font-size: 2.5rem;
        color: #3b3b3b;
        text-align: center;
        line-height: 150%;
        font-weight: bold;
        margin-bottom: .5rem;
    }
    h2{
        font-size: 1.8rem;
        color: #808080;
        line-height: 150%;
        text-align: center;
    }
    @media ${() => theme.device.mobile} {
        width: 100%;
        border: none;
        padding: 2rem;
        h1{
            font-size: 2rem;
        }
        h2{
            font-size: 1.6rem;
        }
    }   
`;


const TabWrap = styled(Box)`
    margin-top: 5rem;
    button{
        font-size: 1.6rem;
        color: #FF7300;
        line-height: 150%;
    }
    .MuiTabs-indicator{
        display: none;
    }
    .Mui-selected{
        border-bottom: 1px solid #fff;
        border-top: 1px solid #FF7300;
        border-right: 1px solid #FF7300;
        border-left: 1px solid #FF7300;
        border-top-right-radius : 4px;
        border-top-left-radius : 4px;
        
    }
`;

const StyledTabPanel = styled(CustomTabPanel)`
    &>div{
        padding: 2rem 0;
    }
    p{
        font-size: 1.6rem;
        color: #808080;
        line-height: 150%;
        margin: 3rem 0;
    }
    ul{
        margin-bottom: 3rem;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2rem;
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                font-weight: 600;
                line-height: 150%;
            }
            input{
                font-size: 1.6rem;
                padding: 1.2rem 2rem;
            }
            .input-wrap{
                width: 80%;
                display: flex;
                align-items: center;
                .sBtn{
                    width: 80%;
                    margin-left: 1rem;
                }
            }
        button{
            font-size: 1.6rem;
        }
        }
    }
    .login-join-wrap{
        width: 100%;
        padding-top: 3rem;
        border-top: 1px solid rgba(0,0,0,.1);
        margin-top: 3rem;
        button{
            border-color: #D9D9D9;
            font-size: 1.6rem;
            font-weight: 500;
            box-shadow: none;
            border-radius: 4px;
            padding: .8rem 0;
            display: flex;
            align-items: center;
            img{
                margin-right: 1rem;
            }
        }
        button:first-of-type{
            margin-bottom: 1rem;
        }
        button:hover{
            background-color: #fff;
        }
    }

    @media ${() => theme.device.mobile} {
        ul{
            li{
                .input-wrap{
                    width: 70%;
                }
            }
        }
    }
`;

const StyledTab = styled(Tab)`
  border-bottom: 1px solid #FF7300;
  border-left: 1px solid #fff;
`;