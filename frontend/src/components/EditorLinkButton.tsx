"use client";

import { Button } from "@headlessui/react";
import Link from "next/link";

export default function EditorLinkButton() {
  return (
    <Button
      as={Link}
      href="/editor"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderRadius: 8,
        background: "#111827",
        color: "#ffffff",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      エディターへ
    </Button>
  );
}
