import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

import API from "../adapters/API";
import Graph from "../components/Graph";

const GraphsContainer = () => {
  const [graphType, setGraphType] = useState(null);
  const [heroStats, setHeroStats] = useState([]);
  const [winPercByHero, setWinPercByHero] = useState([]);

  const dropDownOptions = [
    {
      key: "Win Percentage",
      text: "Win Percentage",
      value: "Win Percentage"
    }
  ];

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => setHeroStats(stats));
  };

  const winPercByHeroChart = {
    labels: heroStats.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgb(255,99,132",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: heroStats.map(hero => hero.win_perc)
      }
    ]
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (event, data) => {
    setGraphType(data.value);
  };

  return (
    <div>
      <Dropdown
        placeholder='Select graph'
        fluid
        selection
        options={dropDownOptions}
        onChange={handleChange}
      />
      {graphType === "Win Percentage" ? (
        <Graph chartData={winPercByHeroChart} chartOptions={chartOptions} />
      ) : null}
    </div>
  );
};

export default GraphsContainer;
