
import './App.css';
import Header from './compnents/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './compnents/Home/Home';
import Compare from './compnents/Compare/Compare';
import Admin from './compnents/Admin/Admin';
import { Routes,Route,useNavigate,Redirect } from "react-router-dom";
import Auth from './auth/Auth';
function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='/admin' element={localStorage.getItem("token") != null && localStorage.getItem("token") != 'undefined' ? <Admin/> : <Auth/>}/>
        <Route path='/auth'  element={<Auth/>} />
      </Routes>
    </div>
  );
}

export default App;
