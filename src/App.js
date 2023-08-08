import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from './style/GlobalStyle';
import Login from "./pages/account/Login";
import Join from "./pages/account/Join";
import Detail from "./pages/competition/Detail";
import Index from "./pages/Index";
import TeamDetail from "./pages/team/TeamDetail";
import AccountSetting from "./pages/mypage/AccountSetting";
import ProfileSetting from "./pages/mypage/ProfileSetting";
import { AuthProvider } from './AuthContext';
import axios from "axios";
import TeamManagement from "./pages/mypage/TeamManagement";
import Participation from "./pages/mypage/Participation";
import Writing from "./pages/team/Writing";
import TokenRedirect from "./TokenRedirect";
axios.defaults.withCredentials = true;

function App() {
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
          <Route path="/competition/detail/:boardId" element={ <Detail /> }></Route>
          <Route path="/recruitment/:recruitmentId" element={ <TeamDetail /> }></Route>
          <Route path="/mypage/acountSetting" element={ <AccountSetting /> }></Route>
          <Route path="/mypage/profileSetting" element={ <ProfileSetting /> }></Route>
          <Route path="/mypage/teamManagement" element={ <TeamManagement /> }></Route>
          <Route path="/mypage/participation" element={ <Participation /> }></Route>
          <Route path="/recruitment/write" element={ <Writing /> }></Route>
          <Route path="/oauth2/redirect" element={ <TokenRedirect /> }></Route>
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
