import React from "react";
import { useSelector } from "react-redux";

import UserSidebar from "../../components/UserSidebar";

export const UserDashboard = () => {
  const userData = useSelector((state) => state.user.data.userData);

  return (
    <>
      {userData ? (
        <div className="container-full">
          <UserSidebar userData={userData} />
          <div className="main-content">
            <h2>Welcome {userData.name}</h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
