"use client";

import { useScrollToTop } from "../../hooks/useScrollToTop";
import { ArrowUpIcon } from "@/components/ui/icon";

export default function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "var(--spacing-3)",
        left: "175px", // 左サイドメニューの右端（200px - 24px = 176pxの位置）
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition:
          "opacity var(--transition-normal), visibility var(--transition-normal)",
        zIndex: "var(--z-dropdown)",
      }}
    >
      <button
        onClick={scrollToTop}
        className="bg-primary text-inverse shadow-lg rounded-full transition-normal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--spacing-6)",
          height: "var(--spacing-6)",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-inverse)",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "var(--shadow-lg)",
          transition: "all var(--transition-normal)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        title="一番上に戻る"
      >
        <ArrowUpIcon size={20} color="white" />
      </button>
    </div>
  );
}
