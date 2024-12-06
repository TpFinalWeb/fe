import React from "react";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);



export default function LineChart(){
  const labels = ["January", "February", "March", "April", "May", "June"];

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
          "#fff",
          "#FE452A",
        ],
        borderColor: [
          "rgba(0,0,0,1)"
        ],
      },
    ],
  };
  
  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Bar data={data} />

      <Line data={data} />

      <Pie data={data} />
    </div>
  );
}