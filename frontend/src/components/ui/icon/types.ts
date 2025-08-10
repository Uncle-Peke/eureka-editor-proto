export interface IconProps {
  /** アイコンのサイズ（ピクセル） */
  size?: number;
  /** 追加のCSSクラス */
  className?: string;
  /** アイコンの色 */
  color?: string;
  /** アイコンの太さ */
  strokeWidth?: number;
  /** アイコンを塗りつぶすかどうか */
  filled?: boolean;
}

export interface IconComponentProps extends IconProps {
  /** アイコンのパスデータ */
  path: string;
  /** アイコンのビューボックス */
  viewBox?: string;
}
