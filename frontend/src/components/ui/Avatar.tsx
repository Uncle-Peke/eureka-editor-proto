"use client";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallbackText?: string;
}

export default function Avatar({
  src,
  alt = "アバター",
  size = "md",
  fallbackText,
}: AvatarProps) {
  const sizeStyles = {
    sm: {
      width: "32px",
      height: "32px",
      fontSize: "12px",
    },
    md: {
      width: "40px",
      height: "40px",
      fontSize: "14px",
    },
    lg: {
      width: "48px",
      height: "48px",
      fontSize: "16px",
    },
  };

  const avatarStyles = {
    ...sizeStyles[size],
    backgroundColor: "#dee2e6",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6c757d",
    fontWeight: "500",
    overflow: "hidden",
  };

  if (src) {
    return <img src={src} alt={alt} style={avatarStyles} />;
  }

  return <div style={avatarStyles}>{fallbackText || "U"}</div>;
}
