"use client";

import MainLayout from "@/components/layout/MainLayout";
import PostEditor from "@/components/posts/PostEditor";
import PostList from "@/components/posts/PostList";
import { useState } from "react";
import { Post } from "@/types/post";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content:
        "これはサンプルの投稿です。実際のアプリケーションでは、ここにユーザーの投稿内容が表示されます。",
      username: "サンプルユーザー",
      userHandle: "@sampleuser",
      timestamp: "2時間前",
      likes: 24,
      reposts: 5,
      replies: 12,
    },
  ]);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (html: string) => {
    setEditorContent(html);
  };

  const handlePost = () => {
    if (!editorContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: editorContent,
      username: "ユーザー名",
      userHandle: "@username",
      timestamp: "今",
      likes: 0,
      reposts: 0,
      replies: 0,
    };

    setPosts([newPost, ...posts]);
    setEditorContent("");
  };

  return (
    <MainLayout>
      {/* エディターエリア */}
      <div style={{ padding: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <PostEditor
            content={editorContent}
            onContentChange={handleEditorChange}
            onPost={handlePost}
            username="ユーザー名"
            userHandle="@username"
          />

          {/* 投稿一覧 */}
          <PostList posts={posts} />
        </div>
      </div>
    </MainLayout>
  );
}
