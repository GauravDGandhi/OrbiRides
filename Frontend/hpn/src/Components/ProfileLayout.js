import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <ProfileSidebar />
        </div>

        {/* Content Area */}
        <div className="col-md-9 p-4">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
