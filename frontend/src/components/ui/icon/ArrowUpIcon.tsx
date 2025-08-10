import React from "react";
import BaseIcon from "./BaseIcon";
import { IconProps } from "./types";

export default function ArrowUpIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </BaseIcon>
  );
}
