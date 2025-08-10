import React from "react";
import BaseIcon from "./BaseIcon";
import { IconProps } from "./types";

export default function NotificationIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z" />
    </BaseIcon>
  );
}
