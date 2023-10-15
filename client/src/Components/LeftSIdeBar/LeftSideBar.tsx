import React from "react";
import { Icon } from "../UI";
import { NavLink } from "react-router-dom";
import {
  DASHBOARD,
  FRONT_DESK,
  GUESTS,
  ROOMS,
  SETTINGS,
} from "../../Utils/constants";

const linkList = [
  { linkName: "Dashboard", iconName: "PresentationChart", linkTo: DASHBOARD },
  { linkName: "Front desk", iconName: "CalendarCheck", linkTo: FRONT_DESK },
  { linkName: "Guests", iconName: "UserList", linkTo: GUESTS },
  { linkName: "Rooms", iconName: "DoorOpen", linkTo: ROOMS },
  { linkName: "Settings", iconName: "GearSix", linkTo: SETTINGS },
];

const baseStyles =
  "flex justify-start items-center rounded px-3 py-2 text-app-grey-600 bg-white hover:text-app-blue-600 hover:bg-app-blue-50 mb-2";
const activeLinkStyles = "!text-app-blue-600  !bg-app-blue-50";
const LeftSideBar = () => {
  return (
    <div className="px-3 py-8 w-56">
      <div className="flex justify-start items-center mb-9">
        <Icon name="HouseLine" size={40} color="#448df2" />
        <span className="text-app-blue-400 text-3xl font-medium ml-2">
          newHotel
        </span>
      </div>
      <div className="">
        {linkList.map(({ linkName, iconName, linkTo }, index) => {
          return (
            <NavLink
              key={index}
              to={`/${linkTo}`}
              className={({ isActive }) => {
                return isActive
                  ? `${baseStyles} ${activeLinkStyles}`
                  : baseStyles;
              }}
            >
              <Icon name={iconName} color="currentColor" />
              <span className="ml-3 ">{linkName}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
