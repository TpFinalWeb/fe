import React from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Genres() {
  const data = {
    labels: ["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"],
    datasets: [
      {
        label: "# of Votes",
        data: [35, 25, 22, 20, 18, 15],
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#FFFFFF",
          "#FE452A",
        ],
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
                Visualisation des Données de genres
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

export default Genres;
