import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../services/UserService";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleInputChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(user);
      toast(response.message);
    } catch (error) {
      toast(error.response.data.error);
    }
    setUser({
      name: "",
      email: "",
      password: "",
      address: "",
    });
  };

  return (
    <div className="container center">
      <h1>User Registration</h1>
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address: </label>
            <textarea
              name="address"
              id="address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
