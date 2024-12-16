import React from 'react';
import Footer from '../components/footer.tsx';
import HeaderMain from '../components/headerMain.tsx';
import graph from "../assets/graph.jpg"
import games from "../assets/games.jpg"
import games2 from "../assets/games2.jpg"

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl font-mono font-bold text-teal-700 mt-10 mb-20">
            Bienvenue à la page Home
          </h1>
          <p className="text-gray-700 mb-10 font-mono">
            Bienvenue dans notre application dédiée à l'exploration de l'API gratuite Moby Studio Games!
            Cette plateforme vous offre un aperçu unique et détaillé des statistiques sur l'industrie des jeux vidéo.
            À travers cette application, vous pourrez explorer des données précieuses et des visualisations,
            vous permettant de plonger dans les différentes facettes de cet univers passionnant.
          </p>

          <img src={games} alt="Games" className='shadow-2xl rounded-2xl'/>

          <h1 className="text-2xl font-mono text-teal-700 mb-4 mt-10">
            Ce que vous découvrirez :
          </h1>

          <ul className="text-left text-gray-700 mb-6 font-mono">
            <li className="mb-2 font-mono">
              <strong>Jeux :</strong> Découvrez les titres les plus joués, leur popularité à travers le temps,
              ainsi que des informations clés sur leur impact dans l'industrie.
            </li>
            <li className="mb-2">
              <strong>Genres :</strong> Analysez les types de jeux les plus populaires, des RPG aux FPS, et voyez comment
              les préférences des joueurs évoluent.
            </li>
            <li className="mb-2">
              <strong>Plateformes :</strong> Identifiez les plateformes les plus utilisées par les joueurs à travers le monde
              et leur influence sur le marché.
            </li>
            <li className="mb-2 mb-10">
              <strong>Scores :</strong> Consultez les classements des jeux les mieux notés et analysez les tendances de notation
              à travers différentes catégories.
            </li>
          </ul>

          <img src={games2} alt="games2" className='shadow-2xl rounded-2xl' />

          <h3 className="text-2xl text-teal-700 mb-4 font-mono mb-10 mt-10">
            Une expérience immersive et interactive
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6 font-mono">
            Chaque catégorie offre des graphiques et des visualisations uniques, qui vous permettront de mieux comprendre
            les dynamiques de l'industrie du jeu vidéo. Ces graphiques sont conçus pour fournir des informations pertinentes
            et actualisées, vous offrant ainsi une vue d'ensemble complète des jeux vidéo, de leurs genres, des plateformes,
            et des scores des joueurs.
          </p>
          
          <img src={graph} alt="graph" className='shadow-2xl rounded-2xl' />

          <h3 className="text-2xl text-teal-700 mb-4 font-mono mb-10 mt-10">
            Pourquoi cette application est unique
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6 font-mono">
            L'application est conçue pour offrir une expérience fluide et interactive, avec des données constamment mises à jour.
            Que vous soyez un passionné de jeux vidéo, un développeur ou simplement curieux de l'industrie, vous trouverez ici
            des informations détaillées qui vous permettront de mieux comprendre les tendances actuelles et de découvrir de nouveaux jeux à explorer.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6 font-mono mt-10 ">
            Notre équipe <strong>XPDevTeam</strong> est fière de vous offrir cette plateforme innovante, et nous espérons que
            cette exploration vous inspirera à en apprendre davantage sur l'univers des jeux vidéo. Nous sommes heureux de vous
            ouvrir les portes de cette industrie fascinante et de vous offrir un accès privilégié à des données riches et diversifiées.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
