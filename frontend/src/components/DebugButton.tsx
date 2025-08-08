"use client";

export default function DebugButton() {
  const handleDebugClick = () => {
    console.log("デバッグボタンがクリックされました！");
    console.log("現在の時刻:", new Date().toLocaleString());
    console.log("ブラウザ情報:", navigator.userAgent);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <button
        onClick={handleDebugClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0051b3";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#0070f3";
        }}
      >
        デバッグログを出力
      </button>
    </div>
  );
}
