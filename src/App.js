import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  Link
} from "react-router-dom";

import "./css/App.css";
import API from "./adapters/API";
import logo from "./images/overwatcher_logo.png";
import SignUpContainer from "./components/SignUpForm";
import SignInContainer from "./components/SignInForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [validatedUser, setValidatedUser] = useState(false);

  useEffect(() => {
    if (API.hasToken()) {
      API.validate()
        .then(handleUser)
        .then(() => setValidatedUser(true));
    } else {
      setValidatedUser(false);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setValidatedUser(false);
    API.clearToken();
  };

  const handleUser = user => {
    setUser(user);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <Header /> */}
        <img src={logo} alt="Overwatcher logo" />
      </header>
      <Router>
        <Switch>
          <Route exact path="/signup">
            {!user ? (
              <div>
                <SignUpContainer onSuccess={handleUser} user={user} />
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!user ? (
              <div>
                <SignInContainer onSuccess={handleUser} user={user} />
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/">
            {user ? (
              <div>
                Logged in as {user.username}
                <Link to="" onClick={() => logout()}>
                  {" "}
                  log out
                </Link>
              </div>
            ) : (
              <Redirect to="/signup" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
