import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";

import API from "../adapters/API";

const StatsTable = () => {
  const [heroStats, setHeroStats] = useState([]);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => setHeroStats(stats));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSort = clickedColumn => {
    if (column !== clickedColumn) {
      console.log("I'm handling sort");
      setColumn(clickedColumn);
      setHeroStats(_.sortBy(heroStats, [clickedColumn]));
      setDirection("ascending");
      return;
    }
    setHeroStats(heroStats.reverse());
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  const tableHeaders = [
    "Name",
    "Role",
    "Wins",
    "Losses",
    "Draws",
    "Total",
    "W %",
    "L %",
    "D %"
  ];

  const rawTableHeaders = [
    "name",
    "role",
    "total_wins",
    "total_losses",
    "total_draws",
    "total_games",
    "win_perc",
    "loss_perc",
    "draw_perc"
  ];

  const renderTableHeaders = (
    <Table.Header>
      <Table.Row>
        {tableHeaders.map((col, index) => {
          return (
            <Table.HeaderCell
              sorted={column === col ? direction : null}
              onClick={() => handleSort(rawTableHeaders[index])}
            >
              {col}
            </Table.HeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );

  const renderTableRows = heroStats.map(obj => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{obj.name}</Table.Cell>
          <Table.Cell>{obj.role}</Table.Cell>
          <Table.Cell>{obj.total_wins}</Table.Cell>
          <Table.Cell>{obj.total_losses}</Table.Cell>
          <Table.Cell>{obj.total_draws}</Table.Cell>
          <Table.Cell>{obj.total_games}</Table.Cell>
          <Table.Cell>{obj.win_perc}</Table.Cell>
          <Table.Cell>{obj.loss_perc}</Table.Cell>
          <Table.Cell>{obj.draw_perc}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  });

  return (
    <Table celled sortable fixed>
      {renderTableHeaders}
      {renderTableRows}
      {/* <Stats /> */}
    </Table>
  );
};

export default StatsTable;
