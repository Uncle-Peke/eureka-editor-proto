"use client";

import React from "react";
import { Editor } from "@tiptap/react";

type ToolbarProps = {
  editor: Editor | null;
};

type MenuButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
};

function MenuButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: "6px 8px",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        fontSize: 12,
        marginRight: 6,
        marginBottom: 6,
        background: active ? "#000" : "#fff",
        color: active ? "#fff" : "#111827",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar({ editor }: ToolbarProps) {
  const headingLevels = [1, 2, 3] as const;

  return (
    <div
      style={{
        marginBottom: 8,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <MenuButton
        onClick={() => editor?.chain().focus().toggleBold().run()}
        active={!!editor?.isActive("bold")}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        title="Bold"
      >
        B
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        active={!!editor?.isActive("italic")}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        title="Italic"
      >
        I
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        active={!!editor?.isActive("strike")}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        title="Strike"
      >
        S
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().setParagraph().run()}
        active={!!editor?.isActive("paragraph")}
        title="Paragraph"
      >
        P
      </MenuButton>
      {headingLevels.map((level) => (
        <MenuButton
          key={level}
          onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}
          active={!!editor?.isActive("heading", { level })}
          title={`H${level}`}
        >
          H{level}
        </MenuButton>
      ))}
      <MenuButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        active={!!editor?.isActive("bulletList")}
        title="Bullet List"
      >
        • ~
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        active={!!editor?.isActive("orderedList")}
        title="Ordered List"
      >
        1. ~
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        active={!!editor?.isActive("blockquote")}
        title="Blockquote"
      >
        ❝
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        active={!!editor?.isActive("codeBlock")}
        title="Code Block"
      >
        {"</>"}
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        ―
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().undo().run()}
        title="Undo"
      >
        ↶
      </MenuButton>
      <MenuButton
        onClick={() => editor?.chain().focus().redo().run()}
        title="Redo"
      >
        ↷
      </MenuButton>
    </div>
  );
}
