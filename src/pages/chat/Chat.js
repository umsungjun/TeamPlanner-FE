import { ThemeProvider, styled } from "styled-components";
import theme from "../../style/theme";
import { Box, Grid, createTheme } from "@mui/material";
import Nav from "../../component/common/Nav";
import FilledBtn from "../../component/button/FilledBtn";
import { useContext, useEffect, useRef, useState } from "react";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { API } from "../../api/api";
import { getCookie } from "../../util/cookie";
import { AuthContext } from "../../AuthContext";

export default function Chat(){

  const members = [
    "localNickname",
    "KAKAO-1b0ed634-9df3-4d49-bfaf-765c44415e6f",
    "KAKAO-ac0d80f4-d1d1-4a7f-8cdc-bd8062703902",
    "KAKAO-cf69c235-b6cf-4c2c-a39f-14670a3187a2",
    "GOOGLE-cb337f90-4749-45ae-b3ec-b6458519318b",
    "NAVER-0d9cf439-4d7b-4427-9a7e-694adda9660d",
    "GOOGLE-0e202579-60f2-46c4-9006-fc17c27c86cc",
    "KAKAO-d6c89bde-336b-4908-b662-375382f3a3f8"

  ]

  const [chatList, setChatList] = useState([]);
  const [targetNickname, setTargetNickname] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [message, setMessage] = useState("asdf")
  const [chatRoomList, setChatRoomList] = useState([]);
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const info = JSON.parse(localStorage.getItem("userInfo"));



  // // 소켓 연결
  // const socket = new SockJS('http://localhost:8080/ws/chat');
  // const client = Stomp.over(socket);
  // client.connect({},onConnected,onError);

  // 소켓 연결
  const socket = new SockJS('http://localhost:8080/ws/chat');
  const client = useRef(null); // Use a ref to hold the client instance

  function onConnected() {
    console.log("onConnected")
  }

  function onError() {
    console.log("onError")
  }

//소켓연결
  useEffect(() => {
    // Initialize the STOMP client and connect when component mounts
    const socket = new SockJS('http://localhost:8080/ws/chat');
    client.current = Stomp.over(socket);
    client.current.connect({}, onConnected, onError);
    return () => {
      // Disconnect and clean up when component unmounts
      if (client.current) {
        client.current.disconnect();
      }
    };
  }, []);




  /*
   * 채팅방을 가져오는 api 
   */
  const fetchChatRoomList = () => {
    if(roomId){
      API.get(`/api/v1/chat/room/${roomId}`)
      .then(res => {
        console.log("하나의 채팅방에 있는 멤버와 채팅내용 가져와",res.data)
        setChatList(res.data.chattings);
      }).catch(err => {
        alert(err.response.data.message);
    })
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
    console.log('message', message)
    console.log('message', message.body)
    let newChat = JSON.parse(message.body);
    setChatList((prevChatList) => [...prevChatList, newChat]);

  };

  /**
   *  구독 한 sub 에 대한 message 를 받고 onMessageReceived에 넘거준다
   */
  const subscribeRoomId = (roomId) => {
    client.current.subscribe(`/sub/chattings/rooms/${roomId}`, onMessageReceived);
  };

  // 채팅을 보낸다. 보낼 유저를 클릭해야 보내짐
  // -> 기존의 채팅방이 없으면 -> 채팅방 생성 
  const sendMessageBtnHandler = () => {
    if (targetNickname == null) {
      console.log('targetNickname', targetNickname)
      return;
    }

    if (roomId == null) {
      API.post("/api/v1/chat/room", {
        targetNickname: targetNickname
      }).then(res => {
        console.log('방 생성 응답값 : ', res);
        setRoomId(res.data);
        createChatRoomthenSend(res.data);
      }).catch(err => {
        alert(err.response.data.message);
      })
    } else {
      isPresentChatRoomthenSend();
    }
  }
  /*
   * 채팅방이 처음 만들어 졋을 때 채팅 realsend
   */

  const createChatRoomthenSend = (roomId) => {
    console.log("처음 채팅방을 생성 후 메세지를 전송");
    client.current.publish({
      // destination: `/queue/${roomId}`,
      destination: `/pub/chattings/rooms/${roomId}`,
      body: `${JSON.stringify({
        content: message,
        // sender: localStorage.getItem("userInfo").nickname,
        senderId: userInfo.memberId,
        chattingRoomId: roomId
      })}`,
      headers: { priority: '9' },
    });
    setMessage("");
  }

    /*
   * 기존의 채팅방이 있었을 때 채팅 realsend
   */

    const isPresentChatRoomthenSend = () => {
      console.log("기존의 있던 채팅방에 메세지를 전송");
      client.current.publish({
        // destination: `/queue/${roomId}`,
        destination: `/pub/chattings/rooms/${roomId}`,
        body: `${JSON.stringify({
          content: message,
          // sender: localStorage.getItem("userInfo").nickname,
          senderId: userInfo.memberId,
          chattingRoomId: roomId
        })}`,
        headers: { priority: '9' },
      });
      setMessage("");
    }


  useEffect(() => {
    fetchChatRoomNumberList();
  }, [chatList])  


  useEffect(()=>{
    if(roomId!==null){
      client.current.subscribe(`/sub/chattings/rooms/${roomId}`, onMessageReceived);
    }
    fetchChatRoomList();
  },[roomId]);




  return (
    <>
    <ThemeProvider theme={theme}>
      <Nav />
      <Container>
        <PaddingWrap>
          <h1>
            나: {info.nickname} <br></br>
            상대: {targetNickname}
          </h1>
            {
              members.map(e => {
                return (
                  <h1 onClick={() => {setTargetNickname(e)}}>
                    {e}
                  </h1>
                )
              })
            }
          <Content>
            <div className="content-wrap">
            </div>
          </Content>
          <br/>

          <h1>myChatRoomList</h1>
          {
            chatRoomList.map((cr) => {
              return (
                <h1 onClick={() => setRoomId(cr.roomId)}>
                  chatroom: {cr.roomId}
                </h1>
              )
            })
          }


          <br/>
          <h1>current chatroomId: {roomId} chatList</h1>

          {
            chatList.map((c) => {
              return (
                <div>
        
                  <h1>내용: {c.content}</h1>
                  <h1>{c.createdTime} {c.createdDate}</h1>
    
                  <br/>
                </div>
              )
            }) 
          }



          <div class="mb-3">
            {/* <label for="" class="form-label"></label> */}
            <input type="text"
              class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
              value={message}
              onChange={e => setMessage(e.target.value)}
              >
              </input>
          <FilledBtn text={"chat"} handle={sendMessageBtnHandler}></FilledBtn>
            {/* <small id="helpId" class="form-text text-muted">Help text</small> */}
          </div>

        </PaddingWrap>
      </Container>

    </ThemeProvider>
    </>
  )
}

const Container = styled(Box)`
    width: 100%;
    margin-top: 13rem;
    @media ${() => theme.device.tablet} {
        margin-top: 16rem;
    }
`;
const Content = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .content-wrap{
        width: 80%;
        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid #FF7300;
            margin-bottom: 2rem;
            h1{
                font-size: 2.5rem;
                color: #3b3b3b;
                line-height: 150%;
                font-weight: bold;
            }
        }
    }
    @media ${() => theme.device.desktop} {
        .content-wrap{
            width: 100%;
        }
    }
    @media ${() => theme.device.mobile} {
        .content-wrap{
            .title{
                h1{
                    font-size: 2rem;
                }
            }
        }

    }
`;

const PaddingWrap = styled(Box)`
    padding: 0 5%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .dp-flex{
        display: flex;
        align-items: center;
    }
    .space-between{
        justify-content: space-between;
    }
    @media ${() => theme.device.desktop} {
        flex-direction: column;
    }
`;

