import React, { useState, useEffect } from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { GraphService } from "../../axios/service/graph.service.ts";
import { useNavigate } from "react-router";
import { getToken } from "../../axios/http-common.ts";
Chart.register(CategoryScale);

function Platformes() {
  const [openPopUp, setOpenPopUp] = useState(false)
  const [popUpContent, setPopUpContent] = useState({ title: "", description: "" });
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datasets1, setDatasets1] = useState([]);
  const [labels1, setLabels1] = useState([]);
  const [datasets2, setDatasets2] = useState([]);
  const [labels2, setLabels2] = useState([]);
  const [options, setOptions] = useState([]);
  const [curroptions, setCurroptions] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [colors1, setColors1] = useState<string[]>([]);
  const [colors2, setColors2] = useState<string[]>([]);

  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const verifyConnection = async () => {
      const token = getToken();
      if (token == null) {
        setIsConnected(false);
        navigate("/login");
      }
      else {
        setIsConnected(true);
      }
    }

    verifyConnection();

    const fetchData1 = async () => {
      try {
        // Graph 1
        const response = await GraphService.getPlatformsWhereGamesReleaseFirst();
        const data = response.aggregation;
        let accum = 0;
        const updatedData = data.reduce(
          (acc: { platforms: string[]; gameCounts: number[]; }, item: { gameCount: number; platformName: any; }) => {
            if (item.gameCount < 200) {
              accum += item.gameCount;
              if (!acc.platforms.includes("Others")) {
                acc.platforms.push("Others");
                acc.gameCounts.push(accum);
              } else {
                acc.gameCounts[acc.platforms.indexOf("Others")] = accum;
              }
            } else {
              acc.platforms.push(item.platformName);
              acc.gameCounts.push(item.gameCount);
            }
            return acc;
          },
          { platforms: [], gameCounts: [] }
        );


        setLabels(updatedData.platforms);
        setDatasets(updatedData.gameCounts);

        let colorsArray: string[] = [];
        for (let i = 0; i < updatedData.platforms.length; i++) {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colorsArray.push(color);
        }
        setColors(colorsArray);
      } catch (error) {
        console.log(error)
      }
    };

    const fetchData2 = async () => {
      try {

        // Graph 2
        const response = await GraphService.getPlatformPopularity();
        const data = response.aggregation;
        console.log(data);
        let accum = 0;
        const updatedData = data.reduce(
          (acc: { platforms: string[]; average_popularity: number[]; }, item: { average_popularity: number; platform_name: any; }) => {
            if (item.average_popularity < 1) {
              accum += item.average_popularity;
              if (!acc.platforms.includes("Others")) {
                acc.platforms.push("Others");
                acc.average_popularity.push(accum);
              } else {
                acc.average_popularity[acc.platforms.indexOf("Others")] = accum;
              }
            } else {
              acc.platforms.push(item.platform_name);
              acc.average_popularity.push(item.average_popularity);
            }
            return acc;
          },
          { platforms: [], average_popularity: [] }
        );

        setLabels1(updatedData.platforms);
        setDatasets1(updatedData.average_popularity);

        let colorsArray: string[] = [];
        for (let i = 0; i < updatedData.platforms.length; i++) {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colorsArray.push(color);
        }
        setColors1(colorsArray);
      } catch (error) {
        console.log(error)
      }

    };
    const fetchData3 = async () => {
      try {

        // Graph 3
        const response = await GraphService.getGamesPerPlatforms();
        const data = response.aggregation;
        let accum = 0;
        const updatedData = data.reduce(
          (acc: { platforms: string[]; count: number[]; }, item: { count: number; platform_name: any; }) => {
            if (item.count < 700) {
              accum += item.count;
              if (!acc.platforms.includes("Others")) {
                acc.platforms.push("Others");
                acc.count.push(accum);
              } else {
                acc.count[acc.platforms.indexOf("Others")] = accum;
              }
            } else {
              acc.platforms.push(item.platform_name);
              acc.count.push(item.count);
            }
            return acc;
          },
          { platforms: [], count: [] }
        );

        setLabels2(updatedData.platforms);
        setDatasets2(updatedData.count);

        let colorsArray: string[] = [];
        for (let i = 0; i < updatedData.platforms.length; i++) {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colorsArray.push(color);
        }
        setColors2(colorsArray);
      } catch (error) {
        console.log(error)
      }

    };
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);
  const handleOpenPopUp = (title: string, description: string) => {
    setPopUpContent({ title, description });
    setOpenPopUp(true);
  };
  const data = {

    labels: labels,
    datasets: [
      {
        label: "Première sortie des jeux par plateforme",
        data: datasets,
        backgroundColor: colors,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };
  const data1 = {

    labels: labels1,
    datasets: [
      {
        label: "Popularité des plateformes de jeu",
        data: datasets1,
        backgroundColor: colors1,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "Nombre de jeu par plateforme",
        data: datasets2,
        backgroundColor: colors2,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };
  const graphDesc1 = `
  Ce graphique illustre la tendance de sortie des jeux sur une plateforme spécifique. Il met en avant les jeux créés en premier sur cette plateforme, en montrant leur distribution chronologique. 
  Cela permet d'identifier la plateforme la plus active en termes de développement et de sorties de jeux.
  `

  const graphDesc2 = `
  Ce graphique montre la popularité des plateformes de jeu en fonction de la moyenne de popularité des jeux disponibles sur chaque plateforme. On conte seulement les jeux qui ont plus de 50 jeux dont leur popularité n'est pas nulle.
  Chaque bar du graphique représente une plateforme de jeu et la taille de la bar représente la moyenne de popularité des jeux disponibles sur cette plateforme.
  La popularité des plateformes de jeu peut être un indicateur de la qualité des jeux disponibles sur chaque plateforme, ainsi que de la satisfaction des joueurs envers les jeux disponibles sur ces plateformes.
  `

  const graphDesc3 = `
  Ce graphique montre le nombre de jeux par plateforme.
  Chaque partie du graphique représente une plateforme de jeu et la taille de la partie représente le nombre de jeux disponibles sur cette plateforme.
  La disparité du nombre de jeux par plateforme nous montre quelles plateformes ont une bibliothèque de jeux plus vaste par rapport à d'autres. Cela peut indiquer la popularité et le soutien des développeurs pour certaines plateformes, ainsi que les préférences des joueurs en termes de choix de plateforme pour jouer à leurs jeux préférés.
  `

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8 ">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono mb-10">
          Visualisation des données de platformes jouées
        </h2>
        <div className="flex flex-wrap justify-center gap-12 mt-10">
          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              Tendance de la première sortie des jeux par plateforme
            </h3>
            <Bar data={data} className="" />
            <button
              onClick={() => handleOpenPopUp("Graphique 3", graphDesc1)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105">
              Voir Détails
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              La popularité des plateformes de jeu
            </h3>
            <Line data={data1} />
            <button
              onClick={() => handleOpenPopUp("Graphique 3", graphDesc2)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105">
              Voir Détails
            </button>
          </div>
          <div className="bg-white shadow-md shadow-md rounded-lg p-14 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              Nombre de jeux par plateforme
            </h3>
            <Pie data={data2} />
            <button
              onClick={() => handleOpenPopUp("Graphique 3", graphDesc3)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105">
              Voir Détails
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {openPopUp && (
        <div className="fixed bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl p-20 px-10">
            <h2 className="text-xl font-bold text-teal-700 mb-4 font-mono">
              {popUpContent.title}
            </h2>
            <p className="mb-6 text-gray-700">{popUpContent.description}</p>
            <button onClick={() => setOpenPopUp(false)} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Platformes;
