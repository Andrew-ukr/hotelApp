import React from "react";
import { HouseLine, CalendarCheck, UserList, DoorOpen, PresentationChart, GearSix } from "@phosphor-icons/react";

type IconPropsType = {
  name: string;
  color?: string;
  size?: string | number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  alt?: string;
};

type IconPropsType2 = {
  color?: string;
  size?: string | number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  alt?: string;
};

type IconList = {
  [key: string]: React.FC<IconPropsType2>;
};

const Icon: React.FC<IconPropsType> = ({
  name,
  color = "#5D6679",
  weight = "regular",
  size,
  alt = "",
}) => {
  const iconList: IconList = { HouseLine, CalendarCheck, UserList, DoorOpen, PresentationChart, GearSix };

  const Component = iconList[name];

  if (!Component) return null;

  return (
    <div>
      <Component color={color} weight={weight} size={size} alt={alt} />
    </div>
  );
};

export default Icon;
