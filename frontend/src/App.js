import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Compare from './pages/Compare';
import Admin from './pages/Admin';
import { Routes,Route } from "react-router-dom";
import Auth from './pages/Auth';
import Register from './pages/Register';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { useState, useEffect } from "react";
import Robots from './pages/Robots';
import Robot from './pages/Robot';
import Profile from './pages/Profile'
import { useReauthMutation } from './app/apiSlice';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { setCredentials, logOut } from './app/authSlice'
function App() {
  const [reauth] = useReauthMutation()
  const dispatch = useDispatch()
  const [Ids , setIds] = useState([]);
  let updateToken = async () => {
    try {
      if (localStorage.getItem("refreshToken")) {
        const refreshTokenWithQuotes = localStorage.getItem("refreshToken");
        const refreshToken = refreshTokenWithQuotes.replace(/^"(.*)"$/, '$1');
        const userData = await reauth(refreshToken);
        const decoded = jwtDecode(userData.data.access_token);
        const user = decoded.sub;
        const role = decoded.role;
        const accessToken = userData.data.access_token;
        dispatch(setCredentials({ user, role, accessToken }))
      }
    } catch (error) {
      console.error('Error while refreshing token:', error);
      dispatch(logOut());
      localStorage.clear();
    }
  };
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      updateToken();
    }, 900000);
    return () => clearInterval(tokenInterval);
  }, [dispatch]);
  useEffect(() => {
    updateToken();
  }, []);
  
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home Ids={Ids} setIds={setIds}/>}/>
        <Route path='/compare' element={<Compare Ids={Ids} setIds={setIds}/>}/>
        <Route path='/robots' element={<Robots Ids={Ids} setIds={setIds}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/robots/:id' element={<Robot Ids={Ids} setIds={setIds}/>}/>
        <Route path='/login'  element={<Auth/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/admin' element={<Admin/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
