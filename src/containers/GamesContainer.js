import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import NewGameForm from "../components/NewGameForm";
import "./GamesContainer.css";

const GamesContainer = ({ gamesData }) => {
  const [displayNewGameForm, setDisplayNewGameForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(10);

  const indexOfLastGameCard = currentPage * gamesPerPage;
  const indexOfFirstGameCard = indexOfLastGameCard - gamesPerPage;
  const currentPageGames = gamesData.slice(
    indexOfFirstGameCard,
    indexOfLastGameCard
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(gamesData.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = event => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map(num => {
    return (
      <li
        key={num}
        id={num}
        onClick={handlePageClick}
        style={{
          color: num == currentPage ? "orange" : "black"
        }}
      >
        {num}
      </li>
    );
  });

  return (
    <div className='gamesContainer'>
      <div>
        {displayNewGameForm ? <NewGameForm /> : null}
        <button onClick={() => setDisplayNewGameForm(!displayNewGameForm)}>
          {displayNewGameForm ? "Hide Form" : "Add New Record"}
        </button>
      </div>
      {currentPageGames.map((game, index) => (
        <GameCard gameData={game} key={index} />
      ))}
      <ul className='pagination'>{renderPageNumbers}</ul>
    </div>
  );
};

GamesContainer.defaultProps = {
  gamesData: []
};

export default GamesContainer;
