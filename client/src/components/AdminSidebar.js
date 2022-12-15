import React from "react";
import { NavLink } from "react-router-dom";
const AdminSidebar = ({ adminData }) => {
  return (
    <div className="sidebar">
      <h2 className="center">Admin Profile</h2>
      <div className="info">
        <i className="fa-solid fa-user fa-3x round"></i>
        <h2>{adminData.name}</h2>
        <p>{adminData.email}</p>
      </div>

      <ul className="sidebar__lists">
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/category">Create Category</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/product">Create Product</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/products">Show All Products</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/orders">Manage Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
