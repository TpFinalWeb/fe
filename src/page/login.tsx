import React, { useState } from 'react';
import axios from '../axios/axios.js';
import { UserService } from '../axios/service/user.service.ts';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe.');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Le format de l\'email est invalide');
      return;
    }
    setError('');
    await UserService.loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-b from-teal-500 to-teal-50 p-10 flex justify-center font-mono text-2xl font-bold">
        GAMES-API Login
      </header>
      <main className="flex-1 bg-teal-50 flex items-center justify-center">
        <form
          className="bg-white p-20 rounded-lg shadow-lg"
          onSubmit={handleSubmit}>
          <h2 className="text-center text-xl font-bold font-mono mb-4">Connexion</h2>
          {error && (
            <p className="text-red-500 text-center text-xs mb-4 font-mono ">{error}</p>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold font-mono">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 block p-3 px-10 border rounded-md font-mono"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold font-mono">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 p-3 px-10 border rounded-md font-mono"
              placeholder="Entrez votre password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 mt-5 rounded-md hover:bg-teal-600 font-bold font-mono">
            Se connecter
          </button>
        </form>
      </main>
      <footer className="bg-gradient-to-t from-teal-500 to-teal-50 p-8">
        <div className="flex justify-between items-center">
          <p className="text-left font-mono font-bold">Moby API Studio</p>
          <div className="flex flex-1 justify-center">
            <img
              src={require('../assets/Marie-victorin.png')}
              alt="Marie Victorin"
              className="w-60"
            />
          </div>
          <p className="text-right font-mono font-bold">XPDevTeam</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
