"use client";

import { useState, useRef, useEffect } from "react";

export default function RightSidebar() {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const trends = [
    { tag: "#NextJS", posts: "1,234件の投稿" },
    { tag: "#React", posts: "2,345件の投稿" },
    { tag: "#TypeScript", posts: "3,456件の投稿" },
  ];

  const recommendedUsers = [
    { username: "おすすめユーザー1", handle: "@user1" },
    { username: "おすすめユーザー2", handle: "@user2" },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = startXRef.current - e.clientX;
    const newWidth = Math.max(
      200,
      Math.min(500, startWidthRef.current + deltaX)
    );
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <aside
      ref={sidebarRef}
      style={{
        width: `${width}px`,
        minWidth: "200px",
        maxWidth: "500px",
        backgroundColor: "white",
        borderLeft: "1px solid #e9ecef",
        minHeight: "calc(100vh - 60px)",
        padding: "16px",
        flexShrink: 0,
        marginLeft: "12px",
        position: "relative",
      }}
    >
      {/* リサイズハンドル */}
      <div
        style={{
          position: "absolute",
          left: "-4px",
          top: 0,
          bottom: 0,
          width: "8px",
          cursor: "col-resize",
          backgroundColor: "transparent",
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* トレンド */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#212529",
              marginBottom: "12px",
            }}
          >
            トレンド
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {trends.map((trend, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                }}
              >
                <p style={{ fontSize: "14px", color: "#6c757d" }}>トレンド</p>
                <p style={{ fontWeight: "500", color: "#212529" }}>
                  {trend.tag}
                </p>
                <p style={{ fontSize: "14px", color: "#6c757d" }}>
                  {trend.posts}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* おすすめユーザー */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#212529",
              marginBottom: "12px",
            }}
          >
            おすすめユーザー
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {recommendedUsers.map((user, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#dee2e6",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    minHeight: "40px",
                  }}
                >
                  <div>
                    <p
                      style={{ fontWeight: "500", color: "#212529", margin: 0 }}
                    >
                      {user.username}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6c757d",
                        margin: "2px 0 0 0",
                      }}
                    >
                      {user.handle}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    color: "#0d6efd",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0b5ed7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#0d6efd")
                  }
                >
                  フォロー
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
