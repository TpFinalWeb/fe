import React, { useEffect, useState } from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { GraphService } from "../../axios/service/graph.service.ts";

Chart.register(CategoryScale);

function GenrePopularity() {
  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [dataset, setDataset] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState({ title: "", description: "" });
  const [datasets1, setDatasets1] = useState([]);
  const [labels1, setLabels1] = useState([]);
  const [colors1, setColors1] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await GraphService.getAllGenres();
        const filteredGenres = data.aggregation
          .filter((genre: any) => genre.count > 2000)
          .map((genre: any) => genre.genre_name);
        setGenreOptions(filteredGenres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

     const fetchData2 = async () => {
        const response = await GraphService.getPlatformPopularity();
        const data = response.aggregation;
        console.log(data);
        let accum = 0;
        const updatedData = data.reduce(
          (acc, item) => {
          if (item.count < 1) {
            accum += item.count;
            if (!acc.platforms.includes("Others")) {
            acc.platforms.push("Others");
            acc.count.push(accum);
            } else {
            acc.count[acc.platforms.indexOf("Others")] = accum;
            }
          } else {
            acc.platforms.push(item.genre_name);
            acc.count.push(item.count);
          }
          return acc;
          },
          { platforms: [], count: [] }
        );
    
        setLabels1(updatedData.platforms);
        setDatasets1(updatedData.count);
        
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
        
        };
    fetchGenres();
    fetchData2();
  }, []);


   

  const handleOpenPopUp = (title: string, description: string) => {
    setPopUpContent({ title, description });
    setOpenPopUp(true);
  };

  const data1 = {
    
    labels: labels1,
    datasets: [
      {
        label: "Genre Popularity",
        data: datasets1,
        backgroundColor: colors1,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value: any) {
            const label = this.getLabelForValue(value);
            return label.length > 10 ? `${label.substring(0, 10)}...` : label;
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono">
          Genre Popularity Over the Years
        </h2>
        <div className="flex flex-wrap justify-center gap-12 mt-10">
          <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:scale-105 hover:shadow-lg cursor-pointer">
            <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
              Genre Popularity Chart
            </h3>
             <Line data={data1}/>
            <button 
              onClick={() => handleOpenPopUp("Graphique 1", "")} 
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono"
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
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );  
}

export default GenrePopularity;
