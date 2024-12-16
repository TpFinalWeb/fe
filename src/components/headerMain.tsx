import React from "react";
import { Link } from 'react-router';




export default function HeaderMain(){
    return(
        <header className="bg-gradient-to-b from-teal-500 to-teal-50 p-6 flex justify-center font-mono text-2xl font-bold">
                <nav className='flex justify-center'>
                  <Link to="/games" className="font-semibold hover:text-teal-600 pr-10">Games</Link>
                  <Link to="/genres" className="font-semibold hover:text-teal-600 border-l border-black pl-10 pr-10">Genres</Link>
                  <Link to="/platformes" className="font-semibold hover:text-teal-600 border-l border-black pl-10 pr-10 ">Platformes</Link>
                  <Link to="/scores" className="font-semibold hover:text-teal-600 border-l border-black pl-10">Scores</Link>
                </nav>
                    
        </header>
    )
}