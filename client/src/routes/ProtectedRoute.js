import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Login } from "../pages";

import { authorizeUser } from "../services/UserService";

const Protected = () => {
  // const isLoggedIn = useSelector((state) => state.user.data.isLoggedIn);
  // authorizing with the server response
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.user.data.token);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await authorizeUser(token);
      data.ok ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    if (token) authCheck();

    // if (!isLoggedIn) navigate("/login", { state: location.pathname });
  }, [token]);

  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />;
};

export default Protected;
