"use client";

import SearchInput from "@/components/ui/SearchInput";

export default function Header() {
  const handleSearch = (value: string) => {
    console.log("検索:", value);
    // 検索処理をここに実装
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* 左側：ロゴ */}
        <div style={{ flex: "0 0 auto" }}>
          <h1
            style={{ fontSize: "20px", fontWeight: "bold", color: "#212529" }}
          >
            Eureka
          </h1>
        </div>

        {/* 中央：検索窓 */}
        <div style={{ flex: "1", maxWidth: "600px", margin: "0 24px" }}>
          <SearchInput placeholder="検索..." onSearch={handleSearch} />
        </div>

        {/* 右側：将来的な要素用 */}
        <div style={{ flex: "0 0 auto", width: "100px" }}>
          {/* 必要に応じて右側にボタンやメニューを追加 */}
        </div>
      </div>
    </header>
  );
}
