import React, { useState } from 'react';
import { UserService } from '../../axios/service/user.service.ts';
import Footer from '../../components/footer.tsx';
import Header from '../../components/header.tsx';
import { Link, useNavigate } from 'react-router';
import { User } from '../../axios/models/user.model.ts';


export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(){}[\]:<>?])[A-Za-z\d!@#$%^&*(){}[\]:<>?]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;

  const inputInformations = {
    email: {
      label: 'Email',
      type: 'email',
      id: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: 'Entrez votre email',
    },
    username: {
      label: 'Username',
      type: 'text',
      id: 'username',
      value: username,
      onChange: (e) => setUsername(e.target.value),
      placeholder: 'Entrez votre username',
    },
    password: {
      label: 'Password',
      type: 'password',
      id: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: 'Entrez votre password',
    }
  }

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return;
    }
    
    if(!usernameRegex.test(username)) {
      setError('Le username doit contenir entre 3 et 30 caractères');
      return;
    }

    if(!passwordRegex.test(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
      return;
    }

    setError('');

    try{
      const userToRegister: User = {
        role: "user",
        email: email,
        username: username,
        password: password
      }
      const response = await UserService.registerUser(userToRegister);
      if(response.success === true){
        UserService.loginUser(email, password); // to create a token and put it in localstorage
        navigate('/'); // i should probably put it in UserService.loginUser
      }
      else{
        setError(response.message)
      }
    }catch(error){
      console.log(error)
      setError("An internal Error has occured, try again later")
    }
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
            <p className="text-red-500 text-center text-xs  font-mono max-w-xs ">{error}</p>
          )}

          {Object.keys(inputInformations).map((key) => {
            const input = inputInformations[key];
            return (
              <div className="mb-4" key={input.id}>
                <label htmlFor={input.id} className="block text-sm font-bold font-mono">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  value={input.value}
                  onChange={input.onChange}
                  className="w-full mt-3 block p-3 px-10 border rounded-md font-mono hover:bg-teal-50 focus:bg-teal-100"
                  placeholder={input.placeholder}
                />
              </div>
            );
          })}

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
