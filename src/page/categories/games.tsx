import React, { useCallback, useEffect, useState } from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { GraphService } from "../../axios/service/graph.service.ts";
import { UserService } from "../../axios/service/user.service.ts";
import { useNavigate } from "react-router";
import { getToken } from "../../axios/http-common.ts";
Chart.register(CategoryScale);

function Games() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState({ title: "", description: "" });
  const [platformOptions, setPlatformOptions] = useState([]);
  const [curroption, setcurroption] = useState<string>("");
  const [genreOption, setgenreOption] = useState([]);
  const [curroption1, setcurroption1] = useState<string>("");
  const [dataset, setDataset] = useState([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataset1, setDataset1] = useState([]);
  const [labels1, setLabels1] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [colors1, setColors1] = useState<string[]>([]);
  const [colors2, setColors2] = useState<string[]>([]);
  const [values, setValues] = useState([0, 12]); // Values for min and max
  const [datasetGenre, setdatasetGenre] = useState([]);
  const [labels2, setLabels2] = useState<string[]>([]);
  
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  const [months, setMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
  const handleOpenPopUp = (title: string, description: string) => {
    setPopUpContent({ title, description });
    setOpenPopUp(true);
  };

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

    const fetchData = async () => {
      try{

        const data = await GraphService.getAllPlatforms();
        const list = data.aggregation.filter((platform: any) => platform.count > 100).map((platform: any) => platform.platform_name);
        setPlatformOptions(list);
      }catch(error){
        console.error("Failed to fetch platforms:", error);
      }
    };
    const fetchdataGenre = async () => {
      try{
        const data = await GraphService.getAllGenres();
        const list = data.aggregation.filter((platform: any) => platform.count > 2000).map((platform: any) => platform.genre_name);
        setgenreOption(list);
      }catch(error){
        console.error("Failed to fetch platforms:", error);
      }
      
    };
    verifyConnection();
    if(isConnected){
    try{
      fetchData();
      fetchdataGenre();
    }catch(error){
      console.error("Failed to fetch platforms:", error);
    }
  }
}, [isConnected]);

  async function handleOption(params: string) {
    try {
    const data = await GraphService.getTop10GamesOfPlatform(params);
    setDataset(data.aggregation.map((game: any) => game.score));
    setLabels(data.aggregation.map((game: any) => game.name));
    let colorsArray: string[] = [];
    for (let i = 0; i < data.aggregation.length; i++) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colorsArray.push(color);
    }
    setColors(colorsArray);
  }
  catch (error) {
    
  }
  }

  async function handleOption1(params: string) {
    try {
      
    
    const data = await GraphService.getTop10GamesOfGenre(params)
    setDataset1(data.aggregation.map((game: any) => game.score));
    setLabels1(data.aggregation.map((game: any) => game.name));
    let colorsArray: string[] = [];
    for (let i = 0; i < data.aggregation.length; i++) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colorsArray.push(color);
    }
    setColors1(colorsArray);
    console.log(colors1)
  }
    catch (error) {
      
    }
  }

  const handleMonthRangeChange = async (startMonth: number, endMonth: number) => {
    try{

    
    setValues([startMonth, endMonth]);
    if (startMonth >= endMonth) {
      return;
    }
    console.log(startMonth, endMonth);
    const start = startMonth.toString();
    const end = endMonth.toString();
    const data = await GraphService.getPlatPopularityBy2Months(start, end);
    setdatasetGenre(data.aggregation.map((platform: any) => platform.average_popularity));
    setLabels2(data.aggregation.map((platform: any) => platform.platform_name));
    let colorsArray: string[] = [];
    for (let i = 0; i < data.aggregation.length; i++) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colorsArray.push(color);
    }
    setColors2(colorsArray);
  }catch(error){
    console.error("Failed to fetch platforms:", error);
  }
  };

  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Top 1 des jeux d'une plateforme",
        data: dataset,
        backgroundColor: colors,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

 
  const dataGenre = {
    labels: labels1,
    datasets: [
      {
        label: "Top 1 des jeux d'un genre",
        data: dataset1,
        backgroundColor: colors1,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

  const data2Months = {
    labels: labels2,
    datasets: [
      {
        label: "Quelle plateforme de jeu la plus populaire entre les mois",
        data: datasetGenre,
        backgroundColor: colors2,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ]
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any): string {
            const label = labels[value];
            if (label) {
              return label.length > 10 ? label.substring(0, 10) + '...' : label;
            }
            return '';
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
            const label = labels1[value];
            return label.length > 10 ? label.substring(0, 10) + '...' : label; 
          },
        },
      },
      y: {
        beginAtZero: false,
        min: Math.min(...dataset1) - 0.2,
        max: Math.max(...dataset1) + 0.2
      }
    }
  };

  const descGraph1 = `Ce graphique présente les Top 10 des jeux d'une plateforme, permettant de visualiser les dix jeux les plus populaires sur une plateforme choisie. 
  Vous pouvez sélectionner la plateforme souhaitée à partir d'un menu déroulant, et le graphique mettra à jour les données en conséquence. 
  La visualisation est réalisée sous forme de graphique en barres, où chaque barre représentereprésente la popularité des jeux selon les votes des joueurs.
  Le but de ce graphique est de permettre aux utilisateurs de visualiser les jeux les plus populaires sur une plateforme spécifique.`;
  const descGraph2 = `Ce graphique présente les Top 10 des jeux d'un genre, permettant de visualiser les dix jeux les plus populaires d'un genre spécifique choisi. 
  Vous pouvez sélectionner le genre de jeu souhaité à partir d'un menu déroulant, et le graphique se mettra à jour pour afficher les jeux les plus populaires de ce genre. 
  La visualisation est réalisée sous forme de graphique en barres, où chaque barre représente la popularité des jeux selon les votes des joueurs dans le genre particulier.`;
  const descGraph3 = `Ce graphique présente la Popularité des jeux d'une plateforme entre les mois, permettant de suivre l'évolution de la popularité de cette plateforme sur une période donnée. 
  Vous pouvez sélectionner une plage de mois en choisissant un mois de début et un mois de fin à partir de menus déroulants. 
  Le graphique se mettra alors à jour pour afficher la popularité des jeux de certaines plateformes sur la période sélectionnée, sous forme de graphique linéaire. 
  Ce graphique permet de visualiser les tendances et variations de popularité selon les votes des joueurs au fil du temps.`;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8 ">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono mb-10">
          Visualisation des Données de Jeux Vidéo
        </h2>
        <div className="flex flex-wrap justify-center gap-12 mt-10">
          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
            Top 10 des jeux d'une plateforme
            </h3>
            <div className="text-center mb-4">
              <label htmlFor="platform-select" className="mr-2">La platforme choisie:</label>
              <select 
                id="platform-select" 
                value={curroption} 
                onChange={async (e) => {
                  const selectedOption = e.target.value;
                  setcurroption(selectedOption);
                  handleOption(selectedOption);
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
            <Bar data={data} options={options} />
            <button 
              onClick={() => handleOpenPopUp("Graphique 1", descGraph1)} 
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono hover:scale-105"
            >
              Voir Détails
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              Top 10 des jeux d'un genre
            </h3>
            <div className="text-center mb-4">
              <label htmlFor="platform-select" className="mr-2">Le genre choisi:</label>
              <select 
                id="platform-select" 
                value={curroption1} 
                onChange={async (e) => {
                  const selectedOption = e.target.value;
                  setcurroption1(selectedOption);
                  handleOption1(selectedOption);
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
              Popularité des jeux de certaines plateformes entre les mois
            </h3>

            <div className="mb-4 text-center">
              <label htmlFor="start-month" className="mr-2">Début mois:</label>
              <select
                id="start-month"
                value={values[0]}
                onChange={(e) => handleMonthRangeChange(Number(e.target.value), values[1])}
                className="p-2 border rounded"
              >
                {Array.from({ length: 13 }, (_, i) => i).map((month) => (
                  <option key={month} value={month}>
                    {months[month-1]}
                  </option>
                ))}
              </select>

              <label htmlFor="end-month" className="mr-2 ml-4">Fin mois:</label>
              <select
                id="end-month"
                value={values[1]}
                onChange={(e) => handleMonthRangeChange(values[0], Number(e.target.value))}
                className="p-2 border rounded"
              >
                {Array.from({ length: 13 }, (_, i) => i).map((month) => (
                  <option key={month} value={month}>
                    {months[month-1]}
                  </option>
                ))}
              </select>
            </div>

            <Line data={data2Months} />

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
            <button onClick={() => setOpenPopUp(false)} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
