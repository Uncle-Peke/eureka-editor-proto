"use client";

export default function RightSidebar() {
  const trends = [
    { tag: "#NextJS", posts: "1,234件の投稿" },
    { tag: "#React", posts: "2,345件の投稿" },
    { tag: "#TypeScript", posts: "3,456件の投稿" },
  ];

  const recommendedUsers = [
    { username: "おすすめユーザー1", handle: "@user1" },
    { username: "おすすめユーザー2", handle: "@user2" },
  ];

  return (
    <aside
      style={{
        width: "320px",
        backgroundColor: "white",
        borderLeft: "1px solid #e9ecef",
        minHeight: "calc(100vh - 60px)",
        padding: "16px",
      }}
    >
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
                style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#dee2e6",
                    borderRadius: "50%",
                  }}
                ></div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: "40px" }}>
                  <div>
                    <p style={{ fontWeight: "500", color: "#212529", margin: 0 }}>
                      {user.username}
                    </p>
                    <p style={{ fontSize: "14px", color: "#6c757d", margin: "2px 0 0 0" }}>
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
