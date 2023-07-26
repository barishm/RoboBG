
import './App.css';
import Header from './compnents/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './compnents/Home/Home';
import Compare from './compnents/Compare/Compare';
import Admin from './compnents/Admin/Admin';
import { Routes,Route } from "react-router-dom";
import Auth from './auth/Auth';
import ProtectedRoutes from './auth/ProtectedRoutes';
import { useState } from "react";
function App() {
  const [Ids , setIds] = useState([]);
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home Ids={Ids} setIds={setIds}/>}/>
        <Route path='/compare' element={<Compare Ids={Ids} setIds={setIds}/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/admin' element={<Admin/>}/>
        </Route>
        <Route path='/auth'  element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
