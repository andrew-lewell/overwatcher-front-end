import React, { useState, useEffect } from "react";
import { Dropdown, Message } from "semantic-ui-react";

import API from "../adapters/API";
import Graph from "../components/Graph";

const GraphsContainer = () => {
  const [graphType, setGraphType] = useState(null);
  const [heroStats, setHeroStats] = useState([]);
  const [winPercByRole, setWinPercByRole] = useState([]);
  const [winPercByMap, setWinPercByMap] = useState([]);
  const [winPercByMapType, setWinPercByMapType] = useState([]);
  const [winPercBusan, setWinPercBusan] = useState([]);
  const [winPercDorado, setWinPercDorado] = useState([]);
  const [winPercEichenwalde, setWinPercEichenwalde] = useState([]);
  const [winPercHanamura, setWinPercHanamura] = useState([]);
  const [winPercIlios, setWinPercIlios] = useState([]);
  const [winPercKingsRow, setWinPercKingsRow] = useState([]);
  const [winPercNumbani, setWinPercNumbani] = useState([]);
  const [winPercOasis, setWinPercOasis] = useState([]);
  const [winPercRialto, setWinPercRialto] = useState([]);
  const [winPercTemple, setWinPercTemple] = useState([]);
  const [winPercVolskaya, setWinPercVolskaya] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

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
    },
    {
      key: "Win Percentage - Busan",
      text: "Win Percentage - Busan",
      value: "Win Percentage - Busan"
    },
    {
      key: "Win Percentage - Dorado",
      text: "Win Percentage - Dorado",
      value: "Win Percentage - Dorado"
    },
    {
      key: "Win Percentage - Eichenwalde",
      text: "Win Percentage - Eichenwalde",
      value: "Win Percentage - Eichenwalde"
    },
    {
      key: "Win Percentage - Hanamura",
      text: "Win Percentage - Hanamura",
      value: "Win Percentage - Hanamura"
    },
    {
      key: "Win Percentage - Ilios",
      text: "Win Percentage - Ilios",
      value: "Win Percentage - Ilios"
    },
    {
      key: "Win Percentage - King's Row",
      text: "Win Percentage - King's Row",
      value: "Win Percentage - King's Row"
    },
    {
      key: "Win Percentage - Numbani",
      text: "Win Percentage - Numbani",
      value: "Win Percentage - Numbani"
    },
    {
      key: "Win Percentage - Oasis",
      text: "Win Percentage - Oasis",
      value: "Win Percentage - Oasis"
    },
    {
      key: "Win Percentage - Rialto",
      text: "Win Percentage - Rialto",
      value: "Win Percentage - Rialto"
    },
    {
      key: "Win Percentage - Temple of Anubis",
      text: "Win Percentage - Temple of Anubis",
      value: "Win Percentage - Temple of Anubis"
    },
    {
      key: "Win Percentage - Volskaya Industries",
      text: "Win Percentage - Volskaya Industries",
      value: "Win Percentage - Volskaya Industries"
    }
  ];

  const dropdownStyle = {
    width: "300px",
    margin: "0 auto"
  };

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => setHeroStats(stats));
    API.fetchWinPercByRole().then(stats => setWinPercByRole(stats));
    API.fetchWinPercByMap().then(stats => setWinPercByMap(stats));
    API.fetchWinPercByMapType().then(stats => setWinPercByMapType(stats));
    API.fetchWinPercForMapId(2).then(stats => setWinPercBusan(stats));
    API.fetchWinPercForMapId(3).then(stats => setWinPercDorado(stats));
    API.fetchWinPercForMapId(4).then(stats => setWinPercEichenwalde(stats));
    API.fetchWinPercForMapId(5).then(stats => setWinPercHanamura(stats));
    API.fetchWinPercForMapId(9).then(stats => setWinPercIlios(stats));
    API.fetchWinPercForMapId(11).then(stats => setWinPercKingsRow(stats));
    API.fetchWinPercForMapId(14).then(stats => setWinPercNumbani(stats));
    API.fetchWinPercForMapId(15).then(stats => setWinPercOasis(stats));
    API.fetchWinPercForMapId(17).then(stats => setWinPercRialto(stats));
    API.fetchWinPercForMapId(19).then(stats => setWinPercTemple(stats));
    API.fetchWinPercForMapId(20).then(stats => setWinPercVolskaya(stats));
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

  const winPercBusanChart = {
    labels: winPercBusan.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercBusan.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercDoradoChart = {
    labels: winPercDorado.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercDorado.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercEichenwaldeChart = {
    labels: winPercEichenwalde.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercEichenwalde.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercHanamuraChart = {
    labels: winPercHanamura.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercHanamura.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercIliosChart = {
    labels: winPercIlios.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercIlios.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercKingsRowChart = {
    labels: winPercKingsRow.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercKingsRow.map(map => map.win_perc)
      }
    ]
  };

  const winPercNumbaniChart = {
    labels: winPercNumbani.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercNumbani.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercOasisChart = {
    labels: winPercOasis.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercOasis.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercRialtoChart = {
    labels: winPercRialto.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercRialto.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercTempleChart = {
    labels: winPercTemple.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercTemple.map(hero => hero.win_perc)
      }
    ]
  };

  const winPercVolskayaChart = {
    labels: winPercVolskaya.map(hero => hero.name),
    datasets: [
      {
        label: "Win rate",
        backgroundColor: "rgba(245, 166, 21, 0.50)",
        borderColor: "rgb(255, 153, 20)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(245, 166, 21, 0.90)",
        hoverBorderColor: "black",
        maxBarThickness: 70,
        data: winPercVolskaya.map(hero => hero.win_perc)
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
      ]
    },
    maintainAspectRatio: false
    // responsive: false
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (event, data) => {
    setGraphType(data.value);
  };

  const handleDismiss = () => {
    setShowMessage(false);
  };

  return (
    <div>
      {showMessage ? (
        <Message onDismiss={() => handleDismiss()}>
          Please select an option from the dropdown to view a chart.
        </Message>
      ) : null}
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
      {graphType === "Win Percentage - Busan" ? (
        <Graph chartData={winPercBusanChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Dorado" ? (
        <Graph chartData={winPercDoradoChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Eichenwalde" ? (
        <Graph
          chartData={winPercEichenwaldeChart}
          chartOptions={chartOptions}
        />
      ) : null}
      {graphType === "Win Percentage - Hanamura" ? (
        <Graph chartData={winPercHanamuraChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Ilios" ? (
        <Graph chartData={winPercIliosChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - King's Row" ? (
        <Graph chartData={winPercKingsRowChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Numbani" ? (
        <Graph chartData={winPercNumbaniChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Oasis" ? (
        <Graph chartData={winPercOasisChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Rialto" ? (
        <Graph chartData={winPercRialtoChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Temple of Anubis" ? (
        <Graph chartData={winPercTempleChart} chartOptions={chartOptions} />
      ) : null}
      {graphType === "Win Percentage - Volskaya Industries" ? (
        <Graph chartData={winPercVolskayaChart} chartOptions={chartOptions} />
      ) : null}
    </div>
  );
};

export default GraphsContainer;
