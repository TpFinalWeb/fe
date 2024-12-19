import React, { useState } from 'react';
import { UserService } from '../../axios/service/user.service.ts';
import Footer from '../../components/footer.tsx';
import Header from '../../components/header.tsx';
import { Link, useNavigate } from 'react-router';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
    try{
      const login = await UserService.loginUser(email, password);
      if(login === 200){
        navigate('/games');
      }else{
        setError('Email ou mot de passe incorrect');
      }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-teal-50 flex items-center justify-center">
        <form
          className="bg-white p-16 rounded-lg shadow-2xl"
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

          <div>
            <p className='text-xs text-center mt-3 '>Vous n'avez pas de compte? 
              <Link to="/register" className='font-semibold text-decoration-line: underline bold text-blue-500 ml-2'>Inscrivez vous ici</Link>
            </p>
          </div>
        </form>
        
      </main>

      <Footer />
    </div>
  );
}

export default Login;
