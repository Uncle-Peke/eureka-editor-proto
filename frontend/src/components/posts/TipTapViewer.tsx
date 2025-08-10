"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorStyles from "@/components/editor/EditorStyles";
import styles from "./TipTapViewer.module.css";

type TipTapViewerProps = {
  content: string;
  className?: string;
};

export default function TipTapViewer({
  content,
  className,
}: TipTapViewerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "",
      }),
    ],
    content: content || "<p></p>",
    editable: false, // 読み取り専用
    autofocus: false,
    immediatelyRender: false, // SSR対応のためfalseに設定
  });

  // クライアントサイドでのみコンテンツを更新
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const viewerClasses = [styles.viewer, className].filter(Boolean).join(" ");

  return (
    <div className={viewerClasses}>
      <EditorContent editor={editor} />
      <EditorStyles />
    </div>
  );
}
