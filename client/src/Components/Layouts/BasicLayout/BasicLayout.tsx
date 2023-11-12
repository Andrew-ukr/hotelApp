import React from "react";
import LeftSideBar from "../../LeftSIdeBar/LeftSideBar";
import { Outlet } from "react-router-dom";
import HeaderPanel from "../../HeaderPanel/HeaderPanel";

const BasicLayout = () => {
  return (
    <div className="flex justify-start w-full h-screen">
      <LeftSideBar />
      <div className="flex flex-col grow pr-5 overflow-auto">
        <HeaderPanel />
        {<Outlet />}</div>
    </div>
  );
};

export default BasicLayout;
