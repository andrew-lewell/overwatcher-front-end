import React, { useState, useEffect } from "react";
import { Table, Message } from "semantic-ui-react";
import _ from "lodash";

import API from "../adapters/API";

const StatsTable = () => {
  const [heroStats, setHeroStats] = useState([]);
  const [column, setColumn] = useState("name");
  const [direction, setDirection] = useState("ascending");
  const [strongestHero, setStrongestHero] = useState(null);
  const [strongestTank, setStrongestTank] = useState(null);
  const [strongestSupport, setStrongestSupport] = useState(null);
  const [strongestDamage, setStrongestDamage] = useState(null);
  const [threeRoles, setThreeRoles] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const fetchStats = () => {
    API.fetchHeroStats().then(stats => {
      setHeroStats(stats);
      // console.log(stats[0].role_count);

      if (stats.length > 0) {
        setStrongestHero(stats[0].name);
      }

      API.fetchWinPercByRole().then(stats => {
        console.log(stats);
        if (stats.length === 3) {
          setThreeRoles(true);
        }
      });
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (threeRoles === true) {
      const tank = heroStats.find(hero => hero.role === "tank");
      console.log(heroStats);
      setStrongestTank(tank.name);

      const supp = heroStats.find(hero => hero.role === "support");
      if (supp !== undefined) {
        setStrongestSupport(supp.name);
      }

      const dmg = heroStats.find(hero => hero.role === "damage");
      if (dmg !== undefined) {
        setStrongestDamage(dmg.name);
      }
    }
  }, [heroStats, threeRoles]);

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

  const handleDismiss = () => {
    setShowMessage(false);
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
    <>
      {showMessage ? (
        <>
          {heroStats.length > 3 ? (
            <Message onDismiss={() => handleDismiss()}>
              Based on your performance data, your overall strongest hero is{" "}
              <b>{strongestHero}</b>. <br />
            </Message>
          ) : (
            <Message>
              Please play more games to see performance analysis!
            </Message>
          )}
        </>
      ) : null}
      <Table sortable>
        {renderTableHeaders}
        <Table.Body>{renderTableRows}</Table.Body>
      </Table>
    </>
  );
};

export default StatsTable;
