import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/posts/PostCard";
import PostEditor from "@/components/posts/PostEditor";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { CreatePostRequest } from "@/lib/api/posts";

export default function PostsExample() {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    clearError,
  } = usePosts();

  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    // コンポーネントマウント時に投稿一覧を取得
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const postData: CreatePostRequest = {
      content: newPostContent,
      username: "サンプルユーザー",
      userHandle: "@sample_user",
    };

    try {
      await createPost(postData);
      setNewPostContent("");
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
    }
  };

  const handleUpdatePost = async (postId: string, newContent: string) => {
    try {
      await updatePost(postId, { content: newContent });
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>投稿管理サンプル</h1>

      {/* エラーメッセージ */}
      <ErrorMessage error={error} onClear={clearError} />

      {/* 新規投稿フォーム */}
      <div style={{ marginBottom: "30px" }}>
        <h2>新規投稿</h2>
        <PostEditor
          content={newPostContent}
          onContentChange={setNewPostContent}
          onPost={handleCreatePost}
          username="サンプルユーザー"
          userHandle="@sample_user"
        />
      </div>

      {/* 投稿一覧 */}
      <div>
        <h2>投稿一覧 ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>投稿がありません</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostUpdate={handleUpdatePost}
                onPostDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </div>

      {/* 再読み込みボタン */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={fetchPosts}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" />
              読み込み中...
            </>
          ) : (
            "投稿一覧を再読み込み"
          )}
        </button>
      </div>
    </div>
  );
}
