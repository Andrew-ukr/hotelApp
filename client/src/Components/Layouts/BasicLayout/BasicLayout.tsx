import React from "react";
import LeftSideBar from "../../LeftSIdeBar/LeftSideBar";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="flex justify-start w-full h-screen">
      <LeftSideBar />
      <div className="flex flex-col grow">{<Outlet />}</div>
    </div>
  );
};

export default BasicLayout;
