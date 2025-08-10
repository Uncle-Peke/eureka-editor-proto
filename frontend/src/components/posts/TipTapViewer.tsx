"use client";

import React, { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

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
    immediatelyRender: false, // SSR対応のためfalseに設定
  });

  // クライアントサイドでのみレンダリング
  useEffect(() => {
    setIsClient(true);
  }, []);

  // クライアントサイドでのみコンテンツを更新
  useEffect(() => {
    if (editor && content && isClient) {
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
  }, [editor, content, isClient]);

  // エディターの状態を監視
  useEffect(() => {
    if (editor && isClient) {
      console.log("TipTapViewer: Editor initialized");
      console.log("TipTapViewer: Current content:", editor.getHTML());
    }
  }, [editor, isClient]);

  // クライアントサイドでない場合は空のdivを表示
  if (!isClient) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <EditorContent editor={editor} />
      <EditorStyles />
    </div>
  );
}
