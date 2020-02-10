import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Message } from "semantic-ui-react";

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
  const [activeSeason] = useState(20);
  const [activeSeasonId, setActiveSeasonId] = useState(null);
  const [seasonData, setSeasonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (API.hasToken()) {
      API.validate().then(handleUser);
    } else {
      setValidatedUser(false);
    }
  }, []);

  useEffect(() => {
    API.getSeasonId().then(seasons => {
      console.log("seasons fetch resp", seasons);
      setActiveSeasonId(seasons[0].id);
    });
  }, [validatedUser]);

  useEffect(() => {
    activeSeasonId && handleSeasonFetch(activeSeasonId);
  }, [activeSeasonId]);

  const clearState = () => {
    setUser(null);
    setValidatedUser(false);
    setSeasonData({});
    setActiveSeasonId(null);
    setIsLoading(true);
  };

  const logout = () => {
    clearState();
    API.clearToken();
    // <Redirect to='/signup' />;
  };

  const handleUser = user => {
    setUser(user);
    setValidatedUser(true);
  };

  const handleSeasonFetch = seasonId => {
    API.fetchSeason(seasonId).then(seasonData => {
      setSeasonData(seasonData);
      setIsLoading(false);
    });
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

  const handleDismiss = () => {
    setShowMessage(false);
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
              <SignUpContainer
                onSuccess={handleUser}
                user={user}
                activeSeason={activeSeason}
                setActiveSeasonId={setActiveSeasonId}
              />
            </div>
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path='/'>
          {user ? (
            <div>
              {showMessage ? (
                <Message onDismiss={() => handleDismiss()}>
                  Welcome back to Overwatcher, {user.username}! This tool helps
                  you track your performance in Overwatch. <br />
                  {/* On this Home page, you can add/edit/delete game records.{" "}
                  <br />
                  On the Stats page, you can see your raw aggregated data.{" "}
                  <br />
                  On the Graphs page, you can visualize your performance data. */}
                </Message>
              ) : null}
              <GamesContainer
                gamesData={seasonData.games}
                handleDelete={handleGameDelete}
                activeSeasonId={activeSeasonId}
                handleNewGamePost={handleNewGamePost}
                handleUpdate={handleUpdateGamePost}
                isLoading={isLoading}
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
