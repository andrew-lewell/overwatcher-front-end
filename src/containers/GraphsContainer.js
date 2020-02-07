import React, { useState, useEffect } from "react";
import { Dropdown, Progress } from "semantic-ui-react";

import API from "../adapters/API";
import Graph from "../components/Graph";

const GraphsContainer = () => {
  const [graphType, setGraphType] = useState(null);
  const [heroStats, setHeroStats] = useState([]);
  const [winPercByRole, setWinPercByRole] = useState([]);
  const [winPercByMap, setWinPercByMap] = useState([]);
  const [winPercByMapType, setWinPercByMapType] = useState([]);

  const dropDownOptions = [
    {
      key: "Win Percentage",
      text: "Win Percentage",
      value: "Win Percentage"
    },
    {
      key: "Win Percentage By Role",
      text: "Win Percentage By Role",
      value: "Win Percentage By Role"
    },
    {
      key: "Win Percentage By Map",
      text: "Win Percentage By Map",
      value: "Win Percentage By Map"
    },
    {
      key: "Win Percentage By Map Type",
      text: "Win Percentage By Map Type",
      value: "Win Percentage By Map Type"
    }
  ];

  const dropdownStyle = {
    width: "250px",
    margin: "0 auto"
  };

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => setHeroStats(stats));
    API.fetchWinPercByRole().then(stats => setWinPercByRole(stats));
    API.fetchWinPercByMap().then(stats => setWinPercByMap(stats));
    API.fetchWinPercByMapType().then(stats => setWinPercByMapType(stats));
  };

  const winPercByHeroChart = {
    labels: heroStats.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        data: heroStats.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercByRoleChart = {
    labels: winPercByRole.map(role => role.role),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercByRole.map(role => role.win_perc)
      }
    ]
  };

  const winPercByMapChart = {
    labels: winPercByMap.map(map => map.map),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        data: winPercByMap.map(map => map.win_perc)
      }
    ]
  };

  const winPercByMapTypeChart = {
    labels: winPercByMapType.map(map => map.map_type),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercByMapType.map(map => map.win_perc)
      }
    ]
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          position: "top",
          ticks: {
            beginAtZero: true,
            max: 100
          }
        }
      ],
      yAxes: [
        {
          barPercentage: 0.9
        }
      ]
    },
    animation: {
      duration: 100000000
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
        style={dropdownStyle}
      />
      {graphType === "Win Percentage" ? (
        <Graph chartData={winPercByHeroChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage By Role" ? (
        <Graph chartData={winPercByRoleChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage By Map" ? (
        <Graph chartData={winPercByMapChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage By Map Type" ? (
        <Graph chartData={winPercByMapTypeChart} chartOptions={chartOptions} />
      ) : null}
    </div>
  );
};

export default GraphsContainer;
