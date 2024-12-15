import React from "react";
import AxiosTest from "./axios/Test.tsx";
import LineChart from "./components/Testing(free place to test)/TestChart.tsx";
import Home from "./page/home.tsx";
import Login from "./page/connection/login.tsx";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./page/connection/register.tsx";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<p>this is the main for now</p>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
