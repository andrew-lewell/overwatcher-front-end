import React, { useState } from "react";
import API from "../adapters/API";

const NewGameForm = ({
  activeSeason,
  handleNewGamePost,
  setDisplayNewGameForm
}) => {
  const [formData, setFormData] = useState({
    season: activeSeason,
    map: 2,
    hero: 1,
    result: "win",
    sr: null
  });

  const handleFormChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.postGame(
      formData.season,
      formData.map,
      formData.hero,
      formData.result,
      formData.sr
    ).then(gameResp => handleNewGamePost(gameResp));

    setDisplayNewGameForm(false);
  };

  return (
    <div>
      <form onChange={handleFormChange} onSubmit={handleSubmit}>
        <label>Map: </label>
        <select name='map'>
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
        <br />
        <label>Hero: </label>
        <select name='hero'>
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
        <br />
        <label>Result: </label>
        <select name='result'>
          <option value='win'>Win</option>
          <option value='loss'>Loss</option>
          <option value='draw'>Draw</option>
        </select>
        <br />
        <label>SR: </label>
        <input type='text' name='sr'></input>
        <br />
        <input type='submit' value='Add New Record' />
      </form>
    </div>
  );
};

export default NewGameForm;
