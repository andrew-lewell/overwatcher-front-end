import React, { useState } from "react";
import { Button, Loader, Dimmer, Card } from "semantic-ui-react";
import GameCard from "../components/GameCard";
import NewGameForm from "../components/NewGameForm";
import "./GamesContainer.css";

const GamesContainer = ({
  gamesData,
  handleDelete,
  activeSeason,
  handleNewGamePost,
  handleUpdate
}) => {
  const [displayNewGameForm, setDisplayNewGameForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  const indexOfLastGameCard = currentPage * gamesPerPage;
  const indexOfFirstGameCard = indexOfLastGameCard - gamesPerPage;
  const currentPageGames = gamesData
    ? gamesData.slice(indexOfFirstGameCard, indexOfLastGameCard)
    : [];

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
          color: num === currentPage ? "orange" : "black"
        }}
      >
        {num}
      </li>
    );
  });

  return (
    <div className='gamesContainer'>
      <div>
        {displayNewGameForm ? (
          <NewGameForm
            activeSeason={activeSeason}
            handleNewGamePost={handleNewGamePost}
            setDisplayNewGameForm={setDisplayNewGameForm}
          />
        ) : null}
        <br />
        <Button onClick={() => setDisplayNewGameForm(!displayNewGameForm)}>
          {displayNewGameForm ? "Hide Form" : "Add New Record"}
        </Button>{" "}
        <br />
      </div>
      {gamesData.length >= 1 ? null : (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </div>
      )}
      <div>
        <br />
        <Card.Group itemsPerRow={3} padded>
          {currentPageGames.map((game, index) => (
            <GameCard
              gameData={game}
              key={index}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </Card.Group>
        <ul className='pagination'>{renderPageNumbers}</ul>
      </div>
    </div>
  );
};

GamesContainer.defaultProps = {
  gamesData: []
};

export default GamesContainer;
