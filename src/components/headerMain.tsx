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
          navigate('/login');
        }
      }catch(error){
        console.log(error);
      } 
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
                  isConnected &&
                  <div className="flex justify-end">
                    <button className="ml-0 bg-teal-700 p-1 rounded flex mt-0" onClick={() => {logout()}}>Déconexion</button>
                  </div>
                }
        </header>
    )
}