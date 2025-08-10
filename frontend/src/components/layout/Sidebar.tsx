"use client";

export default function Sidebar() {
  const navItems = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      label: "ホーム",
      href: "#",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      label: "プロフィール",
      href: "#",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      ),
      label: "検索",
      href: "#",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z"
        />
      ),
      label: "通知",
      href: "#",
    },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: "56px", // ヘッダーの高さ分下に配置
        left: 0,
        zIndex: 999,
        width: "200px",
        minWidth: "200px",
        maxWidth: "200px",
        backgroundColor: "white",
        borderRight: "1px solid #e9ecef",
        minHeight: "calc(100vh - 56px)", // ヘッダーの高さ分を引く
        padding: "16px",
        flexShrink: 0,
      }}
    >
      <nav>
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            メニュー
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  color: "#495057",
                  textDecoration: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "12px",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
