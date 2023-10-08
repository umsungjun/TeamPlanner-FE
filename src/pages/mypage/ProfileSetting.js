import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider,Paper,Modal} from '@mui/material';
import Nav from "../../component/common/Nav";
import Footer from "../../component/common/Footer";
import theme from "../../style/theme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Title from "../../component/title/Title";
import MyPageMenu from "../../component/menu/MypageMenu";
import FilledBtn from "../../component/button/FilledBtn";
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TextField from '@mui/material/TextField';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import axios from "axios";
import { API } from "../../api/api";
import TechStackModal from '../../component/modal/TechStackModal';

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
import RecomandTeamCard from "../../component/card/RecomandTeamCard";
import ChatBox from "../../component/chat/ChatBox";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

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

export default function ProfileSetting(){
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

    ////
    ////
    ////
    ////

    const [edit, setEdit] = useState(true);

    const handleEdit = () => {
        const { evaluations, ...remains } = profileData;
        setEdit((prevEdit) => !prevEdit);
        setFormData(remains);
    };
    
    //localStorage
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

    const updateLocalStorage = () =>{

        setUserInfo((prevData) => ({
            ...prevData,
            profileImg: formData2.basicProfile.profileImage
        }));
    }
    useEffect(() => {
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
    },[userInfo]);
    
     //fetched data
    const [profileData, setProfileData] = useState({
        basicProfile:[],
        techStacks:[],
        activities:[],
        certifications:[],
        evaluations:[],
        nickname: ''
    });

    const [formData, setFormData] = useState({
        basicProfile:[],
        techStacks:[],
        activities:[],
        certifications:[],
        evaluations:[],
        nickname: ''
    });

    const [formData2, setFormData2] = useState({
        basicProfile:[],
        techStacks:[],
        activities:[],
        certifications:[]
    });


    const [techStackData, setTechStackData] = useState([]);

    const [genders, setGenders] = useState([]);

    const [jobs, setJobs] = useState([]);

    const [educations, setEducations] = useState([]);



    //
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

    const handleFileOpen = () => {
        setFileOpen(true);
    };

    const handleFileClose = () => {
        setFileOpen(false);
    };

    const [fileOpen, setFileOpen] = useState(false);

    const [imageFile, setImageFile] = useState([]);

    const [newImageFile, setNewImageFile] = useState([]);

    const [imageFileURL, setImageFileURL] = useState(["/img/profile/profile.png"]);

    const [preSignedUrl, setPreSignedUrl] = useState(['']);

    const [submitPermit1, setSubmitPermit1] = useState(false);

    const [submitPermit2, setSubmitPermit2] = useState(false);

    const [newStackId, setNewStackId] = useState(-1);

    //기술스택
    const [stackDuplicate, setStackDuplicate] = useState(false);
    const handleTechStackSelect = (selectedTechStack) => {
        //fill here
        //if selectedTechStack.id가 이미 formData.techStacks내에 존재한다면 -> alert("이미 추가된 기술스택입니다")
        const techStackExists = formData.techStacks.some(
            (techStack) => techStack.techStackItem.id === selectedTechStack.id
        );
        if (techStackExists) {
            setStackDuplicate(true);
            alert("이미 추가된 기술스택입니다.");
            return; // Do not proceed further
        }

        const newTechStack = {
            id: newStackId,
            skillLevel: 1,
            techStackItem: {
              id: selectedTechStack.id,
              name: selectedTechStack.name,
              techCategory: selectedTechStack.techCategory,
              imageUrl: selectedTechStack.imageUrl,
              userGenerated: false,
            },
        };
        const updatedTechStacks = [...formData.techStacks, newTechStack];

        // formData 업데이트
        setFormData({
          ...formData,
          techStacks: updatedTechStacks,
        });
        setNewStackId(newStackId-1);
        return;
    };
    
    const handleTechStackRemove = (techStackIdToRemove) => {
        const updatedTechStacks = formData.techStacks.filter(
            (techStack) => techStack.id !== techStackIdToRemove
        );
          // 새로운 formData를 생성하고 업데이트
        const updatedFormData = {
            ...formData,
            techStacks: updatedTechStacks,
        };

        setFormData(updatedFormData);
    };

    const handleTechStackSkillLevel = (techStackId, clickedLevel) => {
        // 새로운 객체를 생성하여 상태를 업데이트
        setFormData((prevFormData) => {
            const updatedTechStacks = prevFormData.techStacks.map((techStack) => {
                if (techStack.id === techStackId) {
                    // 클릭된 기술 스택의 스킬 레벨을 업데이트
                    return { ...techStack, skillLevel: clickedLevel };
                }
                return techStack;
            });
    
            return { ...prevFormData, techStacks: updatedTechStacks };
        });
    };

    //기술스택 입력 모달
    const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);
      
    const handleOpenTechStackModal = () => {
        setStackDuplicate(false);
        setIsTechStackModalOpen(true);
    };
      
    const handleCloseTechStackModal = () => {
        if(!stackDuplicate){
            setIsTechStackModalOpen(false);
        }
    };

    //이미지
    const [imageFileChanged, setImageFileChanged] = useState(false);

    const handleImageUpload = async (event) => {
        // presignedurl 발급
        const selectedFile = event.target.files[0];
        if(selectedFile){
            const fileType = selectedFile.type;
            if(fileType.startsWith('image/')){
                const extension = selectedFile.name.split('.').pop();
                setImageFile(selectedFile);

                const usernameAndExtension = formData.basicProfile.profileImage.split("/").pop();

                // 확장자를 제외한 파일 이름
                const username = userInfo.username;

                setFormData((prevData) => ({
                    ...prevData,
                    basicProfile: {
                        ...prevData.basicProfile,
                        profileImage: "https://teamplanner-bucket.s3.ap-northeast-2.amazonaws.com/" + username + "." + extension,
                    },
                }));
                try{
                    const response = await API.get("/api/v1/image/pre-signed-url?extension="+extension+"&purpose=PUT");
                    setPreSignedUrl(response.data.preSignedUrl);
                    setImageFileChanged(true);
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

    useEffect(()=>{
        if(imageFile!=''){
            setImageFileURL(URL.createObjectURL(imageFile));
        }
    },[imageFile]);

    const getPresignedUrl = async () => {
        const extension = imageFile.name.split('.').pop();

        const usernameAndExtension = formData.basicProfile.profileImage.split("/").pop();

        const username = usernameAndExtension.split(".")[0];

        const newProfileImageURL = "https://teamplanner-bucket.s3.ap-northeast-2.amazonaws.com/" + username + "." + extension;

        try {
          const response = await API.get("/api/v1/image/new-pre-signed-url?name=" + username + "&extension=" + extension + "&purpose=PUT");
          const returnedPreSignedUrl = response.data.preSignedUrl;

          // setFormData와 setPreSignedUrl 호출
          setFormData(prevData => ({
            ...prevData,
            profileImage: newProfileImageURL,
          }));

          setPreSignedUrl(returnedPreSignedUrl);

          setSubmitPermit1(true);
        } catch (error) {
            alert("getPresignedUrl error :",error.response.data.message);
        }
    };

    const uploadImageToS3 = () => {
        axios.put(preSignedUrl, imageFile, {
            headers: {
                'Content-Type': imageFile.type
            },
            withCredentials : false
        })
        .then(response =>{
        })
        .catch(error =>{
            alert("이미지가 오류로인해 업로드되지 못했습니다.",error.response);  
        })
    }

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
            "basicProfile": {
                ...prevData["basicProfile"],
                admissionDate: admissionDateString
            },
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
            "basicProfile": {
                ...prevData["basicProfile"],
                graduationDate: graduationDateString
            },
        }));
    };
    
    const handleGraduationDateChange = (field, value) => {
        setGraduationDateData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        
    }; 

    //활동
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(null); // 클릭한 활동의 인덱스

    const handleAddActivity = () => {
        const newActivity = {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            subject: "제목",
            detail: "내용을 입력해주세요.",
            tags: []
        };
    
        setFormData((prevData) => ({
            ...prevData,
            "activities": [...prevData.activities, newActivity],
        }));
    };

    const handleEditActivity = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            activities: prevData.activities.map((activity, i) => {
                if (i === index) {
                    return {
                        ...activity,
                        isEditing: true, // 클릭 시 수정 모드로 변경
                    };
                }
                return activity;
            }),
        }));
    };

    const handleRemoveActivity = (index) => {
        const updatedActivities = [...formData.activities];
        updatedActivities.splice(index, 1);
        setFormData((prevData) =>({
            ...prevData,
            "activities": updatedActivities
        }));
    };

    const handleActivityInputChange = (event, index) => {
        const { id, value } = event.target;
        const keys = id.split('.');
        setFormData((prevData) => ({
            ...prevData,
            activities: prevData.activities.map((activity, i) => {
                if(i===index){
                    return{
                        ...activity,
                        [keys[1]]: value
                    }
                }
                return activity;
            }),
        }));
    };

    //자격증,수상이력
    const [selectedCertificationIndex, setSelectedCertificationIndex] = useState(null); // 클릭한 활동의 인덱스

    const handleAddCertification = () => {
        const newCertification = {
            gainDate: new Date().toISOString().split('T')[0],
            name: "제목",
            score:"100",
            tags: []
        };
    
        setFormData((prevData) => ({
            ...prevData,
            "certifications": [...prevData.certifications, newCertification],
        }));
    };

    const handleEditCertification = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            certifications: prevData.certifications.map((certification, i) => {
                if (i === index) {
                    return {
                        ...certification,
                        isEditing: true, // 클릭 시 수정 모드로 변경
                    };
                }
                return certification;
            }),
        }));
    };

    const handleRemoveCertification = (index) => {
        const updatedCertifications = [...formData.certifications];
        updatedCertifications.splice(index, 1);
        setFormData((prevData) =>({
            ...prevData,
            "certifications": updatedCertifications
        }));
    };

    const handleCertificationInputChange = (event, index) => {
        const { id, value } = event.target;
        const keys = id.split('.');
        setFormData((prevData) => ({
            ...prevData,
            certifications: prevData.certifications.map((certification, i) => {
                if(i===index){
                    return{
                        ...certification,
                        [keys[1]]: value
                    }
                }
                return certification;
            }),
        }));
    };

    //캘린더
    const [calendarDate, setCalendarDate] = useState(new Date());
  
    const [showCalendar, setShowCalendar] = useState(false); // 달력을 표시할지 여부

    const [showMonthCalendar, setShowMonthCalendar] = useState(false);

    const [calendarUsage, setCalendarUsage] = useState();
    
    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줍니다.
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    const handleCalendarChange = (date) => {
        const formattedDate = formatDateToString(date);
        const keys = calendarUsage.split('.');
        let flag = false;
        if (selectedActivityIndex !== null || selectedCertificationIndex !== null) {
            if(selectedActivityIndex !== null){
                const updatedActivities = [...formData.activities];
              
                updatedActivities[selectedActivityIndex] = {
                    ...updatedActivities[selectedActivityIndex],
                    [keys[1]]: formattedDate, // 선택한 날짜로 업데이트
                };
                setFormData((prevData) => ({
                    ...prevData,
                    activities: updatedActivities,
                }));
                setSelectedActivityIndex(null);
                flag = true;
            }

            if (selectedCertificationIndex !== null) {
                const updatedCertifications = [...formData.certifications];
              
                updatedCertifications[selectedCertificationIndex] = {
                    ...updatedCertifications[selectedCertificationIndex],
                    [keys[1]]: formattedDate, // 선택한 날짜로 업데이트
                };
                setFormData((prevData) => ({
                    ...prevData,
                    certifications: updatedCertifications,
                }));
                setSelectedCertificationIndex(null);
                flag = true;
            }
        }
        else{
            setFormData((prevData) => ({
                ...prevData,
                [keys[0]]: {
                    ...prevData[keys[0]],
                    [keys[1]]: formattedDate
                },
            }));
        }
        // 달력 모달 닫기.
        setShowCalendar(false);
        setShowMonthCalendar(false);
    };
      

    //범용
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        const keys = id.split('.');
        setFormData((prevData) => ({
            ...prevData,
            [keys[0]]: {
                ...prevData[keys[0]],
                [keys[1]]: value
            },
        }));
    }; 
    
    const handleRadioInputChange = (key, value) => {
        const keys = key.split('.');
        //true, false string으로 받아지는 문제
        if(value==="true" || value==="false"){

        }
        setFormData((prevData) => ({
            ...prevData,
            [keys[0]]: {
                ...prevData[keys[0]],
                [keys[1]]: value
            },
        }));
      };

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

    const fetchEnum = async () => {
        try {
            const response = await API.get('/api/v1/member/signup/enums');
            setGenders(response.data.gender.map(option => ({ value: option.name, label: option.label })));
            setJobs(response.data.job.map(option => ({ value: option.name, label: option.label })));
            setEducations(response.data.education.map(option => ({ value: option.name, label: option.label })));
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };
    
    const fetchProfile = async () => {
        try {
            const response = await API.get('/api/v1/profile');
            console.log(response);
            setProfileData(prevData => ({
                ...prevData,
                ...response.data
            }));

        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    const fetchTechStacks = async () =>{
        try{
            const response = await API.get('/api/v1/profile/techStacks');
            console.log(response);
            setTechStackData(response.data);
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    //평가
    const [evaluationData,setevaluationData] = useState({
        labels: ['창의성', '리더십', '성실함', '기술력', '커뮤니케이션'],
        datasets: [
          {
            label: '',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 115, 0, 0.2)',
            borderColor: 'rgba(255, 115, 0, 1)',
            borderWidth: 1,
          },
        ],
    });

    const updateEvaluationData = () =>{

        const evaluations = profileData.evaluations;
    
        // 각 stat의 합을 계산
        const totalStats = {
            stat1: 0,
            stat2: 0,
            stat3: 0,
            stat4: 0,
            stat5: 0,
        };

        evaluations.forEach((evaluation) => {
            totalStats.stat1 += evaluation.stat1;
            totalStats.stat2 += evaluation.stat2;
            totalStats.stat3 += evaluation.stat3;
            totalStats.stat4 += evaluation.stat4;
            totalStats.stat5 += evaluation.stat5;
        });

        // 각 stat의 평균 계산
        const avgStats = {
            stat1: totalStats.stat1 / evaluations.length,
            stat2: totalStats.stat2 / evaluations.length,
            stat3: totalStats.stat3 / evaluations.length,
            stat4: totalStats.stat4 / evaluations.length,
            stat5: totalStats.stat5 / evaluations.length,
        };

        // evaluationData 업데이트
        setevaluationData((prevData) => ({
        ...prevData,
        datasets: [
            {
            ...prevData.datasets[0],
            data: [
                avgStats.stat1,
                avgStats.stat2,
                avgStats.stat3,
                avgStats.stat4,
                avgStats.stat5,
            ],
            },
        ],
        }));
    }

    useEffect(()=>{
        updateEvaluationData();
    },[profileData.evaluations]);

    const fetchImage = async () =>{
        if(profileData.basicProfile.profileImage!=''){
            setImageFileURL(profileData.basicProfile.profileImage);
        }
    };

    const handleSubmit = () => {
        setEdit(!edit);

        if(imageFileChanged){
            getPresignedUrl();
        }

        const differences = [];

        //basicProfile
        setFormData2((prevData) => ({
            ...prevData,
            basicProfile: {
              ...formData.basicProfile, // formData.basicProfile의 모든 속성을 포함
              crudType: 'UPDATE' // 새로운 속성 추가
            }
        }));

        //techStacks
        // 1. formData.techStacks를 순회하면서 처리
        while(formData.techStacks.length!==0){
            const formDataTechStack = formData.techStacks[0];
            const matchingProfileTechStack = profileData.techStacks.find((profileTechStack) => profileTechStack.id === formDataTechStack.id);
        
            if (matchingProfileTechStack) {
                if (JSON.stringify(formDataTechStack) !== JSON.stringify(matchingProfileTechStack)) {
                    formDataTechStack.crudType = 'UPDATE';
                    formData2.techStacks.push(formDataTechStack);
                }
                
                // 해당 기술 스택을 formData와 profileData에서 제거
                const formDataIndex = formData.techStacks.findIndex((techStack) => techStack.id === formDataTechStack.id);
                const profileDataIndex = profileData.techStacks.findIndex((techStack) => techStack.id === formDataTechStack.id);

                if (formDataIndex !== -1) {
                    formData.techStacks.splice(formDataIndex, 1);
                }
                if (profileDataIndex !== -1) {
                    profileData.techStacks.splice(profileDataIndex, 1);
                }
            } 
            else {
                formDataTechStack.crudType = 'CREATE';
                formData2.techStacks.push(formDataTechStack);
            
                // 해당 기술 스택을 formData에서 제거
                const formDataIndex = formData.techStacks.findIndex((techStack) => techStack.id === formDataTechStack.id);
                if (formDataIndex !== -1) {
                    formData.techStacks.splice(formDataIndex, 1);
                }
            }
        };
        
        // 2. profileData.techStacks의 모든 요소에 대해서 CRUD 타입을 설정
        profileData.techStacks.forEach((profileTechStack) => {
            formData2.techStacks.push({ id: profileTechStack.id, techStackItem: profileTechStack.techStackItem, crudType: 'DELETE' });
        });

        

        //activities
        while(formData.activities.length!==0){
            const formDataActivity = formData.activities[0];
            const matchingProfileActivity = profileData.activities.find((profileActivity) => profileActivity.id === formDataActivity.id);
        
            if (matchingProfileActivity) {
                if (JSON.stringify(formDataActivity) !== JSON.stringify(matchingProfileActivity)) {
                    formDataActivity.crudType = 'UPDATE';
                    formData2.activities.push(formDataActivity);
                }
                
                const formDataIndex = formData.activities.findIndex((activity) => activity.id === formDataActivity.id);
                const profileDataIndex = profileData.activities.findIndex((activity) => activity.id === formDataActivity.id);

                if (formDataIndex !== -1) {
                    formData.activities.splice(formDataIndex, 1);
                }
                if (profileDataIndex !== -1) {
                    profileData.activities.splice(profileDataIndex, 1);
                }
            } 
            else {
                formDataActivity.crudType = 'CREATE';
                formData2.activities.push(formDataActivity);
            
                const formDataIndex = formData.activities.findIndex((activity) => activity.id === formDataActivity.id);
                if (formDataIndex !== -1) {
                    formData.activities.splice(formDataIndex, 1);
                }
            }
        };

        profileData.activities.forEach((profileActivity) => {
            formData2.activities.push({ id: profileActivity.id, crudType: 'DELETE' });
        });

        //certifications
        while(formData.certifications.length!==0){
            const formDataCertification = formData.certifications[0];
            const matchingProfileCertification = profileData.certifications.find((profileCertification) => profileCertification.id === formDataCertification.id);
        
            if (matchingProfileCertification) {
                if (JSON.stringify(formDataCertification) !== JSON.stringify(matchingProfileCertification)) {
                    formDataCertification.crudType = 'UPDATE';
                    formData2.certifications.push(formDataCertification);
                }
                
                const formDataIndex = formData.certifications.findIndex((certification) => certification.id === formDataCertification.id);
                const profileDataIndex = profileData.certifications.findIndex((certification) => certification.id === formDataCertification.id);

                if (formDataIndex !== -1) {
                    formData.certifications.splice(formDataIndex, 1);
                }
                if (profileDataIndex !== -1) {
                    profileData.certifications.splice(profileDataIndex, 1);
                }
            } 
            else {
                formDataCertification.crudType = 'CREATE';
                formData2.certifications.push(formDataCertification);
            
                const formDataIndex = formData.certifications.findIndex((certification) => certification.id === formDataCertification.id);
                if (formDataIndex !== -1) {
                    formData.certifications.splice(formDataIndex, 1);
                }
            }
        };

        profileData.certifications.forEach((profileCertification) => {
            formData2.certifications.push({ id: profileCertification.id, crudType: 'DELETE' });
        });

        setSubmitPermit2(true);
    };

    const submitFormData2 = () => {
        API.put("/api/v1/profile", formData2)
        .then(response =>{
            console.log(response);
            if(response.status==200){
                alert("프로필 수정이 완료되었습니다.");
                window.location.href = "/mypage/profileSetting";
            }
        })
        .catch(error =>{
            alert('프로필 수정이 실패했습니다:', error);
        })
    };

    useEffect(()=>{
        console.log(formData2);
        if (submitPermit1&&submitPermit2){
            uploadImageToS3();
            submitFormData2();
            updateLocalStorage();
        }
        if (!imageFileChanged&&submitPermit2){
            submitFormData2();
        }
    },[submitPermit1,submitPermit2]);



    useEffect(()=>{
        if(newImageFile!=''){
            setImageFileURL(URL.createObjectURL(newImageFile));
        }
    },[newImageFile]);
    
    // useEffect
    useEffect(() => {
        fetchEnum();
        fetchProfile();
        fetchTechStacks();
    }, []);

    useEffect(() =>{
        fetchImage();
    },[profileData.basicProfile.profileImage]);

    useEffect(()=>{
        updateBirth();
    },[birthData]);

    useEffect(()=>{
        updateAdimssionDate();
    },[admissionDateData]);

    useEffect(()=>{
        updateGraduationDate();
    },[graduationDateData]);
    


    return(
        <>
            <ThemeProvider theme={theme}>
                <Nav />
                <Container>
                    <PaddingWrap>
                        <Title text={"마이페이지"}/>
                        <ContentWrap>
                            <SideList>
                                <MyPageMenu select={"프로필관리"} />
                            </SideList>
                            <Content>
                                {showCalendar && (
                                    <div className="calendar-modal">
                                        <Calendar
                                            onChange={(date) => handleCalendarChange(date)}
                                            value={calendarDate} // 캘린더의 초기 날짜
                                        />
                                    </div>
                                )}
                                <div className="title dp-flex space-between">
                                    <h1>프로필 관리</h1>
                                    {
                                        edit ?
                                        <FilledBtn text={"프로필 수정"} handle={handleEdit}></FilledBtn>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className="profile-box">
                                    <div className="profileImage">
                                        <img src={imageFileURL} alt="프로필 이미지" />
                                        {
                                            edit? <></> :
                                            <div>
                                            <IconButton onClick={handleFileOpen}><AddCircleIcon /></IconButton>
                                            <Modal open={fileOpen} onClose={handleFileClose} aria-labelledby="image-upload-modal" aria-describedby="image-upload-description">
                                                <Paper>
                                                    <div className="modal-header">
                                                        <h2>이미지 업로드</h2>
                                                        <IconButton onClick={handleFileClose}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </div>
                                                    <div className="image-upload-content">
                                                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                                                    </div>
                                                </Paper>
                                            </Modal>
                                            </div>
                                        }
                                        <div className="profile-nickname">
                                            {edit ? <>
                                                <p>{profileData.nickname}</p>
                                            </>:
                                            <p>{formData.nickname}</p>
                                        }
                                    </div>
                                    </div>
                                    {
                                        edit ?
                                        <div className="profileIntro">
                                            <h2>자기소개</h2>
                                            <p>
                                                {profileData.basicProfile.profileIntro}
                                            </p>
                                        </div>
                                        : 
                                        <div className="textarea-box">
                                             <h2>자기소개</h2>
                                             <textarea cols={5} id="basicProfile.profileIntro" value={formData.basicProfile.profileIntro} onChange={handleInputChange} placeholder="자기소개를 입력해주세요!"></textarea>
                                        </div>
                                    }
                                </div>
                                <div className="skill-box">
                                    <h3 className="sub-title">기술스택</h3>
                                    <ul className="skill-list">
                                        {edit ? <>
                                            {profileData.techStacks.map((techStack) => (
                                                <li className="skillWrap" key={techStack.techStackItem.id}>
                                                    <div className="skill-img">
                                                        <img src={techStack.techStackItem.imageUrl} alt={techStack.techStackItem.name} />
                                                    </div>
                                                    <div className="skill-name">
                                                        <span>{techStack.techStackItem.name}</span>
                                                    </div>
                                                    <div className="skill-level">
                                                        <i class={`${techStack.skillLevel >= 1 ? 'active' : ''}` }></i>
                                                        <i class={`${techStack.skillLevel >= 2 ? 'active' : ''}`}></i>
                                                        <i class={`${techStack.skillLevel >= 3 ? 'active' : ''}`}></i>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                        :
                                        <>
                                            {formData.techStacks.map((techStack) => (
                                                <li className="skillWrap" key={techStack.techStackItem.id}>
                                                    <div className="skill-img">
                                                        <img src={techStack.techStackItem.imageUrl} alt={techStack.techStackItem.name} />
                                                        <IconButton onClick={() => handleTechStackRemove(techStack.id)}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </div>
                                                    <div className="skill-name">
                                                        <p>{techStack.techStackItem.name}</p>
                                                    </div>
                                                    <div className="skill-level">
                                                        <i class={`${techStack.skillLevel >= 1 ? 'active' : ''}` } onClick={() => handleTechStackSkillLevel(techStack.id,1)}></i>
                                                        <i class={`${techStack.skillLevel >= 2 ? 'active' : ''}`} onClick={() => handleTechStackSkillLevel(techStack.id,2)}></i>
                                                        <i class={`${techStack.skillLevel >= 3 ? 'active' : ''}`} onClick={() => handleTechStackSkillLevel(techStack.id,3)}></i>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                        }
                                        {
                                            edit ? <></> :
                                            <li className="add-skill">
                                                <IconButton onClick={handleOpenTechStackModal}>
                                                    <AddIcon />
                                                </IconButton>
                                                {isTechStackModalOpen && (
                                                    <TechStackModal
                                                        techStackData={techStackData.techStackItems} // 사용 가능한 기술 목록
                                                        onTechStackSelect={handleTechStackSelect} // 모달에서 기술 선택 시 호출될 콜백 함수
                                                        onClose={handleCloseTechStackModal} // 모달 닫기
                                                    />
                                                )}
                                            </li>
                                        }
                                    </ul>
                                </div>
                                <div className="info-box">
                                    <h3 className="sub-title">기본정보</h3>
                                    <ul className="info-list">
                                        <li className="dp-flex">
                                            <h4>공개범위설정</h4>
                                            <div className="radio-wrap">
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        id="basicProfile.isPublic"
                                                        value={formData.basicProfile.isPublic}
                                                        onChange={(e) => handleRadioInputChange("basicProfile.isPublic", e.target.value)}
                                                    >
                                                        {
                                                            edit ?
                                                            <>
                                                                <FormControlLabel value={0} control={<Radio  />} label="전체공개" checked={profileData.basicProfile.isPublic===0} disabled={profileData.basicProfile.isPublic!=0}/>
                                                                <FormControlLabel value={1} control={<Radio  />} label="팀원공개" checked={profileData.basicProfile.isPublic===1} disabled={profileData.basicProfile.isPublic!=1}/>
                                                                <FormControlLabel value={2} control={<Radio />} label="비공개" checked={profileData.basicProfile.isPublic===2} disabled={profileData.basicProfile.isPublic!=2}/>
                                                            </>
                                                            :
                                                            <div id="basicProfile.isPublic">
                                                                <FormControlLabel id="basicProfile.isPublic" value={0} control={<Radio  />} label="전체공개" checked={formData.basicProfile.isPublic==0}/>
                                                                <FormControlLabel id="basicProfile.isPublic" value={1} control={<Radio  />} label="팀원공개" checked={formData.basicProfile.isPublic==1}/>
                                                                <FormControlLabel id="basicProfile.isPublic" value={2} control={<Radio />} label="비공개" checked={formData.basicProfile.isPublic==2}/>
                                                            </div>
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </li>
                                        <li className="dp-flex">
                                            <h4>성별</h4>
                                            {
                                                edit ?
                                                <p>{genders.find(option => option.value === profileData.basicProfile.gender)?.label ? genders.find(option => option.value === profileData.basicProfile.gender)?.label : "미입력"}</p>
                                                :
                                                <div className="radio-wrap">
                                                    <FormControl>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="gender"
                                                            id="basicProfile.gender"
                                                            value={formData.basicProfile.gender}
                                                            onChange={(e) => handleRadioInputChange("basicProfile.gender", e.target.value)}
                                                        >
                                                        <div id="basicProfile.gender">
                                                            <FormControlLabel id="basicProfile.gender" value="MALE" control={<Radio  />} label="남성" checked={formData.basicProfile.gender==="MALE"}/>
                                                            <FormControlLabel id="basicProfile.gender" value="FEMALE" control={<Radio  />} label="여성" checked={formData.basicProfile.gender==="FEMALE"}/>
                                                        </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>생년월일</h4>
                                            {
                                                edit ?
                                                <p>{profileData.basicProfile.birth ? profileData.basicProfile.birth : "미입력"}</p>:
                                                <h4
                                                    id="basicProfile.birth"
                                                    value={formData.basicProfile.birth} 
                                                    onClick={() => {
                                                        setShowCalendar(true);
                                                        setCalendarUsage("basicProfile.birth");
                                                        setCalendarDate(formData.basicProfile.birth)
                                                    }}
                                                    onChange={handleInputChange}
                                                >
                                                {formData.basicProfile.birth ? formData.basicProfile.birth : "미입력"}
                                                </h4>
                                            }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>직업</h4>
                                                {
                                                    edit ?
                                                    <p>{jobs.find(option => option.value === profileData.basicProfile.job)?.label ? jobs.find(option => option.value === profileData.basicProfile.job)?.label : "미입력"}</p>:
                                                    <div className="input-wrap">
                                                        <Select
                                                            options={jobs}
                                                            value={jobs.find(option => option.value === jobs.jobs)}
                                                            onChange={(selectedOption) => handleInputChange({ target: { id: 'basicProfile.job', value: selectedOption.value } })}
                                                            placeholder={jobs.find(option => option.value === formData.basicProfile.job)?.label}
                                                        />
                                                    </div>
                                                }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>최종학력</h4>
                                                {
                                                    edit ?
                                                    <p>{educations.find(option => option.value === profileData.basicProfile.education)?.label ? educations.find(option => option.value === profileData.basicProfile.education)?.label : "미입력"}</p>:
                                                    <div className="birth-wrap">
                                                        <Select
                                                            options={educations}
                                                            value={educations.find(option => option.value === educations.educations)}
                                                            onChange={(selectedOption) => handleInputChange({ target: { id: 'basicProfile.education', value: selectedOption.value } })}
                                                            placeholder={educations.find(option => option.value === formData.basicProfile.education)?.label}
                                                        />
                                                    </div>
                                                }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>입학날짜</h4>
                                            {
                                                edit ?
                                                <p>{profileData.basicProfile.admissionDate ? profileData.basicProfile.admissionDate : "미입력"}</p>:
                                                <h4
                                                    id="basicProfile.admissionDate" 
                                                    value={formData.basicProfile.admissionDate} 
                                                    onClick={() => {
                                                        setShowCalendar(true);
                                                        setCalendarUsage("basicProfile.admissionDate");
                                                        setCalendarDate(formData.basicProfile.admissionDate)
                                                    }}
                                                    onChange={handleInputChange}
                                                >
                                                {formData.basicProfile.admissionDate ? formData.basicProfile.admissionDate : "미입력"}
                                                </h4>
                                            } 
                                        </li>
                                        <li className="dp-flex">
                                            <h4>졸업날짜</h4>
                                            {
                                                edit ?
                                                <p>{profileData.basicProfile.graduationDate ? profileData.basicProfile.graduationDate : "미입력"}</p>:
                                                <h4
                                                    id="basicProfile.graduationDate"
                                                    value={formData.basicProfile.graduationDate} 
                                                    onClick={() => {
                                                        setShowCalendar(true);
                                                        setCalendarUsage("basicProfile.graduationDate");
                                                        setCalendarDate(formData.basicProfile.graduationDate)
                                                    }}
                                                    onChange={handleInputChange}
                                                >
                                                {formData.basicProfile.graduationDate ? formData.basicProfile.graduationDate : "미입력"}
                                                </h4>
                                            }  
                                        </li>
                                        <li className="dp-flex">
                                            <h4>카카오아이디</h4>
                                                {
                                                    edit ?
                                                    <p>{profileData.basicProfile.kakaoId ? profileData.basicProfile.kakaoId : "미입력"}</p>:
                                                    <div className="input-wrap">
                                                        <TextField id="basicProfile.kakaoId" value={formData.basicProfile.kakaoId} onChange={handleInputChange} variant="outlined" placeholder="ex) teamplanner1234" fullWidth />
                                                    </div>
                                                }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>연락처(이메일)</h4>
                                                {
                                                    edit ?
                                                    <p>{profileData.basicProfile.contactEmail ? profileData.basicProfile.contactEmail : "미입력"}</p>:
                                                    <div className="input-wrap">
                                                        <TextField id="basicProfile.contactEmail" value={formData.basicProfile.contactEmail} onChange={handleInputChange} variant="outlined" placeholder="ex) teamplanner@example.com" fullWidth />
                                                    </div>
                                                }
                                        </li>
                                        <li className="dp-flex">
                                            <h4>거주지</h4>
                                                {
                                                    edit ?
                                                    <p>{profileData.basicProfile.address ? profileData.basicProfile.address : "미입력"}</p>:
                                                    <div className="input-wrap">
                                                        <TextField id="basicProfile.address" value={formData.basicProfile.address} onChange={handleInputChange} variant="outlined" placeholder="ex) 서울시 관악구" fullWidth />
                                                    </div>
                                                }
                                        </li>
                                    </ul>
                                </div>

                                <div className="history-box">
                                    <h3 className="sub-title">수상이력 및 활동내역</h3>
                                    <div className="dp-flex space-between add-title">
                                        <h4>완료활동</h4>
                                        {
                                            edit ? <></>
                                            :
                                            <Button onClick={handleAddActivity}>
                                                추가하기<AddIcon />
                                            </Button>
                                        }
                                    </div>

                                    <ul className="activity-box">
                                        {edit ? (
                                            <>
                                                {profileData.activities.map((activity, index) => (
                                                    <li key={index}>
                                                        <span>{activity.startDate} ~ {activity.endDate}</span>
                                                        <h4>{activity.subject}</h4>
                                                        <p>{activity.detail}</p>
                                                    </li>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {formData.activities.map((activity, index) => (
                                                    <li key={index}>
                                                        <span 
                                                            id={`activities[${index}].startDate`} 
                                                            value={activity.startDate} 
                                                            onClick={() => {
                                                                setShowCalendar(true);
                                                                setSelectedActivityIndex(index);
                                                                setCalendarUsage(`activities[${index}].startDate`);
                                                                setCalendarDate(formData.activities[index].startDate)
                                                            }}
                                                        >
                                                        {activity.startDate}
                                                        </span>
                                                        {" ~ "}
                                                        <span 
                                                            id={`activities[${index}].endDate`} 
                                                            value={activity.endDate} 
                                                            onClick={() => {
                                                                setShowCalendar(true);
                                                                setSelectedActivityIndex(index);
                                                                setCalendarUsage(`activities[${index}].endDate`);
                                                                setCalendarDate(formData.activities[index].endDate)
                                                            }}
                                                        >
                                                        {activity.endDate}
                                                        </span>
                                                        <h4 onClick={() => handleEditActivity(index)}>
                                                            {activity.isEditing ? (
                                                                <input id={`activities[${index}].subject`} value={activity.subject} onChange={(e) => handleActivityInputChange(e, index)}></input>
                                                            ) : (
                                                                activity.subject
                                                            )}
                                                        </h4>
                                                        <p onClick={() => handleEditActivity(index)}>
                                                            {activity.isEditing ? (
                                                                <input id={`activities[${index}].detail`} value={activity.detail} onChange={(e) => handleActivityInputChange(e, index)}></input>
                                                            ) : (
                                                                activity.detail
                                                            )}
                                                        </p>
                                                        <IconButton onClick={() => handleRemoveActivity(index)}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </li>
                                                ))}
                                                </>
                                        )}
                                    </ul>


                                    <div className="dp-flex space-between add-title">
                                        <h4>자격증/수상이력</h4>
                                        {
                                            edit ? <></>
                                            :
                                            <Button onClick={handleAddCertification}>
                                                추가하기<AddIcon />
                                            </Button>
                                        }
                                    </div>
                                    <ul className="certificate-box">
                                        {edit ? (
                                            <>
                                            {profileData.certifications.map((certification, index) => (
                                                <li key={index}>
                                                    <span>{certification.gainDate}</span>
                                                    <h4>{certification.name}</h4>
                                                </li>
                                            ))}
                                        </>                                            
                                        ) : (
                                            <>
                                                {formData.certifications.map((certification, index) => (
                                                    <li key={index}>
                                                        <li key={index}>
                                                            <span
                                                                id={`certifications[${index}].gainDate`} 
                                                                value={certification.gainDate} 
                                                                onClick={() => {
                                                                    setShowCalendar(true);
                                                                    setSelectedCertificationIndex(index);
                                                                    setCalendarUsage(`certifications[${index}].gainDate`);
                                                                    setCalendarDate(formData.certifications[index].gainDate)
                                                                }}
                                                                onChange={(e) => handleCertificationInputChange(e, index)}
                                                            >
                                                            {certification.gainDate}
                                                            </span>
                                                            <h4 onClick={() => handleEditCertification(index)}>
                                                                {certification.isEditing ? (
                                                                    <input id={`certifications[${index}].name`} value={certification.name} onChange={(e) => handleCertificationInputChange(e, index)}></input>
                                                                ) : (
                                                                    certification.name
                                                                )}
                                                            </h4>
                                                        </li>
                                                        <IconButton onClick={() => handleRemoveCertification(index)}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div className="review-box">
                                    <h3 className="sub-title">팀원평가</h3>
                                    <div className="check-box">
                                        <h4>공개범위설정</h4>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                id="basicProfile.evaluationPublic"
                                                value={formData.basicProfile.evaluationPublic}
                                                onChange={(e) => handleRadioInputChange("basicProfile.evaluationPublic", e.target.value)}
                                            >
                                                {
                                                    edit ?
                                                    <>
                                                    <FormControlLabel value={true} control={<Radio  />} label="공개" checked={profileData.basicProfile.evaluationPublic==true} disabled={profileData.basicProfile.evaluationPublic!=true}/>
                                                    <FormControlLabel value={false} control={<Radio  />} label="비공개" checked={profileData.basicProfile.evaluationPublic==false} disabled={profileData.basicProfile.evaluationPublic!=false}/>
                                                    </>
                                                    :
                                                    <>
                                                    <FormControlLabel value={true} control={<Radio  />} label="공개" checked={formData.basicProfile.evaluationPublic===true || formData.basicProfile.evaluationPublic==='true'}/>
                                                    <FormControlLabel value={false} control={<Radio  />} label="비공개" checked={formData.basicProfile.evaluationPublic===false || formData.basicProfile.evaluationPublic=='false'}/>
                                                    </>
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="review-wrap">
                                        {
                                            edit ? (
                                                <div className="chart-box">
                                                    <Radar
                                                    data={evaluationData}
                                                    options={options}
                                                    />
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                        {
                                            edit ? (
                                                <div className="review-list">
                                                    {profileData.evaluations.map((evaluation, index) => (
                                                        <h3 key={index}>{evaluation.comment}</h3>
                                                    ))}
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </div>
                                </div>
                            </Content>
                        </ContentWrap>
                            {
                                edit ? <></> :
                                <SaveBtn>
                                    <FilledBtn text={"저장하기"} handle={handleSubmit}></FilledBtn>
                                </SaveBtn>
                            }
                    </PaddingWrap>
                </Container>
                <Footer />
                {/* *채팅버튼 추가
                <ChatBox /> */}
            </ThemeProvider>
        </>
    )
}

const Container = styled(Box)`
    width: 100%;
    @media ${() => theme.device.tablet} {
       height: auto;
    }
`;

const PaddingWrap = styled(Box)`
    padding: 13rem 15% 0 15%;   
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .space-between{
        justify-content: space-between;
    }
    @media ${() => theme.device.tablet} {
       padding : 16rem 5% 0 5% ;
    }
`;

export const ContentWrap = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }

`;

const SideList = styled(Box)`
    width: 18%;
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
`;

export const Content = styled(Box)`
    width: 80%;
    .title{
        margin-bottom: 5rem;
        margin-top: 1rem;
        h1{
            font-size: 2rem;
            color: #3b3b3b;
            font-weight: bold;
            line-height: 150%;
        }
        /*수정 */
        button{
            width: 15%;
            /* padding: 5px 0; */
        }
    }
    .sub-title{
        font-size: 1.8rem;
        color: #3b3b3b;
        line-height: 150%;
        font-weight: 600;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 2rem;
    }
    .profile-box{
        display: flex;
        margin-bottom: 5rem;
        .profileImage{
            width: 25%;
            display: flex;
            flex-direction: column; 
            align-items: center;
            justify-content: center;
            position: relative;
            .profile-nickname{
                justify-content: center;
                font-size: 2rem;
                flex-direction: row;
                color: #3b3b3b;
                line-height: 1.6rem;
                margin-top: 1rem;
                margin-bottom: 2.3rem;
                font-weight: 700;
                align-items : center;
                position: relative;
            }
            img{
                width: 60%;
                border-radius: 100%;
            }
            button{
                position: absolute;
                bottom: 5rem;
                right: 4rem;
                background-color: #fff;
                padding: .5rem;
                svg{
                    width: 3rem;
                    height: 3rem;
                    color: #3b3b3b;
                }
            }
        }
        h2{
            font-size: 1.8rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: bold;
        }
        .textarea-box{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 75%;
            textarea{
                width: 98%;
                height: 9rem;
                margin-top: 1rem;
                border-color: rgba(0,0,0,.2);
                border-radius: 4px;
                padding: 1rem;
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
            }
        }
        .profileIntro{
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 10px;
            padding: 2rem;
            width: 75%;
            min-height: 10rem;
            p{
                font-size: 1.6rem;
                line-height: 150%;
                color: #3b3b3b;
                margin-top: 1rem;
            }
        }
    }
    .skill-box{
        margin-bottom: 5rem;
        .skill-list{
            display: flex;
            align-items: center;
            .skillWrap{
                .skill-img{
                    border-radius: 100px;
                    border: 1px solid rgba(0,0,0,.1);
                    width: 7rem;
                    height: 7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    background-color: #fff;
                    box-shadow: 0 0 5px 2px rgba(0,0,0,.03);
                    position: relative;
                    img {
                        max-width: 70%;
                        max-height: 70%;
                    }
                    button{
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: #fff;
                        padding: 0;
                        svg{
                            width: 2.5rem;
                            height: 2.5rem;
                            color: #F30C0C;
                        }
                    }
                }
                .skill-name {
                    color: #000000;
                    font-size : 1.5rem;
                    text-align: center;
                    margin-right: 1rem;
                    margin-top: 1rem;
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    font-style: italic; 
                }
                .skill-level {
                    width: 6rem; /* 세 개의 별을 담을 크기 */
                    height: 2rem;
                    display: flex;
                    margin-top: 1rem;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                    i {
                        width: 1.8rem; 
                        height: 1.7rem;
                        margin-right: 0.3rem;
                        background-image: url('/img/icon/star2.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center; 
                    }
                    i.active {
                        background-image: url('/img/icon/star1.png');
                    }
                }
            }
            .add-skill{
                button{
                    background-color: transparent;
                    border: 1px solid #FF7300;
                    border-style: dashed;
                    width: 7rem;
                    height: 7rem;
                    svg{
                        width: 3rem;
                        height: 3rem;
                        color: #FF7300;
                    }
                    margin-bottom : 5rem;
                }
            }
        }
    }
    .info-list{
        margin-bottom: 5rem;
        li{
            margin-bottom: 1rem;
            h4{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                width: 15rem;
            }
            p{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 400;
            }
            .radio-wrap{
                span{
                    font-size: 1.6rem;
                }
                input{
                }
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
        }
    }
    .history-box{
        h4{
            font-size: 1.6rem;
            color: #3b3b3b;
            line-height: 150%;
            font-weight: 500;
        }
        .add-title{
            margin-bottom: 1rem;
            button{
                font-size: 1.6rem;
                font-weight: bold;
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        .activity-box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            li{
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 4px;
                width: 45%;
                padding: 2rem;
                position: relative;
                span{
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.4);
                    line-height: 150%;
                    font-weight: 600;
                }
                p{
                    font-size: 1.4rem;
                    color: #3b3b3b;
                    line-height: 150%;
                }
                h4{
                    font-weight: bold;
                    margin: 0;
                    margin-bottom: .5rem;
                }
                .tag-wrap{
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    h5{
                        font-size: 1.2re;
                        color: #3b3b3b;
                        background-color: #EFEFEF;
                        padding: .5rem;
                        margin-right: 1rem;
                        border-radius: 2px;
                    }
                    h5:last-of-type{
                        margin: 0;
                    }
                }
                button{
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    background-color: #fff;
                    padding: 0;
                    svg{
                        width: 2.5rem;
                        height: 2.5rem;
                        color: #F30C0C;
                    }
                }
            }
        }
        .certificate-box{
            margin-bottom: 5rem;
            li{
                display: flex;
                align-items: center;
                width: 100%;
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 10px;
                background-color: #fff;
                margin-bottom: 1rem;
                position: relative;
                h4{
                    margin: 0;
                }
                span{
                    padding: 2rem;
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.6);
                    line-height: 150%;
                    margin-right: 1rem;
                }
                button{
                    position: absolute;
                    top: 50%;
                    right: 1rem;
                    transform: translate(-50%,-50%);
                    background-color: #fff;
                    padding: 0;
                    svg{
                        width: 2.5rem;
                        height: 2.5rem;
                        color: #F30C0C;
                    }
                }
            }
            li:last-of-type{
                margin: 0;
            }
        }
    }
    .review-box{
        .check-box{
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            h4{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                width: 15rem;
            }
            span{
                    font-size: 1.6rem;
                }
        }
        .review-wrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .blur-background {
                position: relative;
                background-color: rgba(0, 0, 0, 0.5); /* 검정 반투명 바탕 */
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                filter: blur(5px); /* 블러 처리 */
            }
            .message {
                color: white; /* 흰색 글자 */
                font-size: 24px; /* 원하는 폰트 크기 */
                text-align: center;
            }
        }
        .chart-box{
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .review-list{
            width: 55%;
            height: 30rem;
            overflow-y: scroll;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 4px;
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0,0,0,.1);
                background-color: #fff;
            }
            h3:hover{
                background-color: #FFEFE1;
            }
        }
        .review-list-modal{
            width: 100%;
            height: 30rem;
            overflow-y: scroll;
            border: 1px solid rgba(0,0,0,.1);
            border-radius: 4px;
            h3{
                font-size: 1.6rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: 500;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(0,0,0,.1);
                background-color: #fff;
            }
            h3:hover{
                background-color: #FFEFE1;
            }
        }
    }
    .calendar-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 20px;
        max-width: 400px;
    }
    @media ${() => theme.device.desktop} {
        width: 100%;
    }
    @media ${() => theme.device.tablet}{
        .profile-box{
            .textarea-box{
                width: 100%;
                textarea{
                    width: 95%;
                }
            }
        }
        .history-box{
            .activity-box{
            li{
                width: 44%;
            }
        }
    }
    @media ${() => theme.device.mobile}{
       .title{
        button{
            width: 20%;
        }
       }
    }
    @media ${() => theme.device.mobile2}{
        .title{
        button{
            width: 30%;
        }
       }
       .profile-box{
        flex-direction: column;
        .profileImage{
            width: 70%;
        }
        .profileIntro{
            margin-top: 2rem;
            width: 90%;
        }
        .textarea-box{
            textarea{
                width: 93%;
            }
        }
       }
       .skill-box{
        .skill-list{
            .skill{
                width: 5rem;
                height: 5rem;
                img{
                    width: 50%;
                }
                button{
                    right: -10px;
                }
            }
            .add-skill{
                button{
                    width: 5rem;
                    height: 5rem;
                }
            }
        }
       }
       .history-box{
        .activity-box{
            li{
                width: 100%;
                margin-bottom: 1rem;
            }
            li:last-of-type{
                margin: 0;
            }
        }
        .certificate-box {
            li{
                flex-direction: column;
                align-items: flex-start;
                padding: 2rem 0;
                span{
                    padding: 0 2rem;
                }
                h4{
                    padding: 0 5rem 0 2rem;
                }
            }
        }
    }
    .review-box{
        .review-list{
            width: 100%;
        }
        .review-wrap{
            flex-direction : column;
        }
        .chart-box{
            width: 80%;
            margin: 3rem 0;
        }
    }
}
}
`;

const StyledTextField = styled(TextField)`
    width: 50%;
    input{
        font-size: 1.4rem;
    }
    @media ${() => theme.device.mobile}{
       width: 80%;
    }
`;

const SaveBtn = styled(Box)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    margin-top: 5rem;
    button{
        width: 15%;
    }
    @media ${() => theme.device.mobile}{
        button{
            width: 100%;
        }
    }
`;