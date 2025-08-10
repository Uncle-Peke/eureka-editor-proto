"use client";

import React from "react";

type HtmlPreviewProps = {
  html: string;
  className?: string;
};

export default function HtmlPreview({ html, className }: HtmlPreviewProps) {
  return (
    <section className={className}>
      <h2 className="text-lg font-semibold mb-2">HTML Preview</h2>
      <div className="rounded-md border p-3 bg-gray-50">
        <pre className="whitespace-pre-wrap break-words text-sm overflow-auto">
          {html}
        </pre>
      </div>
    </section>
  );
}
