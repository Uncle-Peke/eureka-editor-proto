"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("@/components/TipTapEditor"), {
  ssr: false,
});

export default function EditorPage() {
  const [html, setHtml] = useState<string>("<p>こんにちは TipTap!</p>");

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">TipTap Editor Sample</h1>

      <TipTapEditor
        initialContent={html}
        onChange={(value) => setHtml(value)}
        placeholder="ここに本文を入力してください"
      />

      <section>
        <h2 className="text-lg font-semibold mb-2">HTML Preview</h2>
        <div className="rounded-md border p-3 bg-gray-50">
          <pre className="whitespace-pre-wrap break-words text-sm overflow-auto">
            {html}
          </pre>
        </div>
      </section>
    </main>
  );
}
