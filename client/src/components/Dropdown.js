import React from "react";
import { NavLink } from "react-router-dom";

const Dropdown = (props) => {
  return (
    <ul className="dropdown">
      <button className="dropbtn">Dropdown</button>
      <div className="dropdown-content">
        <li>
          <NavLink
            to="/logout"
            className="nav__link"
            onClick={props.handleLogout}
          >
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="nav__link">
            Dashboard
          </NavLink>
        </li>
      </div>
    </ul>
  );
};

export default Dropdown;
