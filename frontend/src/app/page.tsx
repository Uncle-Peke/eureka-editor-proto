"use client";

import PostEditor from "@/components/posts/PostEditor";
import PostList from "@/components/posts/PostList";
import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { PostsAPI } from "@/lib/api/posts";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postContent, setPostContent] = useState("");

  // 初期データの取得
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await PostsAPI.getPosts();

      // 配列であることを確認し、配列でない場合は空配列を設定
      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts);
      } else {
        console.warn("APIから配列以外の値が返されました:", fetchedPosts);
        setPosts([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "投稿の取得に失敗しました";
      setError(errorMessage);
      console.error("投稿の取得に失敗しました:", err);
      // エラー時は空配列を設定
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (postId: string, newContent: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  };

  const handlePostDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleContentChange = (html: string) => {
    setPostContent(html);
  };

  const handlePostSuccess = async () => {
    // 投稿成功後に投稿一覧を再取得
    await fetchPosts();
  };

  const handleNewPost = (newPost: Post) => {
    // 新しい投稿を先頭に追加
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "var(--spacing-4)",
          backgroundColor: "var(--color-bg-primary)",
          minHeight: "calc(100vh - var(--header-height))",
          borderRadius: "var(--radius-lg) 0 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
          <p>投稿を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "var(--spacing-4)",
          backgroundColor: "var(--color-bg-primary)",
          minHeight: "calc(100vh - var(--header-height))",
          borderRadius: "var(--radius-lg) 0 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem", color: "red" }}>
            ⚠️
          </div>
          <p style={{ color: "red", marginBottom: "1rem" }}>エラー: {error}</p>
          <button
            onClick={fetchPosts}
            style={{
              padding: "var(--spacing-2) var(--spacing-3)",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
            }}
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "var(--spacing-4)",
        backgroundColor: "var(--color-bg-primary)",
        minHeight: "calc(100vh - var(--header-height))",
        borderRadius: "var(--radius-lg) 0 0 0",
      }}
    >
      <PostEditor
        content={postContent}
        onContentChange={handleContentChange}
        onPost={handleNewPost}
        username="現在のユーザー"
        userHandle="@currentuser"
      />
      <div style={{ marginTop: "var(--spacing-6)" }}>
        <PostList
          posts={posts}
          onPostUpdate={handlePostUpdate}
          onPostDelete={handlePostDelete}
          onNewPost={handleNewPost}
          autoFetch={false}
        />
      </div>
    </div>
  );
}
