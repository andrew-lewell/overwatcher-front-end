import React, { useState } from "react";
import API from "../adapters/API";
import { Redirect } from "react-router-dom";

const Signin = ({ onSuccess, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    API.signin({ email, password }).then(user => onSuccess(user));
  };

  return (
    <div>
      <h2>Please log in</h2>
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
      </form>
    </div>
  );
};

export default Signin;
