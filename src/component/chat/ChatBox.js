import React, { useState } from "react";
import { useContext, useEffect, useRef} from "react";
import styled from "@emotion/styled";
import {createTheme,IconButton,ThemeProvider} from '@mui/material';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SmsIcon from '@mui/icons-material/Sms';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MsgListBox from "./MsgListBox";
import Chating, { ChatingList, ChatingWrap } from "./Chating";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import theme from "../../style/theme";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { API } from "../../api/api";
import { AuthContext } from "../../AuthContext";
import { API_BASE_URL } from "../../common/constant/constant";

export default function ChatBox({handleClick, open}){
    
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

    const [activeIndex, setActiveIndex]=useState(null);
    const tabClickHandler=(index, roomId)=>{
        setActiveIndex(index);
        setRoomId(roomId);
        setOpen2(!open2);
    };


    

    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(!open2);
    };
 
    /*채팅에 관련된 변수 셋팅*/

    const [chatList, setChatList] = useState([]);
    const [targetNickname, setTargetNickname] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [message, setMessage] = useState("asdf")
    const [chatRoomList, setChatRoomList] = useState([]);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const info = JSON.parse(localStorage.getItem("userInfo"));
    const [initialChatList, setInitialChatList] = useState([]);
    const [subscribeState,setSubscribeState]=useState(false);
    const client = useRef(null); // Use a ref to hold the client instance
    const [tmp, setTmp] = useState([]);
    const [readCountNotification,setReadCountNotification]=useState(false);


    function onConnected() {
        console.log("onConnected")
      }
    
      function onError() {
        alert("채팅 에러!!.. 소켓 재연결 시도")
        connectToWebSocket(() => {
            subscribeSocket();
        });
        console.log("onError")
    }



   // 함수로 소켓 연결 설정과 정리를 분리
   const connectToWebSocket = (onConnectedCallback) => {
    // Clean up existing subscriptions
    if (client && client.connected) {
        // If connected, just execute the callback and return
        onConnectedCallback(roomId);
        return;
    }
    // Set up a new socket connection
    let socket = new SockJS(API_BASE_URL + '/ws/chat');
    let headers = {};
    const cookies = document.cookie.split(";");

    let accessToken = null;

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "accessToken") {
            accessToken = value;
            break;
        }
    }

    headers = {
        Authorization: `Bearer ${accessToken}`, // Replace with your JWT token
        chatRoomNo: `${roomId}`, // Change this to the appropriate chatRoomNo
    };

    if(roomId){
        client.current = Stomp.over(socket);
        client.current.connect(headers, () => {
            onConnectedCallback(roomId); // 소켓 연결 완료 후 콜백 실행
        }, onError);

    }
        

    return () => {
        // Clean up subscriptions when the component unmounts
        if (client.current) {
            client.current.disconnect();

            disconnectChatRoom(roomId);
        }
    };
};


    const disconnectChatRoom = (roomId) => {
        // Parse roomId as an integer
        roomId = parseInt(roomId);
        
        API.post(`/api/v1/chat/chatroom/${roomId}`)
          .then((res) => {
            setRoomId("");
            setActiveIndex(null);
            console.log("disconnet Chat room API Response", res.data);
          })
          .catch((error) => {
            console.error("API Error", error);
          });
      };

    // // 소켓 연결 설정 및 정리
    // useEffect(() => {
    //     // Clean up existing subscriptions
    //     if (client.current) {
    //         client.current.disconnect();
    //     }
    
    //     // Set up a new socket connection
    //     let socket = new SockJS(API_BASE_URL+'/ws/chat');
    //     let headers={};
    //     const cookies = document.cookie.split(";");

    //                 let accessToken = null;

    //                 for (const cookie of cookies) {
    //                     const [name, value] = cookie.trim().split("=");
    //                     if (name === "accessToken") {
    //                         accessToken = value;
    //                     break;
    //                     }
    //                 }

 
    //         headers = {
    //             Authorization: `Bearer ${accessToken}`, // Replace with your JWT token
    //             chatRoomNo: 10
    //         };
      
        

    //     client.current = Stomp.over(socket);
    //     client.current.connect(headers, onConnected, onError);
    
    //     return () => {
    //         // Clean up subscriptions when the component unmounts
    //         if (client.current) {
    //             client.current.disconnect();
    //         }
    //     };
    // }, []); // Make sure to include roomId as a dependency
    /*
    * 채팅방을 가져오는 api 
    */
    const fetchChatRoomList = () => {

        if (roomId) {
            API.get(`/api/v1/chat/room/${roomId}`)
                .then(res => {
                    console.log("하나의 채팅방에 있는 멤버와 채팅내용 가져와", res.data);
                    
                    // 여기에서 채팅방 정보를 성공적으로 가져왔으므로
                    // 소켓을 구독할 수 있습니다.
                   
                    connectToWebSocket(() => {
                        subscribeSocket();
                    });
                    setChatList(res.data.chattings);
                    
                   
                })
                .catch(error => {
                    console.error("채팅방 정보를 가져오는 데 실패했습니다:", error);
                });
        }
    }
    //* 현재 생성되어 있는 채팅방 번호를 가져오는 코드*/

    const fetchChatRoomNumberList = () => {
    
        API.get(`/api/v1/chat/room`)
        .then(res => {
            console.log("채팅방 리스트",res.data)
            setChatRoomList(res.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }

    // 구독한 토픽에 대한 message를 response하고 chatList에 담는다.
    const onMessageReceived = (message) => {
        console.log("구독 한 메세지를 받는중...");
        // console.log('message', message)
        // console.log('message', message.body)
        let newChat = JSON.parse(message.body);
        // console.log("구독해서 받은 meesage", newChat);
        
        if(!newChat.content){
            console.log("상대방이 내 채팅방에 입장했어요!!",newChat)
            API.get(`/api/v1/chat/room/${roomId}`)
                .then(res => {
                    console.log("하나의 채팅방에 있는 멤버와 채팅내용 가져와", res.data);
                    setChatList(res.data.chattings);
                    
                   
                })
                .catch(error => {
                    console.error("채팅방 정보를 가져오는 데 실패했습니다:", error);
                });
        }
        else{
            console.log("구독하신 topic 에서 새로운 채팅이 전달되었어요!",newChat)
            setChatList((prevChatList) => {
                return [...prevChatList, newChat]; // 기존 채팅 리스트에 추가
                
            });
        }
        
        //해당 메세지를 제대로 받았으면 count 값 -=1
        // if(newChat.readCount>0){
        //     API.get(`/api/v1/chat/${newChat.id}`)
        //     .then(res => {
        //     newChat.readCount = res.data.readCount;
        //     console.log(newChat.readCount);
        //     console.log("구독 성공 readcount 한개취소");
        //     setChatList((prevChatList) => {
        //         return [...prevChatList, newChat]; // 기존 채팅 리스트에 추가
                
        //     });
            
        // }).catch(err => {
        //     alert(err.response.data.message);
        // })
        // }
    };

    const tabContArr=[];

    let img="";
    let nickname="";
    if(localStorage.getItem("img") && localStorage.getItem("targetNickname")){
        img=localStorage.getItem("img");
        nickname=localStorage.getItem("targetNickname");

        
        if(img && nickname){

            const memberList = [
                {
                  nickname: userInfo.nickname,
                  profileImage: userInfo.profileImg,
                }
              ];
              
              const newMemberList = {
                nickname: nickname,
                profileImage: img,
              };
              
            memberList.push(newMemberList);

            // 현재 날짜를 가져옵니다.
            const currentDate = new Date();

            // 년, 월, 일을 추출합니다.
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
            const day = currentDate.getDate();

            // 결과를 원하는 형식으로 표시합니다.
            const result = `${year}.${month}.${day}.`;
              

            const newItem = {
                lastMessageText: "",
                lastMessageTime: result,
                memberList: memberList,
                roomId: "",
            };
    
            chatRoomList.push(newItem);
            localStorage.removeItem("img");
            localStorage.removeItem("targetNickname");
        }
    }

    

    chatRoomList.map((item, key) => {
        if(userInfo){
            tabContArr.push(
                {
                    tabTitle:(
                        <div className={activeIndex !== null && activeIndex === key ? "is-active" : ""} onClick={()=>tabClickHandler(key, item.roomId)}>
                            <MsgListBox 
                            id={item.roomId} 
                            none={true} 
                            user={userInfo.nickname === item.memberList[0].nickname ? item.memberList[1].nickname : item.memberList[0].nickname}
                            lastMessageText={item.lastMessageText}
                            lastMessageTime={item.lastMessageTime}
                            profileImage={userInfo.nickname === item.memberList[0].nickname ? item.memberList[1].profileImage : item.memberList[0].profileImage}
                            />
                        </div>
                    ),
                    tabCont:(
                        <Chating
                        handle={handleClick} 
                        handle2={disconnectChatRoom} 
                        chatList={chatList}
                        user={userInfo.nickname  === item.memberList[0].nickname ? item.memberList[1].nickname : item.memberList[0].nickname}
                        memberId={userInfo.memberId}
                        chattingRoomId={roomId}
                        setRoomId={setRoomId}
                        />
                    )
                }
            )
        }
    })


    useEffect(() => {
        fetchChatRoomNumberList();
    }, [chatList])  


    // 이전 채팅방 ID를 기억하는 변수를 추가합니다.
    let previousRoomId = null;


    

    // useEffect(() => {
    //     // 현재 채팅방이 있는 경우에만 구독을 시도합니다.
    //     let sameCheck = false;
    //     if (roomId !== null) {
    //         if (previousRoomId !== null) {
    //             client.current.unsubscribe(`/sub/chattings/rooms/${previousRoomId}`);
    //         }
    //         // 현재 채팅방에 대한 구독을 설정합니다.
    //         if (tmp) {
    //             tmp.map((item) => {
    //                 if (item.roomId === roomId) {
    //                     sameCheck = true;
    //                     console.log(tmp);
    //                     return false;
    //                 }
    //             })
    //         }
    
    //         if (!sameCheck) {
    //             // 구독 시도하기 전에 fetchChatRoomList()를 호출합니다.
    //             fetchChatRoomList()
    //                 .then(() => {
    //                     let socket = client.current.subscribe(`/sub/chattings/rooms/${roomId}`, onMessageReceived);
    //                     if (socket) {
    //                         setTmp((tmp) => [...tmp, {roomId: roomId, socket: socket.id}])
    //                     }
    //                     // 이전 채팅방 ID를 업데이트합니다.
    //                     previousRoomId = roomId;
    //                 })
    //                 .catch((error) => {
    //                     console.error("fetchChatRoomList() 에러:", error);
    //                 });
    //         }
    //     }
    // }, [roomId]);
    
    
    
    const subscribeSocket = () => {
        
        if (roomId) {
            let sameCheck = false;
            if (previousRoomId !== null) {
                client.current.unsubscribe(`/sub/chattings/rooms/${previousRoomId}`);
            }
            // 현재 채팅방에 대한 구독을 설정합니다.
            if (tmp) {
                tmp.map((item) => {
                    if (item.roomId === roomId) {
                        sameCheck = true;
                        return false;
                    }
                })
            }

            if (!sameCheck) {
                console.log("구독하는 중 ...");
                let socket = client.current.subscribe(`/sub/chattings/rooms/${roomId}`, onMessageReceived);
                if (socket) {
                    setTmp((tmp) => [...tmp, { roomId: roomId, socket: socket.id }])
                }
                // 이전 채팅방 ID를 업데이트합니다.
                previousRoomId = roomId;
            }
        }
    }
    
    useEffect(() => {
        // 현재 채팅방이 있는 경우에만 fetchChatRoomList()를 호출합니다.
        if (roomId !== null) {
            fetchChatRoomList();
        }

        const handleBeforeUnload = () => {
            // Check if a chat room is active (roomId is not null)
            if (roomId !== null) {
              // Disconnect the chat room
              disconnectChatRoom(roomId);
            }
          };
      
          window.addEventListener("beforeunload", handleBeforeUnload);
      
          return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener("beforeunload", handleBeforeUnload);
          };
    }, [roomId]);
    

    return(
        <>
       <ThemeProvider theme={theme}>
            <ChatBoxWrap>
                <div className="chat-wrap">
                    <ChatBtn variant="contained" onClick={handleClick}><SmsIcon/></ChatBtn>
                    {
                        open ? 
                        <Chat>
                            <div className="chat-list">
                                <PC>
                                    <div className="title">
                                        <h2>대화목록</h2>
                                        <IconButton><MapsUgcIcon/></IconButton>
                                    </div>
                                    <MsgList>
                                        {tabContArr.length > 0 && tabContArr.map((section, index)=>{
                                            return section.tabTitle
                                        })}
                                    </MsgList>
                                </PC>
                                <Mobile>
                                    {
                                    open2 ? 
                                    <MsgList>
                                        {tabContArr.length > 0 && tabContArr.map((section, index)=>{
                                            return section.tabTitle
                                        })}
                                    </MsgList>
                                    : <></>
                                    }
                                </Mobile>
                            </div>
                            <ChatingBox>
                                {activeIndex === null && 
                                    <>
                                        <ChatingWrap>
                                            <ul className="user-title">
                                                <li>
                                                <Mobile>
                                                    <IconButton><MenuIcon onClick={handleClick2}/></IconButton>
                                                </Mobile>
                                                </li>
                                                <li>
                                                    <IconButton><CloseIcon onClick={handleClick}/></IconButton>
                                                </li>
                                            </ul>
                                        </ChatingWrap>
                                        <ChatingList>
                                            <div>
                                                대화를 나누고 싶은 상대와 메시지를 주고받을 수 있어요.
                                                지금 바로 시작해 보세요!
                                            </div>
                                        </ChatingList>
                                    </>
                                }
                                {activeIndex !== null && tabContArr.length > 0 && tabContArr[activeIndex].tabCont}
                            </ChatingBox>
                            {!tabContArr.length > 0 &&  
                                <IconButton onClick={handleClick} style={{ width: '5%' , height: '10%' }}>
                                    <CloseIcon/>
                                </IconButton>}
                        </Chat>
                        : <></>
                    }
                </div>
            </ChatBoxWrap>
       </ThemeProvider>
        </>
    )
}


const PC = styled(Box)`
    @media ${() => theme.device.mobile} {
        display: none;
    }
`;
const Mobile = styled(Box)`
    display: none;
    @media ${() => theme.device.mobile} {
        display: block;
    }
`;


const ChatBoxWrap = styled(Box)`
    position: fixed;
    bottom: 2%;
    right: 2%;
    z-index: 999;
    .chat-wrap{
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    @media ${() => theme.device.tablet} {
        width: 100%;
        right: 0;
    }
    @media ${() => theme.device.mobile} {
        z-index: 99;
        bottom: 0;
    }

`;

const ChatBtn = styled(Button)`
    padding: 2rem;
    border-radius: 100px;
    svg{
        width: 3.5rem;
        height: 3.5rem;
        color: #fff;
    }
    @media ${() => theme.device.tablet} {
        margin-right: 2rem;
    }
    @media ${() => theme.device.mobile} {
        margin-bottom: 2rem;
        svg{
            width: 2.5rem;
            height: 2.5rem;
        }
    }
`;

const Chat = styled(Box)`
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    min-width: 90rem;
    height: 60rem;
    border-radius: 4px;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.05);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .chat-list{
        width: 35%;
        height: 100%;
        border-right: 1px solid rgba(0,0,0,.1);
        .title{
            padding: 1rem 1.5rem 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4rem;
            position: sticky;
            top: 0;

            border-bottom: 1px solid rgba(0,0,0,.1);
            h2{
                font-size: 1.8rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
            svg{
                color: #FF7300;
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
    @media ${() => theme.device.tablet} {
        width: 90%;
        min-width: 90%;
        right: 2rem;
    }
    @media ${() => theme.device.mobile} {
        bottom : 0;
        right: 0;
        width: 100%;
        min-width: 100%;
        height: 100vh;
        .chat-list{
            width: auto;
        }
    }
`;  


const MsgList = styled(Box)`
    height: 53.5rem;
    overflow-y: scroll;
    .is-active {
        border-left: 3px solid #FF7300;
    }
    .is-active > div{
        background-color: #FFF1E5;
        ul{
            li{
                .name{
                    color: #FF7300;
                }
            }
        }
    }
    .is-active .profile-img-box{
        background-color: #FF7300;
    }
    @media ${() => theme.device.mobile} {
        position: absolute;
        top: 6rem;
        left: 0;
        z-index: 100;
        background-color: #fff;
        height: 100vh;
        width: 70%;
        box-shadow: 5px 5px 5px 5px rgba(0,0,0,.05);
    }
`;


const ChatingBox = styled(Box)`
    width: 65%;
    min-height: 60rem;
    position: relative;
    @media ${() => theme.device.mobile} {
        width: 100%;
    }
`;

