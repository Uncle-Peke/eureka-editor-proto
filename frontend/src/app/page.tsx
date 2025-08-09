import EditorLinkButton from "@/components/EditorLinkButton";

export default function Page() {
  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100svh",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>起動確認</h1>
        <p style={{ marginTop: 8 }}>最小構成のトップページが動作しています。</p>
        <div style={{ marginTop: 16 }}>
          <EditorLinkButton />
        </div>
      </div>
    </main>
  );
}
