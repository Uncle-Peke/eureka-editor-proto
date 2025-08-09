"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type TipTapEditorProps = {
  initialContent?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
  className?: string;
  placeholder?: string;
};

function MenuButton(props: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  const { onClick, active, disabled, title, children } = props;
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

export default function TipTapEditor({
  initialContent,
  onChange,
  editable = true,
  className,
  placeholder = "ここに入力...",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent ?? "<p></p>",
    editable,
    autofocus: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  // 同期的に editable の変更を反映
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(editable);
  }, [editable, editor]);

  const headingLevels = [1, 2, 3] as const;

  return (
    <div className={className}>
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
          Bold
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={!!editor?.isActive("italic")}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          title="Italic"
        >
          Italic
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          active={!!editor?.isActive("strike")}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          title="Strike"
        >
          Strike
        </MenuButton>
        <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
        <MenuButton
          onClick={() => editor?.chain().focus().setParagraph().run()}
          active={!!editor?.isActive("paragraph")}
          title="Paragraph"
        >
          Paragraph
        </MenuButton>
        {headingLevels.map((level) => (
          <MenuButton
            key={level}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
            active={!!editor?.isActive("heading", { level })}
            title={`H${level}`}
          >
            H{level}
          </MenuButton>
        ))}
        <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={!!editor?.isActive("bulletList")}
          title="Bullet List"
        >
          • List
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={!!editor?.isActive("orderedList")}
          title="Ordered List"
        >
          1. List
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
        <span className="mx-2 text-gray-300">|</span>
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

      <div
        style={{
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          padding: 12,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* TipTap / ProseMirror 最低限のスタイル */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af; /* gray-400 */
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }
        .ProseMirror h3 {
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #e5e7eb; /* gray-200 */
          margin: 0.5rem 0;
          padding-left: 0.75rem;
          color: #6b7280; /* gray-500 */
        }
        .ProseMirror pre {
          background: #0b1020;
          color: #e5e7eb;
          padding: 0.75rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0.75rem 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
        }
        .ProseMirror li p {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}
