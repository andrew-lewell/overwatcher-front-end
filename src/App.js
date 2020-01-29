import React, { useState, useEffect } from "react";
import "./css/App.css";
import Header from "./components/Header.js";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import API from "./adapters/API";
import logo from "./images/overwatcher_logo.png";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
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
                <Signup onSuccess={handleUser} user={user} />
                Already have an account? Please <Link to="/signin">
                  log in
                </Link>{" "}
                instead.
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!user ? (
              <div>
                <Signin onSuccess={handleUser} user={user} />
                Don't have an account? Please <Link to="/signup">
                  sign up
                </Link>{" "}
                instead.
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
}

export default App;
