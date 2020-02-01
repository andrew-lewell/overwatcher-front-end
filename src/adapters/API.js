// import React from "react";

const API_ENDPOINT = "http://localhost:3000";
const SIGNIN_URL = `${API_ENDPOINT}/signin/`;
const SIGNUP_URL = `${API_ENDPOINT}/signup/`;
const VALIDATE_URL = `${API_ENDPOINT}/validate/`;
const SEASONS_URL = `${API_ENDPOINT}/seasons/`;
const GAMES_URL = `${API_ENDPOINT}/games/`;

const jsonify = resp => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

const handleUserResponse = user => {
  if (user.token) {
    localStorage.token = user.token;
  }
  return user;
};

const signup = user =>
  fetch(SIGNUP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(handleUserResponse);

const signin = user =>
  fetch(SIGNIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user })
  })
    .then(jsonify)
    .then(handleUserResponse);

const validate = () =>
  fetch(VALIDATE_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token
    }
  })
    .then(jsonify)
    .then(handleUserResponse);

const postSeason = season =>
  fetch(SEASONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    },
    body: JSON.stringify({ season })
  }).then(jsonify);

const postGame = (seasonId, mapId, heroId, result, sr) =>
  fetch(GAMES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    },
    body: JSON.stringify({
      season_id: seasonId,
      map_id: mapId,
      hero_id: heroId,
      result: result,
      sr: sr
    })
  }).then(jsonify);

const fetchSeason = seasonId =>
  fetch(SEASONS_URL + seasonId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    }
  }).then(jsonify);

const fetchGames = () =>
  fetch(GAMES_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorisation: localStorage.token
    }
  }).then(jsonify);

const deleteGame = gameId =>
  fetch(GAMES_URL + gameId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorisation: localStorage.token
    }
  });

export default {
  signin,
  signup,
  validate,
  postSeason,
  postGame,
  fetchSeason,
  fetchGames,
  deleteGame,

  hasToken: () => !!localStorage.token,
  clearToken: () => localStorage.removeItem("token")
};
