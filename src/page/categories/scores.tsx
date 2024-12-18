import React, { useEffect, useState } from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { GraphService } from "../../axios/service/graph.service.ts";
import { useNavigate } from "react-router";
import { getToken } from "../../axios/http-common.ts";

Chart.register(CategoryScale);

function Scores() {
  const [platformOptions, setPlatformOptions] = useState([]);
  const [curroption, setcurroption] = useState<string>("");
  const [genreOption, setgenreOption] = useState([]);
  const [curroptionPlat, setcurroptionPlat] = useState<string>("");
  const [dataset, setDataset] = useState([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasetGenre, setDatasetGenre] = useState([]);
  const [labelsGenre, setLabelsGenre] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [colors1, setColors1] = useState<string[]>([]);
  const [colorsGOY, setcolorsGOY] = useState<string[]>([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState({ title: "", description: "" });
  const [labelsGOY, setlabelsGOY] = useState<string[]>([]);
  const [datasetGOY, setDatasetGOY] = useState([]);

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
    const fetchData = async () => {
      try {
        const data = await GraphService.getAllPlatforms();
        const list = data.aggregation.filter((platform: any) => platform.count > 100).map((platform: any) => platform.platform_name);
        setPlatformOptions(list);
      } catch (error) {
        console.error("Failed to fetch platforms:", error);
      }
    };

    const fetchdataGenre = async () => {
      try {
        const data = await GraphService.getAllGenres();
        const list = data.aggregation.filter((platform: any) => platform.count > 2000).map((platform: any) => platform.genre_name);
        setgenreOption(list);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    const fetchDataGOY = async () => {
      try {
        const response = await GraphService.getGOY();
        const data = response.aggregation;
        let accum = 0;
        const updatedData = data.reduce(
          (acc: { platforms: string[]; top_score: number[]; }, item: {
            release_year: any; top_score: number; top_game: any;
          }) => {
            if (item.top_score < 1) {
              accum += item.top_score;
              if (!acc.platforms.includes("Others")) {
                acc.platforms.push("Others");
                acc.top_score.push(accum);
              } else {
                acc.top_score[acc.platforms.indexOf("Others")] = accum;
              }
            } else {
              acc.platforms.push(`${item.top_game} (${item.release_year})`);
              acc.top_score.push(item.top_score);
            }
            return acc;
          },
          { platforms: [], top_score: [] }
        );

        setlabelsGOY(updatedData.platforms);
        setDatasetGOY(updatedData.top_score);
        console.log(updatedData);
        let colorsArray: string[] = [];
        for (let i = 0; i < updatedData.platforms.length; i++) {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colorsArray.push(color);
        }
        setcolorsGOY(colorsArray);
      } catch (error) {
        console.log(error);
      }
    };

    try {
      fetchData();
      fetchdataGenre();
      fetchDataGOY();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  async function handlePlatformOptions(platform_name: string) {
    try {
      const dataplat = await GraphService.getPlatformQualityByTime(platform_name);
      setDataset(dataplat.aggregation.map((game: any) => game.average_score));
      setLabels(dataplat.aggregation.map((game: any) => game.release_year));
      let colorsArray: string[] = [];
      for (let i = 0; i < dataplat.aggregation.length; i++) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        colorsArray.push(color);
      }
      setColors(colorsArray);
    } catch (error) {
      console.error("Failed to fetch platform data:", error);
    }
  }

  async function handleOptionGenre(params: string) {
    try {
      const genre = await GraphService.getGenreQualityByTime(params);
      setDatasetGenre(genre.aggregation.map((game: any) => game.average_score));
      setLabelsGenre(genre.aggregation.map((game: any) => game.release_year));
      let colorsArray: string[] = [];
      for (let i = 0; i < genre.aggregation.length; i++) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        colorsArray.push(color);
      }
      setColors1(colorsArray);
    } catch (error) {
      console.error("Failed to fetch genre data:", error);
    }
  }

  const dataPlatform = {
    labels: labels,
    datasets: [
      {
        label: "La qualité des jeux par plateforme au fil du temps",
        data: dataset,
        backgroundColor: colors,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

  const dataGenre = {
    labels: labelsGenre,
    datasets: [
      {
        label: "La qualité des jeux par genre au fil du temps",
        data: datasetGenre,
        backgroundColor: colors1,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

  const dataGOY = {
    labels: labelsGOY,
    datasets: [
      {
        label: "Les meilleurs jeux de chaque année",
        data: datasetGOY,
        backgroundColor: colorsGOY,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any) {
            const label: string = (this as any).getLabelForValue(value);
            return label.length > 10 ? label.substring(0, 10) + '...' : label;
          },
        },
      },
      y: {
        beginAtZero: false,
        min: Math.min(...dataset) - 0.2,
        max: Math.max(...dataset) + 0.2
      }
    }
  };

  const optionsGenre = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any): string {
            const label = (this as any).getLabelForValue(value);
            return label.length > 10 ? label.substring(0, 10) + '...' : label;
          },
        },
      },
      y: {
        beginAtZero: false,
        min: Math.min(...datasetGenre) - 0.2,
        max: Math.max(...datasetGenre) + 0.2
      }
    }
  };
  const optionGoy = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any): string {
            const label = (this as any).getLabelForValue(value);
            return label.length > 10 ? label.substring(0, 10) + '...' : label;
          },
        },
      }
    }
  }

  const descGraph1 = `Ce graphique montre la qualité des jeux pour une plateforme spécifique au fil du temps.
  Chaque barre représente la moyenne des scores des jeux de cette plateforme pour une année donnée.
  Vous pouvez sélectionner une plateforme dans le menu déroulant pour voir comment les scores des jeux ont évolué au fil des années.
  Ce graph vous permet de voir si la qualité des jeux pour une plateforme spécifique a augmenté ou diminué au fil du temps.`;
  const descGraph2 = `Ce graphique montre la qualité des jeux pour un genre spécifique au fil du temps.
  Chaque barre représente la moyenne des scores des jeux de cett genre pour une année donnée.
  Vous pouvez sélectionner un genre dans le menu déroulant pour voir comment les scores des jeux ont évolué au fil des années.
  Ce graph vous permet de voir si la qualité des jeux pour un genre spécifique a augmenté ou diminué au fil du temps.`;
  const descGraph3 = `Ce graphique montre les meilleurs jeux de chaque année. Chaque point représente le score du meilleur jeu de l'année.
  Vous pouvez voir le nom du jeu et l'année en survolant le point.
  Ce graph vous permet de voir si la qualité des jeux en général a augmenté ou diminué au fil du temps.`;

  const handleOpenPopUp = (title: string, description: string) => {
    setPopUpContent({ title, description });
    setOpenPopUp(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono">
          Visualisation des données de scores</h2>
        <div className="flex flex-wrap justify-center gap-12 mt-10">
          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              La qualité des jeux par plateforme au fil du temps
            </h3>
            <div className="text-center mb-4">
              <label htmlFor="platform-select" className="mr-2">La plateforme choisie:</label>
              <select
                id="platform-select"
                value={curroption}
                onChange={async (e) => {
                  const selectedOption = e.target.value;
                  setcurroption(selectedOption);
                  handlePlatformOptions(selectedOption);
                }}
                className="p-2 border rounded"
              >
                <option value="">--Veuillez choisir une option--</option>
                {platformOptions.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Bar data={dataPlatform} options={options} />
            <button
              onClick={() => handleOpenPopUp("Graphique 1", descGraph1)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105"
            >
              Voir Détails
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              La qualité des jeux par genre au fil du temps
            </h3>
            <div className="text-center mb-4">
              <label htmlFor="genre-select" className="mr-2">Le genre choisi:</label>
              <select
                id="genre-select"
                value={curroptionPlat}
                onChange={async (e) => {
                  const selectedOption = e.target.value;
                  setcurroptionPlat(selectedOption);
                  handleOptionGenre(selectedOption);
                }}
                className="p-2 border rounded"
              >
                <option value="">--Veuillez choisir une option--</option>
                {genreOption.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Bar data={dataGenre} options={optionsGenre} />
            <button
              onClick={() => handleOpenPopUp("Graphique 2", descGraph2)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105"
            >
              Voir Détails
            </button>
          </div>
          <div className="bg-white shadow-md shadow-md rounded-lg p-14 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              Les meilleurs jeux de chaque année
            </h3>
            <Line data={dataGOY} options={optionGoy} />
            <button
              onClick={() => handleOpenPopUp("Graphique 3", descGraph3)}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105"
            >
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
            <button
              onClick={() => setOpenPopUp(false)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scores;