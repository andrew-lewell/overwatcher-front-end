import React, { useState } from "react";
import { Button, Card, Image, Modal } from "semantic-ui-react";

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
  const [open, setOpen] = useState(false);

  const heroNameForImg = name => {
    return (
      name
        .replace(".", "")
        .replace(": ", "-")
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

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const styleByResult = result => {
    if (result === "win") {
      return "winHeadline";
    } else if (result === "loss") {
      return "lossHeadline";
    } else {
      return "drawHeadline";
    }
  };

  const cardStyle = {
    maxWidth: "400px",
    padding: "20px"
    // margin: "auto"
  };

  const resultNameChange = result => {
    if (result === "win") {
      return "Victory";
    } else if (result === "loss") {
      return "Defeat";
    } else {
      return "Draw";
    }
  };

  return (
    <Card
      // color={styleByResult(gameData.result)}
      style={cardStyle}
      className='grow'
    >
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
          <br />
          <span className={styleByResult(gameData.result)}>
            {resultNameChange(gameData.result).toUpperCase()}
          </span>
          <br />
          <br />
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
          <span>
            Hero: <b>{gameData.hero.name}</b>
          </span>
          <br />
          <span>
            Map: <b>{gameData.map.map}</b>
          </span>
          <br />
          <span>
            Rating: <b>{gameData.sr}</b>
          </span>
        </Card.Content>
        <br />
        <Card.Content extra>
          <div>
            <Button
              onClick={() => setDisplayEditGameForm(!displayEditGameForm)}
            >
              Edit
            </Button>
            <Button onClick={() => showModal()}>Delete</Button>
            {displayEditGameForm ? (
              <UpdateGameForm
                gameData={gameData}
                handleUpdate={handleUpdate}
                setDisplayEditGameForm={setDisplayEditGameForm}
              />
            ) : null}
            <Modal size='mini' open={open} onClose={() => closeModal()}>
              <Modal.Header>Delete This Record</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want to delete this record?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => closeModal()}>
                  No
                </Button>
                <Button
                  positive
                  icon='checkmark'
                  labelPosition='right'
                  content='Yes'
                  onClick={() => {
                    handleDelete(gameData.id);
                    closeModal();
                  }}
                />
              </Modal.Actions>
            </Modal>
          </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default GameCard;
