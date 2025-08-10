// デザイントークンの型定義
export interface DesignTokens {
  spacing: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
  typography: {
    [key: string]: string;
  };
  layout: {
    [key: string]: string;
  };
  shadows: {
    [key: string]: string;
  };
  radius: {
    [key: string]: string;
  };
  transitions: {
    [key: string]: string;
  };
  zIndex: {
    [key: string]: string;
  };
}

// デザイントークンの値
export const designTokens: DesignTokens = {
  spacing: {
    "0": "0px",
    "1": "8px",
    "2": "16px",
    "3": "24px",
    "4": "32px",
    "5": "40px",
    "6": "48px",
    "8": "64px",
    "10": "80px",
    "12": "96px",
    "16": "128px",
  },
  colors: {
    // ブランドカラー
    primary: "#007bff",
    "primary-hover": "#0056b3",
    "primary-light": "#e3f2fd",
    "primary-dark": "#004085",

    // セマンティックカラー
    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    info: "#17a2b8",

    // ニュートラルカラー
    white: "#ffffff",
    black: "#000000",
    "gray-50": "#f8f9fa",
    "gray-100": "#e9ecef",
    "gray-200": "#dee2e6",
    "gray-300": "#ced4da",
    "gray-400": "#adb5bd",
    "gray-500": "#6c757d",
    "gray-600": "#495057",
    "gray-700": "#343a40",
    "gray-800": "#212529",
    "gray-900": "#1a1d20",

    // 背景カラー
    "bg-primary": "var(--color-white)",
    "bg-secondary": "var(--color-gray-50)",
    "bg-tertiary": "var(--color-gray-100)",
    "bg-dark": "var(--color-black)",

    // テキストカラー
    "text-primary": "var(--color-gray-800)",
    "text-secondary": "var(--color-gray-600)",
    "text-muted": "var(--color-gray-500)",
    "text-inverse": "var(--color-white)",

    // ボーダーカラー
    "border-primary": "var(--color-gray-200)",
    "border-secondary": "var(--color-gray-100)",
    "border-focus": "var(--color-primary)",
  },
  typography: {
    "font-family-base":
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
    "font-family-mono":
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

    // フォントサイズ
    "font-size-xs": "12px",
    "font-size-sm": "14px",
    "font-size-base": "16px",
    "font-size-lg": "18px",
    "font-size-xl": "20px",
    "font-size-2xl": "24px",
    "font-size-3xl": "30px",
    "font-size-4xl": "36px",

    // フォントウェイト
    "font-weight-normal": "400",
    "font-weight-medium": "500",
    "font-weight-semibold": "600",
    "font-weight-bold": "700",

    // 行間
    "line-height-tight": "1.25",
    "line-height-normal": "1.5",
    "line-height-relaxed": "1.75",
  },
  layout: {
    "header-height": "56px",
    "sidebar-width": "200px",
    "container-max-width": "1200px",
    "content-max-width": "800px",
    "layout-gap": "var(--spacing-3)",
    "layout-padding": "var(--spacing-3)",
    "layout-margin": "var(--spacing-4)",
    "component-padding": "var(--spacing-3)",
    "component-margin": "var(--spacing-4)",
    "section-spacing": "var(--spacing-6)",
    "page-spacing": "var(--spacing-8)",
  },
  shadows: {
    "shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "shadow-md":
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "shadow-lg":
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "shadow-xl":
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  radius: {
    "radius-sm": "4px",
    "radius-md": "6px",
    "radius-lg": "8px",
    "radius-xl": "12px",
    "radius-full": "9999px",
  },
  transitions: {
    "transition-fast": "150ms ease-in-out",
    "transition-normal": "250ms ease-in-out",
    "transition-slow": "350ms ease-in-out",
  },
  zIndex: {
    "z-dropdown": "1000",
    "z-sticky": "1020",
    "z-fixed": "1030",
    "z-modal-backdrop": "1040",
    "z-modal": "1050",
    "z-popover": "1060",
    "z-tooltip": "1070",
  },
};

// ユーティリティ関数
export const getToken = (category: keyof DesignTokens, key: string): string => {
  return designTokens[category][key] || "";
};

export const getSpacing = (key: string): string => getToken("spacing", key);
export const getColor = (key: string): string => getToken("colors", key);
export const getTypography = (key: string): string =>
  getToken("typography", key);
export const getLayout = (key: string): string => getToken("layout", key);
export const getShadow = (key: string): string => getToken("shadows", key);
export const getRadius = (key: string): string => getToken("radius", key);
export const getTransition = (key: string): string =>
  getToken("transitions", key);
export const getZIndex = (key: string): string => getToken("zIndex", key);
