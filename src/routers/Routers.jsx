import { Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPage.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
import GamePage from '../pages/MainPage/GamePage.jsx';
import CoursePage from '../pages/MainPage/CoursePage.jsx';
import QuizPage from '../pages/MainPage/QuizPage/QuizPage.jsx';
import NotificationPage from '../pages/MainPage/NotificationPage.jsx';
import Login from '../pages/LoginPage/Login.jsx';
import Signup from '../pages/SignUp/Signup.jsx';
import Ques from '../pages/MainPage/QuizPage/Ques.jsx';
import ChatRoom from '../pages/MainPage/chatroom/ChatRoom.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import VideoDetails from '../pages/MainPage/VideoDetails.jsx';
import Logout from '../pages/LoginPage/Logout.jsx';
import Game_H1 from '../pages/Game/Game_H1.jsx';
import Tictac from '../pages/Game/Tictac.jsx';
import Profile from '../pages/MainPage/Profile.jsx';
const Routers = () => {
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
  
    {/* Main Routes */}
    <Route path="/home" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
    <Route path="/home/notification" element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        } />
    <Route path="/home/course" element={
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        } />

<Route path="/home/course/video/:videoId" element={
          <ProtectedRoute>
            <VideoDetails />
          </ProtectedRoute>
        } />
    <Route path="/home/chat" element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        } />
    <Route path="/home/quiz" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
    <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <Ques />
          </ProtectedRoute>
        } />

<Route path="/logout" element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        } />
<Route path="/home/games" element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        } />
      <Route path="/home/games/rock-paper-scissors" element={
          <ProtectedRoute>
            <Game_H1 />
          </ProtectedRoute>
        } /> 

<Route path="/home/games/tictac" element={
          <ProtectedRoute>
            <Tictac />
          </ProtectedRoute>
        } /> 
        <Route path="/home/profile" element={
          <ProtectedRoute>
           <Profile/>
          </ProtectedRoute>
        } />
  </Routes>
  
  
  );
};

export default Routers;
