import React from "react";
import AxiosTest from "./axios/Test.tsx";
import LineChart from "./components/Testing(free place to test)/TestChart.tsx";
import Home from "./page/home.tsx";
import Login from "./page/connection/login.tsx";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./page/connection/register.tsx";
import Games from "./page/categories/games.tsx";
import Genres from "./page/categories/genres.tsx";
import Platformes from "./page/categories/platformes.tsx";
import Scores from "./page/categories/scores.tsx";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/games" element={<Games />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/platformes" element={<Platformes />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
