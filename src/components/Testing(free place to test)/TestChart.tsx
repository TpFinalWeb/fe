import React from "react";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);



export default function LineChart(){
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
      {
        label: "My First dataset",
        backgroundColor: "rgb(0, 99, 132)",
        borderColor: "rgb(0, 0, 132)",
        data: [0, 100, 50, 290, 200, 300, 405],
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