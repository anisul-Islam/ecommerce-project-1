import React from "react";
import { NavLink } from "react-router-dom";
const UserSidebar = ({ userData }) => {
  return (
    <div className="sidebar">
      <h2 className="center">User Profile</h2>
      <div className="info">
        <i className="fa-solid fa-user fa-3x round"></i>
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>

      <ul className="sidebar__lists">
        <li className="sidebar__list">
          <NavLink to="/dashboard/user/profile">Profile</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/user/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
