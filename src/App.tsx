import React from "react";
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
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/games" element={<Games />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/platformes" element={<Platformes />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/unauthorized" element={<div>Error 401: You are not authorized to view this page</div>} />
            <Route path="*" element={<div>Error 404: Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
