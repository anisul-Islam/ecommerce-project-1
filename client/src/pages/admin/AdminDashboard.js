import React from "react";
import { useSelector } from "react-redux";

import AdminSidebar from "../../components/AdminSidebar";

export const AdminDashboard = () => {
  const adminData = useSelector((state) => state.user.data.userData);

  return (
    <>
      {adminData ? (
        <div className="container-full">
          <AdminSidebar adminData={adminData} />
          <div className="main-content">
            <h2>Welcome {adminData.name}</h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
