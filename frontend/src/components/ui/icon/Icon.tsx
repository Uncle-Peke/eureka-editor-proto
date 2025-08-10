import React from "react";
import { IconProps, IconName } from "./types";
import HomeIcon from "./HomeIcon";
import ProfileIcon from "./ProfileIcon";
import SearchIcon from "./SearchIcon";
import NotificationIcon from "./NotificationIcon";
import ArrowUpIcon from "./ArrowUpIcon";

interface IconComponentProps extends IconProps {
  name: IconName;
}

const iconComponents = {
  home: HomeIcon,
  profile: ProfileIcon,
  search: SearchIcon,
  notification: NotificationIcon,
  arrowUp: ArrowUpIcon,
};

export default function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon component "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
