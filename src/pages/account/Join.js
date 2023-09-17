import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import {createTheme,Icon,IconButton,ThemeProvider,Paper,Modal} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilledBtn from "../../component/button/FilledBtn";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from "axios";
import { API } from "../../api/api";
import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Join(){

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: '',
        verificationCode: '',
        phone: '',
        profileImage:'',
        profileIntro:'',
        birth: '',
        job:'UNKNOWN',
        education:'UNKNOWN',
        admissionDate:'',
        graduationDate:'',
        educationGrade:'',
        gender:'UNKNOWN',
        address:'',
        kakaoId:'',
        contactEmail:'',
        isPublic: '0',
    });

    const [submitCondition, setSubmitCondition] = useState({
        usernameValid: false, 
        passwordState: false,
        nicknameValid: false,
        emailVerification: false
    });

    const [usernameValid, setUsernameValid] = useState(false);

    const [buttonTimeout, setButtonTimeout] = useState(false);

    const [isCodeSent, setIsCodeSent] = useState(false);

    const [isVerified, setIsVerified] = useState(false);

    const [remainingTime, setRemainingTime] = useState(180);

    const [passwords, setPasswords] = useState({
        password1: '',
        password2: ''
    });

    const [passwordValid, setPasswordValid] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [educations, setEducations] = useState([]);

    const [birthData, setBirthData] = useState({
        year:'',
        month:'',
        day:''
    });

    const [admissionDateData, setAdmissionDateData] = useState({
        year:'',
        month:''
    });

    const [graduationDateData, setGraduationDateData] = useState({
        year:'',
        month:''
    });

    const [fileOpen, setFileOpen] = useState(false);

    const [imageFile, setImageFile] = useState([]);

    const [imageFileURL, setImageFileURL] = useState(["/img/profile/profile.png"]);

    const [preSignedUrl, setPreSignedUrl] = useState([]);
    


    const handleFileOpen = () => {
        setFileOpen(true);
    };

    const handleFileClose = () => {
        setFileOpen(false);
    };

    //이미지
    const handleImageUpload = async (event) => {
        // presignedurl 발급
        const selectedFile = event.target.files[0];
        if(selectedFile){
            const fileType = selectedFile.type;
            if(fileType.startsWith('image/')){
                const extension = selectedFile.name.split('.').pop();
                setImageFile(selectedFile);

                setFormData((prevData) => ({
                    ...prevData,
                    profileImage: "https://teamplanner-bucket.s3.ap-northeast-2.amazonaws.com/"+formData.username+"."+extension,
                  }));
                try{
                    const response = await API.get("/api/v1/image/new-pre-signed-url?extension="+extension+"&purpose=PUT");
                    setPreSignedUrl(response.data.preSignedUrl);
                    console.log(preSignedUrl);
                    handleFileClose();
                } catch (error){
                    console.log(error.response);
                    alert(error.response.data.message);
                }
            } else{
                alert('이미지 파일이 아닙니다.');
            }
        }
    };

    const uploadImageToS3 = async (preSignedUrl, file) => {
        try{
            const response = await axios.put(preSignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });
        } catch (error) {
            console.log(error.response); 
            alert(error.response);   
        }
    }


    //생년월일
    const years = Array.from({ length: 100 }, (_, i) => ({
        value: (new Date().getFullYear() - i).toString(),
        label: (new Date().getFullYear() - i).toString(),  
    }));
          
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));
          
    const days = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));

    const updateBirth = () => {
        if (birthData.year == '' || birthData.month == '' || birthData.day == '') return;
        const birthString = `${birthData.year}-${birthData.month}-${birthData.day}`;
        setFormData((prevData) => ({
            ...prevData,
            birth: birthString,
        }));
    };
    
    const handleBirthChange = (field, value) => {
        setBirthData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    };    


    //입학년도
    const updateAdimssionDate = () => {
        if (admissionDateData.year == '' || admissionDateData.month == '') return;
        const admissionDateString = `${admissionDateData.year}-${admissionDateData.month}-01`;
        setFormData((prevData) => ({
            ...prevData,
            admissionDate: admissionDateString,
        }));
    };
    
    const handleAdmissionDateChange = (field, value) => {
        setAdmissionDateData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    }; 
    
    //졸업년도
    const graduationYears = Array.from({ length: 100 }, (_, i) => ({
        value: (new Date().getFullYear()+10 - i).toString(),
        label: (new Date().getFullYear()+10 - i).toString(),  
    }));
    const updateGraduationDate = () => {
        if (graduationDateData.year == '' || graduationDateData.month == '') return;
        const graduationDateString = `${graduationDateData.year}-${graduationDateData.month}-01`;
        setFormData((prevData) => ({
            ...prevData,
            graduationDate: graduationDateString,
        }));
    };
    
    const handleGraduationDateChange = (field, value) => {
        setGraduationDateData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    }; 


    //전화번호
    const [phoneData, setPhoneData] = useState({
        phone1:'',
        phone2:'',
        phone3:''
    })

    const handlePhoneChange = (event) => {
        const { id, value } = event.target;
        setPhoneData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    }; 

    const updatePhone = () =>{
        if (phoneData.phone1 == '' || phoneData.phone2 == '' || phoneData.phone3 == '') return;
        const phoneString = `${phoneData.phone1}-${phoneData.phone2}-${phoneData.phone3}`;
        setFormData((prevData) => ({
            ...prevData,
            phone: phoneString,
        }));
    }


    //아이디 중복확인
    const handleCheckDuplicateUsername = () => {
        const requestData = {username:formData.username};

        if(requestData.username!=''){
            API.post("/api/v1/member/signup/check-duplicate/username", requestData)
            .then(response => {
                if(response.status==200){
                    setSubmitCondition((prevData) => ({
                        ...prevData,
                        usernameValid: true,
                      }));
                }
            // 성공적으로 전송되었을 때 할 작업
            })
            .catch(error => {
                alert(error.response.data.message)
            });
        }
        setButtonTimeout(true);
        setTimeout(()=>{
            setButtonTimeout(false);
        },1000)
    };


    //닉네임 중복확인
    const handleCheckDuplicateNickname = () => {
        const requestData = {nickname:formData.nickname};

        if(requestData.nickname!=''){
            API.post("/api/v1/member/signup/check-duplicate/nickname", requestData)
            .then(response => {
                if(response.status==200){
                    setSubmitCondition((prevData) => ({
                        ...prevData,
                        nicknameValid: true,
                      }));
                }
                else{
                    setSubmitCondition((prevData) => ({
                        ...prevData,
                        nicknameValid: false,
                      }));
                }
            // 성공적으로 전송되었을 때 할 작업
            })
            .catch(error => {
                alert(error.response.data.message);
            });
        }
        setButtonTimeout(true);
        setTimeout(()=>{
            setButtonTimeout(false);
        },1000)
    };


    //비밀번호
    const handlePasswordsChange = (event) =>{
        const {id, value} = event.target;
        setPasswords((prevData) =>({
            ...prevData,
            [id]: value,
        }));
    };

    const isPasswordValid = (password) => {
        // Check if the password contains at least 8 characters
        if (password.length < 8) {
            return false;
        }
    
        // Check if the password contains both letters and numbers
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
    
        return hasLetter && hasNumber;
    };


    const updatePassword = () =>{
        if(!passwordValid || passwords.password1!= passwords.password2){
            setSubmitCondition((prevData) => ({
                ...prevData,
                passwordState: false,
              }));
        }
        if(passwordValid && passwords.password1!='' && passwords.password1 == passwords.password2){
            setSubmitCondition((prevData) => ({
                ...prevData,
                passwordState: true,
              }));
            setFormData((prevData) => ({
                ...prevData,
                password: passwords.password1,
              }));
        }
    };
    
    //인증번호
    const handleSendVerification = () => {
        const requestData = {
            email: formData.email,
            verifyPurpose: "SIGN_UP"
        };

        if(requestData.email!=''){
            API.post("/api/v1/member/signup/send-verification", requestData)
            .then(response => {
                setIsCodeSent(true);
                setRemainingTime(180);
                console.log('데이터가 성공적으로 전송되었습니다.');
                // 성공적으로 전송되었을 때 할 작업
            })
            .catch(error => {
                alert(error.response.data.message);
            });
        }
    };

    const handleVerification = () => {
        const requestData = {
            email: formData.email,
            code: formData.verificationCode,
            verifyPurpose: "SIGN_UP"
        };
        if(requestData.email!=''&&requestData.code!=''){
            API.post("api/v1/member/signup/verify", requestData)
            .then(response => {
                if(response.status==200){
                    setSubmitCondition((prevData) => ({
                        ...prevData,
                        emailVerification: true,
                    }));
                    setIsCodeSent(false);
                    setIsVerified(true);
                    alert(response.data.message);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
                //인증번호 재전송
                if(error.response.data.code==-22001){
                    setIsCodeSent(true);
                    setRemainingTime(180);
                }
            });
        }
    };

    //범용
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };


    //제출
    const handleSubmit = () => {
        console.log(formData);
        const isAllTrue = Object.values(submitCondition).every(value => value === true);
        if(isAllTrue){
            API.post("/api/v1/member/signup", formData)
            .then(response => {
                console.log(formData);
                console.log('회원가입이 완료되었습니다.');
                // 성공적으로 전송되었을 때 할 작업
                window.location.href = "/";
            })
            .catch(error => {
                console.error('회원가입에 실패했습니다:', error);
                // 전송 실패 시 에러 처리
            });
        }
        else{
            alert("필수 입력란을 채워주세요.")
        }
        if(preSignedUrl!=''){
            uploadImageToS3(preSignedUrl,imageFile);
        }

    };
      
    

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

    //useEffect
    useEffect(()=>{
        fetchEnum();
    },[]);

    useEffect(()=>{
        updateBirth();
    },[birthData]);

    useEffect(()=>{
        updateAdimssionDate();
    },[admissionDateData]);

    useEffect(()=>{
        updateGraduationDate();
    },[graduationDateData]);

    useEffect(()=>{
        updatePhone();
    },[phoneData]);    

    useEffect(()=>{
    },[buttonTimeout]);

    useEffect(()=>{
        updatePassword();
        setPasswordValid(isPasswordValid(passwords.password1));
    },[passwords]);

    useEffect(() => {
        if (remainingTime > 0 && isCodeSent) {
          const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
          }, 1000);
    
          return () => clearInterval(timer);
        }
      }, [remainingTime, isCodeSent]);

    useEffect(()=>{
        if(imageFile!=''){
            setImageFileURL(URL.createObjectURL(imageFile));
        }
    },[imageFile]);

    const fetchEnum = ()=>{
        API.get('/api/v1/member/signup/enums')
        .then(response => {
            console.log('API 응답 데이터:', response.data);
            setJobs(response.data.job.map(option => ({ value: option.name, label: option.label})));
            setEducations(response.data.education.map(option => ({ value: option.name, label:option.label})));
        })
        .catch(error => {
          console.error('API 호출 오류:', error);
        });
    }

    return(
        <>
         <ThemeProvider theme={theme}>
            <Nav />
            <JoinWrap>
                <h1>회원가입</h1>
                <div className="join-box">
                    <h2>필수입력</h2>
                    <ul>
                        <li>
                            <h3>아이디</h3>
                            <div className="input-wrap">
                                <TextField id="username" pattern="[a-zA-Z0-9]" value={formData.username} onChange={handleInputChange} variant="outlined" fullWidth />
                                <div className="sBtn">
                                    <FilledBtn text="중복확인" handle = {handleCheckDuplicateUsername}/>
                                </div>
                            </div>
                        </li>
                        <div className="notice-wrap">
                            {
                                submitCondition.usernameValid ?
                                <p className="notice-text">사용가능한 아이디 입니다.</p>:
                                <></>
                            }
                        </div>
                        <li>
                            <h3>비밀번호</h3>
                            <div className="input-wrap">
                                <TextField id="password1" pattern="[a-zA-Z0-9]" value={passwords.password1} onChange={handlePasswordsChange} type="password" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <div className="notice-wrap">
                            {
                                !passwordValid ?
                                <p className="password-notice-text">비밀번호를 8글자 이상, 영문+숫자 조합으로 설정해주세요.</p>:
                                <></>
                            }
                        </div>
                        <li>
                            <h3>비밀번호 재확인</h3>
                            <div className="input-wrap">
                                <TextField id="password2" pattern="[a-zA-Z0-9]" value={passwords.password2} onChange={handlePasswordsChange} type="password" variant="outlined" fullWidth />
                            </div>
                        </li>
                        <div className="notice-wrap">
                            {submitCondition.passwordState ? (
                                <p className="notice-text">비밀번호가 일치합니다</p>
                            ) : null}
                        </div>
                        <li>
                            <h3>닉네임</h3>
                            <div className="input-wrap">
                                <TextField id="nickname" value={formData.nickname} onChange={handleInputChange} variant="outlined" fullWidth />
                                <div className="sBtn"><FilledBtn text="중복확인" handle = {handleCheckDuplicateNickname}/></div>
                            </div>
                        </li>
                        <div className="notice-wrap">
                            {
                                submitCondition.nicknameValid ?
                                <p className="notice-text">사용가능한 닉네임 입니다.</p>:
                                <></>
                            }
                        </div>
                        <li>
                            <h3>이메일</h3>
                            <div className="input-wrap">
                                <TextField id="email" value={formData.email} onChange={handleInputChange} disabled={isVerified} variant="outlined" fullWidth />
                                {
                                    !isVerified ?
                                    <div className="sBtn"><FilledBtn text="인증하기" handle={handleSendVerification}/></div>:
                                    <div className="sBtn"><FilledBtn text="인증하기" handle={handleSendVerification} color="secondary" disabled/></div>
                                }
                            </div>
                        </li>
                        <li>
                            <h3>인증번호</h3>
                            <div className="input-wrap">
                                <TextField id="verificationCode" value={formData.verificationCode} onChange={handleInputChange} disabled={!isCodeSent} variant="outlined" fullWidth />
                                {
                                    isCodeSent ?
                                    <div className="sBtn"><FilledBtn text="일치확인" handle={handleVerification}/></div>:
                                    <div className="sBtn"><FilledBtn text="일치확인" handle={handleVerification} color="secondary" disabled/></div>
                                }
                            </div>
                        </li>
                        <div className="notice-wrap">
                           {isCodeSent && (
                                <div className="number-text">
                                     <p className="gray-text">인증번호가 발송되었습니다 <span>{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span></p>
                                        <a href="#" onClick={handleSendVerification}>재전송</a>
                                </div>
                            )}
                        </div>
                        <li>
                            <h3>전화번호</h3>
                            <div className="phone-wrap">
                            <TextField id="phone1" value={phoneData.phone1} onChange={handlePhoneChange} variant="outlined" fullWidth placeholder="010" inputProps={{ maxLength: 3 }}/>
                            <span className="phone-separator">-</span>
                            <TextField id="phone2" value={phoneData.phone2} onChange={handlePhoneChange} variant="outlined" fullWidth placeholder="xxxx" inputProps={{ maxLength: 4 }}/>
                            <span className="phone-separator">-</span>
                            <TextField id="phone3" value={phoneData.phone3} onChange={handlePhoneChange} variant="outlined" fullWidth placeholder="xxxx" inputProps={{ maxLength: 4 }}/>
                            </div>
                        </li>
                    </ul>
                    <div className="title">
                        <h3>선택사항</h3>
                        <IconButton>
                            <ErrorOutlineIcon />
                        </IconButton>
                    </div>
                    <ul>
                        <li>
                            <h3>프로필이미지</h3>
                            <div className="profileImage">
                                <img src={imageFileURL} alt="프로필 이미지"/>
                                <IconButton disabled={!submitCondition.usernameValid} onClick={handleFileOpen}><AddCircleIcon/></IconButton>
                                <Modal open={fileOpen} onClose={handleFileClose} aria-labelledby="image-upload-modal" aria-describedby="image-upload-description">
                                    <Paper>
                                        <div className="modal-header">
                                        <h2>이미지 업로드</h2>
                                        <IconButton onClick={handleFileClose}>
                                            <CloseIcon />
                                        </IconButton>
                                        </div>
                                        <div className="image-upload-content">
                                            <input type="file" accept="image/*" onChange={handleImageUpload}/>
                                        </div>
                                    </Paper>
                                </Modal>
                            </div>
                        </li>
                        <li>
                            <h3>자기소개</h3>
                            <div className="input-wrap">
                                <TextField id="profileIntro" value={formData.profileIntro} onChange={handleInputChange} variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>성별</h3>
                            <div className="radio-wrap">
                                <div className="radio-box">
                                    <input type="radio" name="gender" id="gender" value="MALE" onChange={handleInputChange}></input>
                                    <label htmlFor="MALE">남자</label>
                                </div>
                                <div className="radio-box">
                                    <input type="radio" name="gender" id="gender" value="FEMALE" onChange={handleInputChange}></input>
                                    <label htmlFor="FEMALE">여자</label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <h3>생년월일</h3>
                            <div className="birth-wrap">
                                <Select
                                    className = "year"
                                    options={years}
                                    value={years.find(option => option.value === birthData.year)}
                                    onChange={(selectedOption) => {
                                        handleBirthChange('year', selectedOption.value);
                                    }}
                                    placeholder="년"
                                />
                                <Select
                                    className = "month"
                                    options={months}
                                    value={months.find(option => option.value === birthData.month)}
                                    onChange={(selectedOption) => {
                                        handleBirthChange('month', selectedOption.value);
                                    }}
                                    placeholder="월"
                                />
                                <Select
                                    className = "day"
                                    options={days}
                                    value={days.find(option => option.value === birthData.day)}
                                    onChange={(selectedOption) => {
                                        handleBirthChange('day', selectedOption.value);
                                    }}
                                    placeholder="일"
                                />
                            </div>
                        </li>
                        <li>
                            <h3>직업</h3>
                            <div className="input-wrap">
                                <Select
                                    options={jobs}
                                    value={jobs.find(option => option.value == jobs.jobs)}
                                    onChange={(selectedOption) => setFormData(prevData => ({ ...prevData, job: selectedOption.value}))}
                                    placeholder="선택"
                                />
                            </div>
                        </li>
                        <li>
                            <h3>최종학력</h3>
                            <div className="birth-wrap">
                                <Select
                                    options={educations}
                                    value={educations.find(option => option.value == educations.educations)}
                                    onChange={(selectedOption) => setFormData(prevData => ({ ...prevData, education: selectedOption.value}))}
                                    placeholder="선택"
                                />
                            </div>
                        </li>
                        <li>
                            <h3>입학년도</h3>
                            <div className="birth-wrap">
                                <Select
                                    className = "year"
                                    options={years}
                                    value={years.find(option => option.value === admissionDateData.year)}
                                    onChange={(selectedOption) => {
                                        handleAdmissionDateChange('year', selectedOption.value);
                                    }}
                                    placeholder="년"
                                />
                                <Select
                                    className = "month"
                                    options={months}
                                    value={months.find(option => option.value === admissionDateData.month)}
                                    onChange={(selectedOption) => {
                                        handleAdmissionDateChange('month', selectedOption.value);
                                    }}
                                    placeholder="월"
                                />
                            </div>
                        </li>
                        <li>
                            <h3>졸업년도</h3>
                            <div className="birth-wrap">
                                <Select
                                    className = "year"
                                    options={graduationYears}
                                    value={graduationYears.find(option => option.value === graduationDateData.year)}
                                    onChange={(selectedOption) => {
                                        handleGraduationDateChange('year', selectedOption.value);
                                    }}
                                    placeholder="년"
                                />
                                <Select
                                    className = "month"
                                    options={months}
                                    value={months.find(option => option.value === graduationDateData.month)}
                                    onChange={(selectedOption) => {
                                        handleGraduationDateChange('month', selectedOption.value);
                                    }}
                                    placeholder="월"
                                />
                            </div>
                        </li>
                        <li>
                            <h3>카카오아이디</h3>
                            <div className="input-wrap">
                                <TextField id="kakaoId" value={formData.kakaoId} onChange={handleInputChange} variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>연락처(이메일)</h3>
                            <div className="input-wrap">
                                <TextField id="contactEmail" value={formData.contactEmail} onChange={handleInputChange} variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>거주지</h3>
                            <div className="input-wrap">
                                <TextField id="address" value={formData.address} onChange={handleInputChange} variant="outlined" fullWidth />
                            </div>
                        </li>
                        <li>
                            <h3>프로필공개범위</h3>
                            <div className="radio-wrap" flex-direction="column">
                                <div className="radio-box">
                                    <input type="radio" name="isPublic" id="isPublic" value={0} defaultChecked onChange={handleInputChange}></input>
                                    <label htmlFor={0}>전체공개</label>
                                </div>
                                <div className="radio-box">
                                    <input type="radio" name="isPublic" id="isPublic" value={1} onChange={handleInputChange}></input>
                                    <label htmlFor={1}>팀원공개</label>
                                </div>
                                <div className="radio-box">
                                    <input type="radio" name="isPublic" id="isPublic" value={2} onChange={handleInputChange}></input>
                                    <label htmlFor={2}>비공개</label>
                                </div>
                            </div>
                        </li>
                        <div className="notice-wrap">
                            {
                                formData.isPublic==1 || formData.isPublic==2 ?
                                <p className="notice-text">프로필을 전체공개로 설정하면 더 좋은 팀매칭이 가능합니다!</p>:
                                <></>
                            }
                        </div>
                        <li>
                            <div className="submitButton">
                                <FilledBtn text="가입하기" handle={handleSubmit}/>
                            </div>
                        </li>
                    </ul>
                </div>
            </JoinWrap>
            <Footer />
         </ThemeProvider>
        </>
    )
}

const JoinWrap = styled(Box)`
    margin-top: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        font-size: 2.5rem;
        color: #3b3b3b;
        font-weight: 600;
        line-height: 150%;
        margin-bottom: 2rem;
    }
    .join-box{
        width: 30%;
        background-color: #fff;
        padding: 5rem;
        box-shadow: 0 0 8px 3px rgba(0,0,0,.05);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2{
            font-size: 2rem;
            line-height: 150%;
            color: #FF7300;
            width: 100%;
            border-bottom: 1px solid #FF7300;
            padding-bottom: 1rem;
            font-weight: 600;
            margin-bottom: 3rem;
        }
        .title{
            width: 100%;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            margin-top: 5rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            h3{
                font-size: 2rem;
                line-height: 150%;
                color: #3b3b3b;
                font-weight: 600;
            }
            svg{
                color: rgba(0,0,0,.5);
                width: 2rem;
                height: 2rem;
            }
        }
        ul{
            width: 100%;
            li:first-of-type{
                margin: 0;
            }
            li:not(ol li){
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 1.5rem;
                h3{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    font-weight: 600;
                    line-height: 150%;
                }
                input{
                    font-size: 1.4rem;
                    padding: 1.2rem 2rem;
                }

                .input-wrap{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    .sBtn{
                        width: 65%;
                        margin-left: 1rem;
                    }.
                }
                .birth-wrap{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .phone-wrap{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

            }
            .profileImage{
                width: 35%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                margin-right: 35%;
                img{
                    width: 60%;
                    border-radius: 100%;
                }
                button{
                    position: absolute;
                    bottom: 0;
                    right: 1.5rem;
                    background-color: #fff;
                    padding: .5rem;
                    svg{
                        width: 3rem;
                        height: 3rem;
                        color: #3b3b3b;
                    }
                }
            }
            .submitButton{
                margin-left:auto;
            }
            .notice-wrap{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: .5rem;
                .notice-text{
                    width: 65%;
                    font-size: 1.4rem;
                    color: #54B904;
                    font-weight: 400;
                    line-height: 150%;
                }
                .password-notice-text{
                    width: 65%;
                    font-size: 1.4rem;
                    color: #CC9473;
                    font-weight: 400;
                    line-height: 150%;
                }
                .number-text{
                    width: 65%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p{
                        color: rgba(0,0,0,.5);
                        font-size: 1.4rem;
                        font-weight: 400;
                        line-height: 150%;
                    }
                    a{
                        color: #FF7300;
                        font-weight: 600;
                        text-decoration: underline;
                        font-size: 1.4rem;
                    }
                }
            }
        }

        .radio-wrap{
            display: flex;
            align-items: center;
            width: 65%;
            .radio-box{
                display: flex;
                align-items: center;
                margin-right: 5rem;
                label{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 500;
                    margin-left: .5rem;
                }
                input[type="radio"]{
                    padding: 0;
                    margin: 0;
                }
            }
            .radio-box:last-of-type{
                margin: 0;
            }
        }
    }
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
        h1{
            font-size: 2rem;
        }
        .join-box{
            width: 50%;
            h2{
                font-size: 1.8rem;
            }
        }
    }
    @media ${() => theme.device.mobile} {
        h1{
            margin: 0;
        }
        .join-box{
            width: 90%;
            border-radius: 0;
            padding: 0;
            margin-top: 3rem;
            box-shadow: none;
        }
    }
`;