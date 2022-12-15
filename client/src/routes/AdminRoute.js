import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Login } from "../pages";

import { isAdminCheck } from "../services/UserService";

const AdminRoute = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.user.data.token);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await isAdminCheck(token);
      data.ok ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    if (token) adminCheck();
  }, [token]);

  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />;
};

export default AdminRoute;
