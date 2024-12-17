import React from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import {GraphService} from "../../axios/service/graph.service.ts";
Chart.register(CategoryScale);

function Plateformes() {
  const [datasets, setDatasets] = useState(["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"]);
  const [labels, setLabels] = useState([35, 25, 22, 20, 18, 15]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const response = await GraphService.getPlatformsWhereGamesReleaseFirst();
    const data = response.aggregation;
    console.log(data);
    let accum = 0;
    const updatedData = data.reduce(
      (acc, item) => {
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
    
    let colorsArray = [];
    for (let i = 0; i < updatedData.platforms.length; i++) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colorsArray.push(color);
      console.log(color); 
    }
    setColors(colorsArray);
    
    };
    fetchData();
  }, []);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: datasets,
        backgroundColor: colors,
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
        <HeaderMain />
        <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8 ">
            <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono mb-10">
                Visualisation des Données de platformes
            </h2>
            <div className="flex flex-wrap justify-center gap-12 mt-10">
                <div className="bg-white shadow-md rounded-lg p-10 w-[500px] ">
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 1
                    </h3>
                    <Bar data={data} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-10 w-[500px] ">
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 2
                    </h3>
                    <Line data={data}/>
                </div>
                <div className="bg-white shadow-md shadow-md rounded-lg p-14 w-[500px] ">
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 3
                    </h3>
                    <Pie data={data} />
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}

export default Plateformes;
