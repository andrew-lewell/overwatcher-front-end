import React, { useState } from "react";
import GameCard from "../components/GameCard";

const GamesContainer = ({ gamesData }) => {
  const [page, setPage] = useState(1);

  return (
    <div>
      {gamesData.map((game, index) => (
        <GameCard gameData={game} key={index} />
      ))}
      {/* {console.log(gamesData)} */}
    </div>
  );
};

GamesContainer.defaultProps = {
  gamesData: []
};

export default GamesContainer;
