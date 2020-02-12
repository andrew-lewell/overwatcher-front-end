import React, { useState } from "react";
import { Form, Button, Select, Input } from "semantic-ui-react";

import API from "../adapters/API";

const NewGameForm = ({
  activeSeasonId,
  handleNewGamePost,
  setDisplayNewGameForm
}) => {
  const [formData, setFormData] = useState({
    season: activeSeasonId,
    map: 2,
    hero: 1,
    result: "win",
    sr: null
  });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const handleFormChange = (event, data) => {
  //   console.log(data.name);
  //   console.log(data.text);
  //   console.log(data.value);
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value
  //   });
  // };

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

  const resetErrors = () => {
    setIsError(false);
    setErrorMessage("");
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
      API.postGame(
        formData.season,
        formData.map,
        formData.hero,
        formData.result,
        formData.sr
      ).then(gameResp => handleNewGamePost(gameResp));

      setDisplayNewGameForm(false);
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
      <span className='errorHandling'>{isError ? errorMessage : null}</span>
      <br />
      <Form
        style={formStyle}
        // onChange={handleFormChange}
        onSubmit={handleSubmit}
      >
        <Form.Field>
          <Select
            placeholder='Select Map'
            options={mapOptions}
            name='map'
            onChange={handleMapChange}
          />
          {/* <label>Map: </label>
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
          </select> */}
        </Form.Field>
        <Form.Field>
          <Select
            placeholder='Select Hero'
            options={heroOptions}
            name='hero'
            onChange={handleHeroChange}
          />
          {/* <label>Hero: </label>
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
          </select> */}
        </Form.Field>
        <Form.Field>
          <Select
            placeholder='Select Result'
            options={resultOptions}
            onChange={handleResultChange}
          />
          {/* <label>Result: </label>
          <select name='result'>
            <option value='win'>Win</option>
            <option value='loss'>Loss</option>
            <option value='draw'>Draw</option>
          </select> */}
        </Form.Field>
        <Form.Field>
          <Input
            placeholder='Enter SR Rating'
            name='sr'
            onChange={handleSrChange}
          />
          {/* <label>SR: </label>
          <input type='text' name='sr'></input> */}
        </Form.Field>
        <Button type='submit'>Add New Record</Button>
      </Form>
    </div>
  );
};

export default NewGameForm;
