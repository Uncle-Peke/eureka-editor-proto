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
      setPosts(fetchedPosts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "投稿の取得に失敗しました";
      setError(errorMessage);
      console.error("投稿の取得に失敗しました:", err);
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
      <div style={{ padding: "var(--spacing-4)", textAlign: "center" }}>
        <p>投稿を読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "var(--spacing-4)",
          textAlign: "center",
          color: "red",
        }}
      >
        <p>エラー: {error}</p>
        <button onClick={fetchPosts}>再試行</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "var(--spacing-4)" }}>
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
