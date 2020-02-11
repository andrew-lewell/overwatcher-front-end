import React, { useState } from "react";
import API from "../adapters/API";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

const SignInForm = ({ onSuccess, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    API.signin({ email, password })
      .catch(errorPromise => {
        errorPromise.then(errorData => {
          setErrors(errorData);
          console.log(errorData);
        });
      })
      .then(user => onSuccess(user));
  };

  const formStyle = {
    margin: "0 auto",
    width: "200px"
  };

  return (
    <div>
      <h2>Sign in</h2>
      {errors.error && <div style={{ color: "red" }}>{errors.error}</div>}
      <Form style={formStyle} onSubmit={handleSubmit}>
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
      Don't have an account? Please <Link to='/signup'>sign up</Link> instead.
    </div>
  );
};

export default SignInForm;
