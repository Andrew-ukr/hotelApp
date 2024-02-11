import React from "react";
import {
  Trash,
  HouseLine,
  CalendarCheck,
  UserList,
  DoorOpen,
  PresentationChart,
  GearSix,
  MagnifyingGlass,
  CaretDown,
  PencilSimple
} from "@phosphor-icons/react";

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
  const iconList: IconList = {
    Trash,
    HouseLine,
    CalendarCheck,
    UserList,
    DoorOpen,
    PresentationChart,
    GearSix,
    MagnifyingGlass,
    CaretDown,
    PencilSimple
  };

  const Component = iconList[name];

  if (!Component) return null;

  return <Component color={color} weight={weight} size={size} alt={alt} />;
};

export default Icon;
