"use client";

import { useEffect, useRef, useState } from "react";

interface RightSidebarProps {
  width: number;
  onWidthChange: (width: number) => void;
}

export default function RightSidebar({
  width,
  onWidthChange,
}: RightSidebarProps) {
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => {
      const deltaX = startXRef.current - e.clientX;
      const next = Math.min(500, Math.max(200, startWidthRef.current + deltaX));
      onWidthChange(next);
    };
    const onUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isResizing, onWidthChange]);

  const trends = [
    { tag: "#NextJS", posts: "1,234件の投稿" },
    { tag: "#React", posts: "2,345件の投稿" },
    { tag: "#TypeScript", posts: "3,456件の投稿" },
  ];
  const users = [
    { username: "おすすめユーザー1", handle: "@user1" },
    { username: "おすすめユーザー2", handle: "@user2" },
  ];

  return (
    <aside
      style={{
        position: "relative", // ★ fixed/absolute禁止
        width: "100%", // 親のグリッド列幅に一致
        height: "100%",
        backgroundColor: "white",
        borderLeft: "1px solid #e9ecef",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      {/* リサイズハンドル */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: -4,
          top: 0,
          bottom: 0,
          width: 8,
          cursor: "col-resize",
          zIndex: 1,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <section>
          <h3
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#212529",
              marginBottom: 12,
            }}
          >
            トレンド
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {trends.map((t) => (
              <div
                key={t.tag}
                style={{ padding: 12, background: "#f8f9fa", borderRadius: 6 }}
              >
                <p style={{ fontSize: 14, color: "#6c757d" }}>トレンド</p>
                <p style={{ fontWeight: 500, color: "#212529" }}>{t.tag}</p>
                <p style={{ fontSize: 14, color: "#6c757d" }}>{t.posts}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#212529",
              marginBottom: 12,
            }}
          >
            おすすめユーザー
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {users.map((u) => (
              <div
                key={u.handle}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "#dee2e6",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    minHeight: 40,
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 500, color: "#212529", margin: 0 }}>
                      {u.username}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#6c757d",
                        margin: "2px 0 0 0",
                      }}
                    >
                      {u.handle}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    color: "#0d6efd",
                    fontSize: 14,
                    fontWeight: 500,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  フォロー
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
