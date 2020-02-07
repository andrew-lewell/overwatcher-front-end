import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

import API from "../adapters/API";
import "./GameForm.css";

const UpdateGameForm = ({
  activeSeason,
  handleUpdate,
  gameData,
  setDisplayEditGameForm
}) => {
  const [formData, setFormData] = useState({
    season: activeSeason,
    map: gameData.map.id,
    hero: gameData.hero.id,
    result: gameData.result,
    sr: gameData.sr
  });

  const handleFormChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
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
    // ).then(console.log);
    // console.log(gameData);
  };

  const formStyle = {
    margin: "0 auto",
    width: "200px"
  };

  return (
    <div>
      <Form
        style={formStyle}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      >
        <Form.Field>
          <label for='map'>Map: </label>
          <select name='map' defaultValue={formData.map}>
            <option value='2'>Busan</option>
            <option value='3'>Dorado</option>
            <option value='4'>Eichenwalde</option>
            <option value='5'>Hanamura</option>
            <option value='9'>Ilios</option>
            <option value='11'>King's Row</option>
            <option value='14'>Numbani</option>
            <option value='15'>Oasis</option>
            <option value='17'>Rialto</option>
            <option value='19'>Temple of Anubis</option>
            <option value='20'>Volskaya Industries</option>
          </select>
        </Form.Field>
        {/* <br /> */}
        <Form.Field>
          <label>Hero: </label>
          <select name='hero' defaultValue={formData.hero}>
            <option value='1'>Ana</option>
            <option value='2'>Ashe</option>
            <option value='3'>Baptiste</option>
            <option value='4'>Bastion</option>
            <option value='5'>Brigitte</option>
            <option value='6'>D.Va</option>
            <option value='7'>Doomfist</option>
            <option value='8'>Genji</option>
            <option value='9'>Hanzo</option>
            <option value='10'>Junkrat</option>
            <option value='11'>Lucio</option>
            <option value='12'>Mccree</option>
            <option value='13'>Mei</option>
            <option value='14'>Mercy</option>
            <option value='15'>Moira</option>
            <option value='16'>Orisa</option>
            <option value='17'>Pharah</option>
            <option value='18'>Reaper</option>
            <option value='19'>Reinhardt</option>
            <option value='20'>Roadhog</option>
            <option value='21'>Sigma</option>
            <option value='22'>Soldier: 76</option>
            <option value='23'>Sombra</option>
            <option value='24'>Symmetra</option>
            <option value='25'>Torbjörn</option>
            <option value='26'>Tracer</option>
            <option value='27'>Widowmaker</option>
            <option value='28'>Winston</option>
            <option value='29'>Wrecking Ball</option>
            <option value='30'>Zarya</option>
            <option value='31'>Zenyatta</option>
          </select>
        </Form.Field>
        {/* <br /> */}
        <Form.Field>
          <label>Result: </label>
          <select name='result' defaultValue={formData.result}>
            <option value='win'>Win</option>
            <option value='loss'>Loss</option>
            <option value='draw'>Draw</option>
          </select>
        </Form.Field>
        {/* <br /> */}
        <Form.Field>
          <label>SR: </label>
          <input
            label='sr'
            type='text'
            name='sr'
            defaultValue={formData.sr}
          ></input>
        </Form.Field>
        <br />
        <Button type='submit'>Edit Record</Button>
      </Form>
    </div>
  );
};

export default UpdateGameForm;
