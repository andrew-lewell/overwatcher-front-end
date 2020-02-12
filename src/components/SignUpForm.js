import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

import API from "../adapters/API";

const SignUpForm = ({ onSuccess, user, activeSeason, setActiveSeasonId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [usernameError, setUsernameError] = useState("");

  const resetErrors = () => {
    setErrors([]);
    setUsernameError("");
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetErrors();

    if (/^\s+$/.test(username)) {
      setUsernameError("Error: please enter a valid username.");
      console.log(usernameError);
    } else {
      API.signup({ username, email, password })
        .catch(errorPromise => {
          errorPromise.then(errorData => {
            setErrors(errorData);
            console.log(errorData);
          });
        })
        .then(user => {
          API.postSeason(activeSeason).then(season => {
            setActiveSeasonId(season.id);
          });
          onSuccess(user);
        });
    }
  };

  const formStyle = {
    margin: "0 auto",
    width: "200px"
  };

  return (
    <div>
      <Form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <h2>Create an account</h2>
          {errors.error && (
            <div style={{ color: "red" }}>{errors.error.join(", ")}</div>
          )}
          {usernameError && <div style={{ color: "red" }}>{usernameError}</div>}
          <input
            type='text'
            name='username'
            placeholder='Username...'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email...'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password...'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <br />
        <Button type='submit'>Submit</Button>
        <br />
      </Form>
      <br />
      Already have an account? Please <Link to='/signin'>sign in</Link> instead.
    </div>
  );
};

export default SignUpForm;
