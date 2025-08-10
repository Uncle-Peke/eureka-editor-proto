"use client";

import PostEditor from "@/components/posts/PostEditor";
import PostList from "@/components/posts/PostList";
import { useState } from "react";
import { Post } from "@/types/post";
import MainLayout from "@/components/layout/MainLayout";

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
    {
      id: "2",
      content: "今日は天気が良いので散歩に行ってきました🌞",
      username: "太郎",
      userHandle: "@taro",
      timestamp: "3時間前",
      likes: 10,
      reposts: 2,
      replies: 3,
    },
    {
      id: "3",
      content: "新しいカフェを見つけた☕ 内装も素敵で落ち着く空間でした。",
      username: "花子",
      userHandle: "@hanako",
      timestamp: "5時間前",
      likes: 18,
      reposts: 4,
      replies: 6,
    },
    {
      id: "4",
      content: "ReactとNext.jsの勉強中。やっぱり触ってみるのが一番早い。",
      username: "健太",
      userHandle: "@kenta",
      timestamp: "1日前",
      likes: 30,
      reposts: 7,
      replies: 8,
    },
    {
      id: "5",
      content: "今日は久しぶりに実家に帰って、家族とゆっくり過ごしました。",
      username: "美咲",
      userHandle: "@misaki",
      timestamp: "2日前",
      likes: 42,
      reposts: 10,
      replies: 15,
    },
    {
      id: "6",
      content: "新しいプロジェクトのデザイン案を作成中。ワクワクする！",
      username: "翔太",
      userHandle: "@shota",
      timestamp: "3日前",
      likes: 15,
      reposts: 3,
      replies: 2,
    },
    {
      id: "7",
      content: "ランニング5km完走！自己ベスト更新しました🏃‍♂️",
      username: "直樹",
      userHandle: "@naoki",
      timestamp: "4日前",
      likes: 27,
      reposts: 6,
      replies: 4,
    },
    {
      id: "8",
      content: "最近ハマってる曲があります。ずっとリピートして聴いてる。",
      username: "さくら",
      userHandle: "@sakura",
      timestamp: "5日前",
      likes: 33,
      reposts: 8,
      replies: 5,
    },
    {
      id: "9",
      content: "AIについての勉強会に参加。とても刺激になった！",
      username: "優斗",
      userHandle: "@yuto",
      timestamp: "1週間前",
      likes: 21,
      reposts: 5,
      replies: 3,
    },
    {
      id: "10",
      content: "久しぶりに映画館へ。やっぱり大画面は迫力が違う！🎬",
      username: "玲奈",
      userHandle: "@rena",
      timestamp: "1週間前",
      likes: 40,
      reposts: 12,
      replies: 9,
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
      <div style={{ padding: "24px", width: "100%", boxSizing: "border-box" }}>
        <div
          style={{
            maxWidth: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
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
