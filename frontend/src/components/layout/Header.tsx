"use client";

import { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

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
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              style={{
                position: "absolute",
                left: "12px",
                width: "20px",
                height: "20px",
                color: "#6c757d",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="検索..."
              style={{
                width: "100%",
                padding: "10px 12px 10px 44px",
                border: "1px solid #dee2e6",
                borderRadius: "20px",
                fontSize: "14px",
                backgroundColor: searchFocused ? "white" : "#e9ecef",
                borderColor: searchFocused ? "#0d6efd" : "#dee2e6",
                outline: "none",
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* 右側：将来的な要素用 */}
        <div style={{ flex: "0 0 auto", width: "100px" }}>
          {/* 必要に応じて右側にボタンやメニューを追加 */}
        </div>
      </div>
    </header>
  );
}
