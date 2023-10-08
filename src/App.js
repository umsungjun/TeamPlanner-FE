import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from './style/GlobalStyle';
import Login from "./pages/account/Login";
import Join from "./pages/account/Join";
import Detail from "./pages/competition/Detail";
import Index from "./pages/Index";
import TeamDetail from "./pages/team/TeamDetail";
import AccountSetting from "./pages/mypage/AccountSetting";
import ProfileSetting from "./pages/mypage/ProfileSetting";
import Profile from "./pages/mypage/Profile";
import { AuthProvider } from './AuthContext';
import axios from "axios";
import TeamManagement from "./pages/mypage/TeamManagement";
import Participation from "./pages/mypage/Participation";
import Writing from "./pages/team/Writing";
import TokenRedirect from "./TokenRedirect";
import Search from "./pages/search/Search";
import RecruitList from "./pages/team/RecruitList";
import IdPw from "./pages/account/IdPw";
import Chat from "./pages/chat/Chat";
import ChatBox from "./component/chat/ChatBox";
import Update from "./pages/team/Update";
import { useState ,useEffect} from "react";
import { API } from "../src/api/api";


axios.defaults.withCredentials = true;

function App() {

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userInfo"));

  const handleClick = () => {
      setOpen(!open);
  };

  useEffect(() => {
    // Check for login status whenever the component mounts or updates
    setIsLoggedIn(!!localStorage.getItem("userInfo"));
  }, []);

  return (
    <AuthProvider>
      <>
      <GlobalStyle/>
        <Routes>
          <Route path="/" element={ <Index /> }></Route>
          <Route path="/contest" element={ <Index /> }></Route>
          <Route path="/externalActivity" element={ <Index /> }></Route>
          <Route path="/club" element={ <Index /> }></Route>
          <Route path="/login" element={ <Login /> }></Route>
          <Route path="/join" element={ <Join /> }></Route>
          <Route path="/idPw" element={ <IdPw /> }></Route>
          <Route path="/competition/detail/:boardId" element={ <Detail /> }></Route>
          <Route path="/recruitment/:recruitmentId" element={ <TeamDetail /> }></Route>
          <Route path="/mypage/acountSetting" element={ <AccountSetting /> }></Route>
          <Route path="/mypage/profileSetting" element={ <ProfileSetting /> }></Route>
          <Route path="/mypage/teamManagement" element={ <TeamManagement /> }></Route>
          <Route path="/mypage/participation" element={ <Participation /> }></Route>
          <Route path="/recruitment/:recruitmentId/update" element={ <Update /> }></Route>
          <Route path="/recruitment/write" element={ <Writing /> }></Route>
          <Route path="/oauth2/redirect" element={ <TokenRedirect /> }></Route>
          <Route path="/recruitment" element={ <RecruitList /> }></Route>
          <Route path="/search" element={ <Search /> }></Route>
          <Route path="/chat" element={ <Chat /> }></Route>
          <Route path="/profile/:nickname" element={ <Profile handleClick={handleClick}/> }></Route>
        </Routes>
      </>

      {isLoggedIn && <ChatBox handleClick={handleClick} open={open}/>}
    </AuthProvider>
    
  );
}

export default App;
