import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
