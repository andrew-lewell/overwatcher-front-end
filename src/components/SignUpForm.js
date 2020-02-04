import React, { useState } from "react";
import API from "../adapters/API";
import { Link } from "react-router-dom";

const SignUpForm = ({ onSuccess, user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    API.signup({ username, email, password }).then(user => onSuccess(user));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Create an account</h2>
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
            type='text'
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
        <input type='submit' value='Submit' />
      </form>
      Already have an account? Please <Link to='/signin'>sign in</Link> instead.
    </div>
  );
};

export default SignUpForm;
