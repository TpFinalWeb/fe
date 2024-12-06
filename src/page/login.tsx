import React from 'react';

function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-b from-teal-500 to-teal-50 p-10 flex justify-center font-roboto">Header</header>
      <main className="flex-1 bg-teal-50 p-4">
        <p>Graph1</p>
      </main>
      <footer className="bg-gradient-to-t from-teal-500 to-teal-50 p-8">
        <div className="flex justify-between items-center">
          <p className="text-left">
            Moby API Studio
            </p>
          <div className="flex flex-1 justify-center">
            <img src={require('../assets/Marie-victorin.png')} alt="Marie Victorin" className="w-60"/>
          </div>
          <p className="text-right font">XPDevTeam</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
