import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale, ChartData } from "chart.js";
import { AggregationService } from "../../axios/service/aggregation.service.ts";
Chart.register(CategoryScale);



export default function LineChart(){
  const [platforms, setPlatforms] = useState([]);
  const [data, setData] = useState<{labels: any, datasets: any}>();

  const fetchPlateformData = async () => {
    const plateformData = await AggregationService.getPlatformsWhereGamesReleaseFirst();

    setPlatforms(plateformData.slice(0, 10));
  }

  useEffect(() => {
    fetchPlateformData();
  }, []);

  useEffect(() => {
    setData({
      labels: platforms.map((platform) => platform['platform']),
      datasets: [
      {
      label: "number of first releases",
      data: platforms.map((platform) => platform['gameCount']),
      backgroundColor: platforms.map(() => `#${Math.floor(Math.random() * 15658734 + 1000000).toString(16)}`),
      borderColor: [
        "rgba(0,0,0,1)"
      ],
      },
    ],
    })
  }, [platforms]);

  
  return (
    <div style={{ height: "700px", width: "1200px" }}>
      {
        // si le usestate est vide ne rien afficher
        platforms[0] && data != undefined ?
        <Pie data={data} /> :
        null
      }
      
    </div>
  );
}