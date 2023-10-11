import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "../../style/theme";
import {createTheme,Divider,Icon,ThemeProvider} from '@mui/material';

import { Box, IconButton,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { API } from "../../api/api";
export default function Notice(){


    const[notificationList,setNotificationList]=useState([]);
    useEffect(() => {
        // localStorage에서 userInfo 가져오기
        const userInfo = localStorage.getItem('userInfo');
      
        // userInfo가 존재하는 경우에만 API 호출
        if (userInfo) {
          API.get(`/api/v1/notifications`)
            .then((res) => {  
              setNotificationList(res.data);
              const notificationCount = res.data.length;
              localStorage.setItem('notificationCount', notificationCount.toString());
            })
            .catch((error) => {
              alert(error);
            });
        }
      }, []);



        // 공지사항을 날짜별로 그룹화하고 최신순으로 정렬하는 함수
    const groupAndSortNotifications = (notifications) => {
        // 날짜별로 그룹화
        const groupedNotifications = {};
        notifications.forEach((notification) => {
            const dateKey = notification.createdDate.split('T')[0]; // 날짜 부분만 사용
            if (!groupedNotifications[dateKey]) {
                groupedNotifications[dateKey] = [];
            }
            groupedNotifications[dateKey].push(notification);
        });

        // 날짜로 정렬된 배열 생성 (최신순으로)
        const sortedDates = Object.keys(groupedNotifications).sort((a, b) => {
            // 날짜를 비교하는 비교 함수
            return new Date(b) - new Date(a);
        });

        const sortedNotifications = sortedDates.map((dateKey) => ({
            date: dateKey,
            notifications: groupedNotifications[dateKey],
        }));

        return sortedNotifications;
    };

    const sortedNotifications = groupAndSortNotifications(notificationList);


    return(
        <>
        <ThemeProvider theme={theme}>
            <NotificationMenu >
                <div className="wrap">
                {sortedNotifications.map((group) => (
                <div key={group.date}>
                <ul className="notification-list">
                <h3>{group.date}</h3>
                    {group.notifications.map((notification) => (
                    <li key={notification.content}>
                    {/* 공지사항 내용을 링크로 표시 */}
                      <div className="img-box">
                      <a href="/mypage/teamManagement">
                        <img src={notification.recruitmentProfileImage} alt="이미지" />
                    </a>
                      </div>
                      <div className="text-box">
                      <a href="/mypage/teamManagement">
                        <h4>
                          {notification.content}<br/>
                        </h4>
                    </a>
                        <p>{notification.createdDate}</p>
                      </div>
                      
                    
                  </li>
                    ))}
                </ul>
                </div>
            ))}
                
                {/* <ul className="notification-list">
                    <h3>7월 13일 (목)</h3>
                    <Divider />
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                    <li>
                        <div className="img-box">
                            <img src="/img/team/sample.png"></img>
                        </div>
                        <div className="text-box">
                            <h4>~~~님께서 <br/>
                            ~~공고에 참여신청을 하셨습니다.</h4>
                            <p>오전 10시 52분</p>
                        </div>
                    </li>
                </ul> */}
                </div>
            </NotificationMenu>
        </ThemeProvider>
        </>
    )   
}

const NotificationMenu = styled(Box)`
    position: absolute;
    top: 8rem;
    right: 5%;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.05);
    z-index: 99;
    &>div{
        width: 45rem;
        height: 50rem;
        max-height: 50rem;
        overflow-y: scroll;
        padding: 2rem 0;
        border-radius: 1rem;
    }
    .close_btn{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 1rem 2rem 0 2rem;
        button{
            padding: 0;
            svg{
                width: 2rem;
                height: 2rem;
            }
        }
    }
    .notification-list{
        h3{
            font-size: 2rem;
            color: #3b3b3b;
            font-weight: bold;
            padding: 0 2rem 2rem 2rem;
        }
        li{
            background-color: #fff;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .img-box{
                width: 24%;
                img{
                    width: 100%;
                    border-radius: 4px;
                }
            }
            .text-box{
                width: 70%;
                h4{
                    font-size: 1.6rem;
                    color: #3b3b3b;
                    line-height: 150%;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                p{
                    font-size: 1.4rem;
                    color: rgba(0,0,0,.6);
                    line-height: 150%;
                }
            }
        }
        li:hover{
            background-color: #FFF1E5;
        }
    }
    @media ${() => theme.device.mobile} {
        right: 0;
        top: 5rem;
        &>div{
            width: 100%;
        }
    }
`;
