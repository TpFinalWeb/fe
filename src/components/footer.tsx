import React from "react"
import marieVicLogo from '../assets/Marie-victorin.png'

export default function Footer(){
    return(
        <footer className="bg-gradient-to-t from-teal-500 to-teal-50 p-6">
        <div className="flex justify-between items-center">
          <p className="text-left font-mono font-bold">Moby API Studio</p>
          <div className="flex flex-1 justify-center">
            <img
              src={marieVicLogo}
              alt="Marie Victorin"
              className="w-60"
            />
          </div>
          <p className="text-right font-mono font-bold">XPDevTeam</p>
        </div>
      </footer>
    )
}