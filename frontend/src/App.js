
import './App.css';
import Header from './compnents/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './compnents/Home';
import Compare from './compnents/Compare';
import Admin from './compnents/Admin';
import { useState } from "react";
import { Routes,Route } from "react-router-dom";
function App() {
  const [Robots,setRobots] = useState([]);
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
