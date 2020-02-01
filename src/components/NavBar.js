import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to='/'>
        Home
      </NavLink>
      {"  -  "}
      <NavLink exact to='/stats'>
        Stats
      </NavLink>
    </nav>
  );
};

export default NavBar;
