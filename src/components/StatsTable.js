import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";

import API from "../adapters/API";

const StatsTable = () => {
  const [heroStats, setHeroStats] = useState([]);
  const [column, setColumn] = useState("name");
  const [direction, setDirection] = useState("ascending");

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => setHeroStats(stats));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSort = clickedColumn => {
    if (column !== clickedColumn) {
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
    "Win %",
    "Loss %",
    "Draw %"
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
              key={index}
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

  const renderTableRows = heroStats.map((obj, index) => {
    return (
      <Table.Row key={index}>
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
    );
  });

  return (
    <Table sortable>
      {renderTableHeaders}
      <Table.Body>{renderTableRows}</Table.Body>
    </Table>
  );
};

export default StatsTable;
