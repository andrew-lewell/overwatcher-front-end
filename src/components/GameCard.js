import React, { useState } from "react";
import { Button, Card, Image, Icon } from "semantic-ui-react";

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
    if (result === "win") {
      return "green";
    } else if (result === "loss") {
      return "red";
    } else {
      return "black";
    }
  };

  const cardStyle = {
    maxWidth: "400px"
  };

  return (
    <Card color={styleByResult(gameData.result)} style={cardStyle}>
      <Image
        src={map_images[mapNameForImg(gameData.map.map)]}
        wrapped
        ui={false}
        alt='map'
        className='mapImg'
        size='large'
      />
      <Card.Content>
        {/* <Card.Header>{gameData.result.toUpperCase()}</Card.Header> */}
        {/* <Card.Meta></Card.Meta> */}
        <Card.Content>
          <br />
          <span></span>
          <br />
          <b>{gameData.result.toUpperCase()}</b>
          <br />
          <span>{gameData.hero.name}</span>
          <Image
            src={hero_images[heroNameForImg(gameData.hero.name)]}
            size='small'
            circular
            bordered
            verticalAlign='bottom'
            floated='left'
            alt='hero'
            className='heroImg'
          />
          <br />
          <span>{gameData.map.map}</span>
          <br />
          <span>{gameData.sr} rating</span>
        </Card.Content>
        <br />
        <Card.Content extra>
          <div>
            <Button
              onClick={() => setDisplayEditGameForm(!displayEditGameForm)}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(gameData.id)}>Delete</Button>
            {displayEditGameForm ? (
              <UpdateGameForm
                gameData={gameData}
                handleUpdate={handleUpdate}
                setDisplayEditGameForm={setDisplayEditGameForm}
              />
            ) : null}
          </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default GameCard;
