import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import "./NavBar.css";

const NavBar = ({ logout }) => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = event => {
    setActiveItem(event.target.innerText);
  };

  return (
    <Menu fluid pointing secondary>
      <NavLink exact to='/'>
        <Menu.Item
          header
          name='Home'
          active={activeItem === "Home"}
          onClick={event => handleItemClick(event)}
        />
      </NavLink>
      <NavLink exact to='/stats'>
        <Menu.Item
          header
          name='Stats'
          active={activeItem === "Stats"}
          onClick={event => handleItemClick(event)}
        />
      </NavLink>
      <NavLink exact to='/charts'>
        <Menu.Item
          header
          name='Charts'
          active={activeItem === "Charts"}
          onClick={event => handleItemClick(event)}
        />
      </NavLink>
      <Menu.Menu position='right'>
        <Menu.Item header name='logout' onClick={() => logout()}>
          Log Out
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
