import logo from './logo.svg';
import './App.css';
import Header from './compnents/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Compare from './compnents/Compare';
import Admin from './compnents/Admin';
function App() {


  return (
    <div className="App">
      <Header/>
      <Admin/>
    </div>
  );
}

export default App;
