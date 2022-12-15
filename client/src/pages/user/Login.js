import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import { loginUser } from "../../services/UserService";
import { login } from "../../features/userSlice";

export const Login = ({ pathName = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setValue((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(value);
      const { user, token } = response;
      dispatch(login({ user, token }));
      const role = user.role === 1 ? "admin" : "user";
      navigate(pathName || `/dashboard/${role}`);
    } catch (error) {
      toast(error.response.data.error);
    }
  };

  return (
    <div className="container center">
      <h1>User Login</h1>
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={value.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password must be 6 characters"
              value={value.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
