"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorStyles from "@/components/editor/EditorStyles";

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
        // リスト、引用、コードブロックなどの拡張機能を有効化
        bulletList: {},
        orderedList: {},
        blockquote: {},
        codeBlock: {},
        horizontalRule: {},
        hardBreak: {},
      }),
      Placeholder.configure({
        placeholder: "",
      }),
    ],
    content: content || "<p></p>",
    editable: false, // 読み取り専用
    autofocus: false,
    immediatelyRender: true, // SSR対応のためtrueに変更
  });

  // クライアントサイドでのみコンテンツを更新
  useEffect(() => {
    if (editor && content) {
      console.log("TipTapViewer: Setting content:", content);
      // HTMLコンテンツを安全に設定
      try {
        editor.commands.setContent(content);
        console.log("TipTapViewer: Content set successfully");
      } catch (error) {
        console.warn("TipTap content setting error:", error);
        // エラーが発生した場合は空のコンテンツを設定
        editor.commands.setContent("<p></p>");
      }
    }
  }, [editor, content]);

  // エディターの状態を監視
  useEffect(() => {
    if (editor) {
      console.log("TipTapViewer: Editor initialized");
      console.log("TipTapViewer: Current content:", editor.getHTML());
    }
  }, [editor]);

  return (
    <div className={className}>
      <EditorContent editor={editor} />
      <EditorStyles />
    </div>
  );
}
