"use client";

interface SidebarToggleButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
}

export default function SidebarToggleButton({
  onClick,
  isOpen = false,
  className = "",
}: SidebarToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sidebar-toggle-btn ${className}`}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 48,
        height: 48,
        border: "none",
        background: "#0d6efd",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(13, 110, 253, 0.3)",
        transition: "all 0.2s ease-in-out",
        zIndex: 1001,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(13, 110, 253, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(13, 110, 253, 0.3)";
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {isOpen ? (
          // 閉じるアイコン（×）
          <>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </>
        ) : (
          // 開くアイコン（ハンバーガーメニュー）
          <>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </>
        )}
      </svg>
    </button>
  );
}
