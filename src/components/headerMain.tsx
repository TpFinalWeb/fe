import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router';
import { UserService } from "../axios/service/user.service.ts";




export default function HeaderMain(){

    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
      try{
        const logout = await UserService.logoutUser();
        if(logout){
          console.log("User is disconnected");
          setIsConnected(false);
          navigate('/');
        }
      }catch(error){
        console.log(error);
      } 
    }

    const logIn = async () => {
      navigate('/login');
    }

    useEffect(() => {
      const checkConnection = async () => {
        try{
          const token = await UserService.getToken();
          if(token){
            setIsConnected(true);
          }else{
            setIsConnected(false);
          }
        }catch(error){
          console.log(error);
        }
      }
      checkConnection();
    }, [])

    return(
        <header className="grid grid-cols-3 bg-gradient-to-b from-teal-500 to-teal-50 p-6 flex justify-center font-mono text-2xl font-bold">
                <div />  {/* this div is just to separate in three and put the Links in the middle*/}

                <nav className='flex justify-center'>
                  <Link to="/games" className="font-semibold hover:text-teal-600 pr-10">Games</Link>
                  <Link to="/genres" className="font-semibold hover:text-teal-600 border-l border-black pl-10 pr-10">Genres</Link>
                  <Link to="/platformes" className="font-semibold hover:text-teal-600 border-l border-black pl-10 pr-10 ">Platformes</Link>
                  <Link to="/scores" className="font-semibold hover:text-teal-600 border-l border-black pl-10">Scores</Link>
                </nav>

                {
                  isConnected ?
                  <div className="flex justify-end">
                    <button className="ml-0 mr-5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 py-1 px-4 rounded-full flex mt-0 text-white shadow-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {logout()}}>Déconnexion</button>
                  </div>
                  :
                  <div className="flex justify-end">
                    <button className="ml-0 mr-5 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 py-1 px-4 rounded-full flex mt-0 text-white shadow-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {logIn()}}>Se connecter</button>
                  </div>
                }
        </header>
    )
}