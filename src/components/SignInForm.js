import React, { useState } from "react";
import API from "../adapters/API";
import { Redirect, Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

const SignInForm = ({ onSuccess, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    API.signin({ email, password })
      .then(user => onSuccess(user))
      .catch(errorPromise => {
        errorPromise.then(errorData => setErrors(errorData.errors));
      });
  };

  return (
    <div>
      <h2>Sign in</h2>
      {errors && <div style={{ color: "red" }}>{JSON.stringify(errors)}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an account? Please <Link to="/signup">sign up</Link> instead.
      </p>
    </div>
  );
};

export default SignInForm;
