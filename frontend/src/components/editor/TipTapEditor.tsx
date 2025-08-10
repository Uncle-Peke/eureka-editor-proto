"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./toolbar/Toolbar";
import ResizeHandle from "./ResizeHandle";
import EditorStyles from "./EditorStyles";

type TipTapEditorProps = {
  initialContent?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
};

export default function TipTapEditor({
  initialContent,
  onChange,
  editable = true,
  className,
  placeholder = "ここに入力...",
  minHeight = 200,
  maxHeight = 800,
}: TipTapEditorProps) {
  const [editorHeight, setEditorHeight] = useState(minHeight);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = editorHeight;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    const deltaY = e.clientY - startY.current;
    const newHeight = Math.max(
      minHeight,
      Math.min(maxHeight, startHeight.current + deltaY)
    );
    setEditorHeight(newHeight);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={className}>
      <Toolbar editor={editor} />

      <div
        style={{
          borderRadius: 6,
          border: "1px solid #e5e7eb",
          padding: 12,
          position: "relative",
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            minHeight: `${editorHeight}px`,
            height: `${editorHeight}px`,
            overflow: "auto",
          }}
        />

        <ResizeHandle onMouseDown={handleMouseDown} />
      </div>

      <EditorStyles />
    </div>
  );
}
