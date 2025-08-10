// 型定義
export type { IconProps, IconComponentProps } from "./types";

// ベースコンポーネント
export { default as BaseIcon } from "./BaseIcon";

// 汎用アイコンコンポーネント
export { default as Icon } from "./Icon";

// アイコンコンポーネント
export { default as HomeIcon } from "./HomeIcon";
export { default as ProfileIcon } from "./ProfileIcon";
export { default as SearchIcon } from "./SearchIcon";
export { default as NotificationIcon } from "./NotificationIcon";
export { default as ArrowUpIcon } from "./ArrowUpIcon";

// アイコンの一覧（動的インポート用）
export const icons = {
  home: "HomeIcon",
  profile: "ProfileIcon",
  search: "SearchIcon",
  notification: "NotificationIcon",
  arrowUp: "ArrowUpIcon",
} as const;

export type IconName = keyof typeof icons;
