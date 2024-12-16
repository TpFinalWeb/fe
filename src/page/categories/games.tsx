import React from 'react';
import HeaderMain from '../../components/headerMain.tsx';
import Footer from '../../components/footer.tsx';


function Games() {


  return (
    <div className="min-h-screen flex flex-col">
        <HeaderMain/>
        <main className="flex-1 bg-teal-50 flex items-center justify-center">
            Games
        </main>
        <Footer/>
    </div>
  );
}

export default Games;
    