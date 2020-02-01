import React, { useState, useEffect } from "react";
import { Route, NavLink, Switch, Redirect, Link } from "react-router-dom";

import "./css/App.css";
import API from "./adapters/API";
import logo from "./images/overwatcher_logo.png";
import SignUpContainer from "./components/SignUpForm";
import SignInContainer from "./components/SignInForm";
import GamesContainer from "./containers/GamesContainer";
import NavBar from "./components/NavBar";

const App = () => {
  const [user, setUser] = useState(null);
  const [validatedUser, setValidatedUser] = useState(false);
  const [activeSeason, setActiveSeason] = useState(1);
  const [seasonData, setSeasonData] = useState({});

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(handleUser)
        .then(() => setValidatedUser(true));
    } else {
      setValidatedUser(false);
    }
  }, []);

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

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <Header /> */}
        <img src={logo} alt='Overwatcher logo' />
      </header>
      {user ? <NavBar /> : null}
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
              Logged in as {user.username}
              <Link to='' onClick={() => logout()}>
                {" "}
                log out
              </Link>
              <GamesContainer gamesData={seasonData.games} />
            </div>
          ) : (
            <Redirect to='/signup' />
          )}
        </Route>
        <Route exact path='/stats'></Route>
      </Switch>
    </div>
  );
};

export default App;
