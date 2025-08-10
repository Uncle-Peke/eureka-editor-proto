import React from "react";
import BaseIcon from "./BaseIcon";
import { IconProps } from "./types";

export default function ProfileIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </BaseIcon>
  );
}
