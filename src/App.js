import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import "./css/App.css";
import API from "./adapters/API";
import logo from "./images/overwatcher_logo.png";
import SignUpContainer from "./components/SignUpForm";
import SignInContainer from "./components/SignInForm";
import GamesContainer from "./containers/GamesContainer";
import NavBar from "./components/NavBar";
import StatsContainer from "./containers/StatsContainer";
import GraphsContainer from "./containers/GraphsContainer";

const App = () => {
  const [user, setUser] = useState(null);
  const [validatedUser, setValidatedUser] = useState(false);
  const [activeSeason] = useState(1);
  const [seasonData, setSeasonData] = useState({});

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(handleUser)
        .then(() => setValidatedUser(true));
    } else {
      setValidatedUser(false);
    }
  }, [validatedUser]);

  useEffect(() => {
    handleSeasonFetch(activeSeason);
  }, [activeSeason]);

  const logout = () => {
    setUser(null);
    setValidatedUser(false);
    API.clearToken();
  };

  const handleUser = user => {
    setUser(user);
  };

  const handleSeasonFetch = seasonId => {
    API.fetchSeason(seasonId).then(seasonData => setSeasonData(seasonData));
  };

  const handleNewGamePost = newGame => {
    const updatedGamesList = [newGame, ...seasonData.games];

    setSeasonData(prevSeasonData => ({
      ...prevSeasonData,
      games: updatedGamesList
    }));
  };

  const handleUpdateGamePost = updatedGame => {
    const updatedGamesList = seasonData.games.filter(
      game => game.id !== updatedGame.id
    );

    setSeasonData(prevSeasonData => ({
      ...prevSeasonData,
      games: [updatedGame, ...updatedGamesList]
    }));
  };

  const handleGameDelete = gameId => {
    const updatedGamesList = seasonData.games.filter(
      game => game.id !== gameId
    );

    API.deleteGame(gameId).then(
      setSeasonData(prevSeasonData => ({
        ...prevSeasonData,
        games: updatedGamesList
      }))
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <Header /> */}
        <img src={logo} alt='Overwatcher logo' />
      </header>
      {user ? <NavBar logout={logout} /> : null} <br />
      <Switch>
        <Route exact path='/signin'>
          {!user ? (
            <div>
              <SignInContainer onSuccess={handleUser} user={user} />
            </div>
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path='/signup'>
          {!user ? (
            <div>
              <SignUpContainer onSuccess={handleUser} user={user} />
            </div>
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path='/'>
          {user ? (
            <div>
              {/* Welcome back, {user.username}! */}
              <GamesContainer
                gamesData={seasonData.games}
                handleDelete={handleGameDelete}
                activeSeason={activeSeason}
                handleNewGamePost={handleNewGamePost}
                handleUpdate={handleUpdateGamePost}
              />
            </div>
          ) : (
            <Redirect to='/signup' />
          )}
        </Route>
        <Route exact path='/stats'>
          <StatsContainer />
        </Route>
        <Route exact path='/graphs'>
          <GraphsContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
