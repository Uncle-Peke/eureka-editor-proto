"use client";

import SearchInput from "@/components/ui/SearchInput";

export default function Header() {
  const handleSearch = (value: string) => {
    console.log("検索:", value);
  };

  return (
    <header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e9ecef",
        padding: "8px 16px",
      }}
    >
      <div
        style={{
          position: "relative", // 中央の検索をabsolute配置するための基準
          height: "56px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* 左：ロゴ（画面左端に固定） */}
        <div style={{ flex: "0 0 auto" }}>
          <h1 style={{ fontSize: 20, fontWeight: "bold", color: "#212529" }}>
            Eureka
          </h1>
        </div>

        {/* 中央：検索（常に画面中央 & レスポンシブ幅） */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(200px, calc(100vw - 32px - 200px), 720px)",
            // 最小200px, 左右パディング32px & 右側エリア200pxを差し引き, 最大600px
          }}
        >
          <SearchInput placeholder="検索..." onSearch={handleSearch} />
        </div>

        {/* 右：将来用（中央と干渉しない幅を確保） */}
        <div style={{ marginLeft: "auto", width: "200px" }}>
          {/* ボタンやメニューを追加予定 */}
        </div>
      </div>
    </header>
  );
}
