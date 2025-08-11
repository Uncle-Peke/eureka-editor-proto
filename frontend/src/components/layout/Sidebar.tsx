"use client";

import {
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  NotificationIcon,
  SettingsIcon,
} from "@/components/ui/icon";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function Sidebar() {
  const navItems = [
    {
      icon: <HomeIcon size={20} />,
      label: "ホーム",
      href: "#",
    },
    {
      icon: <ProfileIcon size={20} />,
      label: "プロフィール",
      href: "#",
    },
    {
      icon: <SearchIcon size={20} />,
      label: "検索",
      href: "#",
    },
    {
      icon: <NotificationIcon size={20} />,
      label: "通知",
      href: "#",
    },
    {
      icon: <SettingsIcon size={20} />,
      label: "設定",
      href: "#",
    },
  ];

  return (
    <aside
      className="bg-primary border-secondary"
      style={{
        position: "fixed",
        top: "var(--header-height)",
        left: 0,
        zIndex: "var(--z-sticky)",
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        maxWidth: "var(--sidebar-width)",
        backgroundColor: "var(--color-bg-primary)",
        borderRight: "1px solid var(--color-border-secondary)",
        minHeight: `calc(100vh - var(--header-height))`,
        padding: "var(--spacing-2)",
        flexShrink: 0,
      }}
    >
      <nav>
        <div style={{ marginBottom: "var(--spacing-3)" }}>
          <h3
            className="text-muted font-semibold"
            style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "var(--spacing-2)",
            }}
          >
            メニュー
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-1)",
            }}
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-secondary transition-normal rounded-md"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "var(--spacing-1) var(--spacing-2)",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  transition: "all var(--transition-normal)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-bg-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div style={{ marginRight: "var(--spacing-2)" }}>
                  {item.icon}
                </div>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* 一番上に戻るボタン */}
        <ScrollToTopButton />
      </nav>
    </aside>
  );
}
