import React, { useState } from 'react';
import axios from '../../axios/axios.js';
import { UserService } from '../../axios/service/user.service.ts';
import Footer from '../../components/footer.tsx';
import Header from '../../components/header.tsx';
import { Link } from 'react-router';


export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleSubmit = async (e) => {
    // e.preventDefault();

    // if (!email || !password) {
    //   setError('Veuillez entrer un email et un mot de passe.');
    //   return;
    // }
    
    // if (!emailRegex.test(email)) {
    //   setError('Le format de l\'email est invalide');
    //   return;
    // }
    // setError('');
    // await UserService.loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-teal-50 flex items-center justify-center">
        <form
          className="bg-white py-10 px-20 rounded-lg shadow-lg"
          onSubmit={handleSubmit}>
          <h2 className="text-center text-xl font-bold font-mono mb-4">Inscription</h2>
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
            <label className="block text-sm font-bold font-mono">
              username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-3 block p-3 px-10 border rounded-md font-mono"
              placeholder="Entrez votre username"
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
            S'inscrire
          </button>

          <div>
            <p className='text-xs text-center mt-3'>Vous avez déja un compte? 
              <Link to="/login" className='font-semibold text-decoration-line: underline bold text-blue-500 ml-2'>Connectez-vous ici</Link>
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
