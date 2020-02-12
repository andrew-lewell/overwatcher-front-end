import React, { useState } from "react";
import { Button, Form, Select, Input } from "semantic-ui-react";

import API from "../adapters/API";
import "./GameForm.css";

const UpdateGameForm = ({
  // activeSeason,
  handleUpdate,
  gameData,
  setDisplayEditGameForm
}) => {
  const [formData, setFormData] = useState({
    // season: activeSeason,
    map: gameData.map.id,
    hero: gameData.hero.id,
    result: gameData.result,
    sr: gameData.sr
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetErrors = () => {
    setIsError(false);
    setErrorMessage("");
  };

  const handleMapChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    });
  };

  const handleHeroChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    });
  };

  const handleResultChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    });
  };

  const handleSrChange = (event, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetErrors();

    if (formData.sr === "" || formData.sr === null) {
      setIsError(true);
      setErrorMessage("Error: Please enter an SR rating value.");
    } else if (formData.sr < 0 || formData.sr > 4500) {
      setIsError(true);
      setErrorMessage(
        "Error: Please enter a positive SR rating value between 0 and 4500."
      );
    } else if (isNaN(formData.sr)) {
      setIsError(true);
      setErrorMessage("Error: Please enter a numeric SR rating value.");
    } else {
      API.patchGame(
        gameData.id,
        formData.season,
        formData.map,
        formData.hero,
        formData.result,
        formData.sr
      )
        .then(gameResp => handleUpdate(gameResp))
        .then(setDisplayEditGameForm(false));
    }
  };

  const formStyle = {
    margin: "0 auto",
    width: "200px"
  };

  const mapOptions = [
    { value: "2", text: "Busan" },
    { value: "3", text: "Dorado" },
    { value: "4", text: "Eichenwalde" },
    { value: "5", text: "Hanamura" },
    { value: "9", text: "Ilios" },
    { value: "11", text: "King's Row" },
    { value: "14", text: "Numbani" },
    { value: "15", text: "Oasis" },
    { value: "17", text: "Rialto" },
    { value: "19", text: "Temple of Anubis" },
    { value: "20", text: "Volskaya Industries" }
  ];

  const heroOptions = [
    { value: "1", text: "Ana" },
    { value: "2", text: "Ashe" },
    { value: "3", text: "Baptiste" },
    { value: "4", text: "Bastion" },
    { value: "5", text: "Brigitte" },
    { value: "6", text: "D.Va" },
    { value: "7", text: "Doomfist" },
    { value: "8", text: "Genji" },
    { value: "9", text: "Hanzo" },
    { value: "10", text: "Junkrat" },
    { value: "11", text: "Lucio" },
    { value: "12", text: "Mccree" },
    { value: "13", text: "Mei" },
    { value: "14", text: "Mercy" },
    { value: "15", text: "Moira" },
    { value: "16", text: "Orisa" },
    { value: "17", text: "Pharah" },
    { value: "18", text: "Reaper" },
    { value: "19", text: "Reinhardt" },
    { value: "20", text: "Roadhog" },
    { value: "21", text: "Sigma" },
    { value: "22", text: "Soldier: 76" },
    { value: "23", text: "Sombra" },
    { value: "24", text: "Symmetra" },
    { value: "25", text: "Torbjörn" },
    { value: "26", text: "Tracer" },
    { value: "27", text: "Widowmaker" },
    { value: "28", text: "Winston" },
    { value: "29", text: "Wrecking Ball" },
    { value: "30", text: "Zarya" },
    { value: "31", text: "Zenyatta" }
  ];

  const resultOptions = [
    { value: "win", text: "Win" },
    { value: "loss", text: "Loss" },
    { value: "draw", text: "Draw" }
  ];

  return (
    <div>
      <br />
      <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Field>
          <Select
            placeholder={gameData.map.map}
            options={mapOptions}
            name='map'
            onChange={handleMapChange}
          />
        </Form.Field>
        <Form.Field>
          <Select
            placeholder={gameData.hero.name}
            options={heroOptions}
            name='hero'
            onChange={handleHeroChange}
          />
        </Form.Field>
        <Form.Field>
          <Select
            placeholder={gameData.result}
            options={resultOptions}
            onChange={handleResultChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder={gameData.sr}
            name='sr'
            onChange={handleSrChange}
          />
        </Form.Field>
        <span className='errorHandling'>{isError ? errorMessage : null}</span>
        <br />
        <Button type='submit'>Edit Record</Button>
      </Form>
    </div>
  );
};

export default UpdateGameForm;
