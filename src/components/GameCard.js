import React, { useState } from "react";

import "./GameCard.css";
import UpdateGameForm from "./UpdateGameForm";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const hero_images = importAll(
  require.context("../images/avatars", false, /\.(png|jpe?g|svg)$/)
);

const map_images = importAll(
  require.context("../images/maps", false, /\.(png|jpe?g|svg)$/)
);

const GameCard = ({ gameData, handleDelete, handleUpdate }) => {
  const [displayEditGameForm, setDisplayEditGameForm] = useState(false);

  const heroNameForImg = name => {
    return (
      name
        .replace(".", "")
        .split(" ")
        .join("-")
        .toLowerCase() + ".png"
    );
  };

  const mapNameForImg = name => {
    return (
      name
        .replace("'", "")
        .replace(": ", "-")
        .split(" ")
        .join("-")
        .toLowerCase() + ".jpg"
    );
  };

  const styleByResult = result => {
    if (result == "win") {
      return "winCard";
    } else if (result == "loss") {
      return "lossCard";
    } else {
      return "drawCard";
    }
  };

  return (
    <div className={styleByResult(gameData.result)}>
      <div>
        <h3>
          {" "}
          {gameData.map.map}
          {" - "}
          {gameData.result.toUpperCase()}
          {" - "}
          {gameData.sr} SR
        </h3>
        <img
          src={map_images[mapNameForImg(gameData.map.map)]}
          className='mapImg'
        />
        <img
          src={hero_images[heroNameForImg(gameData.hero.name)]}
          className='heroImg'
        />
      </div>
      <div>
        <button onClick={() => setDisplayEditGameForm(!displayEditGameForm)}>
          Edit
        </button>
        <button onClick={() => handleDelete(gameData.id)}>Delete</button>
      </div>
      <div>
        {displayEditGameForm ? (
          <UpdateGameForm
            gameData={gameData}
            handleUpdate={handleUpdate}
            setDisplayEditGameForm={setDisplayEditGameForm}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GameCard;
