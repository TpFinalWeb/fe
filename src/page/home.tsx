import React from 'react';
import Footer from '../components/footer.tsx';
import HeaderMain from '../components/headerMain.tsx';



function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain/>
      <main className="flex-1 bg-teal-50 flex items-center justify-center">
        <h2 className="text-xl font-mono text-teal-700">
          Bienvenue a la page Home
        </h2>
      </main>
      <Footer/>
    </div>  
  );
}

export default Home;
