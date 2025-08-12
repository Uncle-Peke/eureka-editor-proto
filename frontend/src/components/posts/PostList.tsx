import { Card } from "@/components/ui";
import PostCard from "./PostCard";
import { Post } from "@/types/post";
import styles from "./PostList.module.css";
import { useState, useEffect } from "react";
import { PostsAPI } from "@/lib/api/posts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface PostListProps {
  posts?: Post[];
  onPostUpdate?: (postId: string, newContent: string) => void;
  onPostDelete?: (postId: string) => void;
  onNewPost?: (newPost: Post) => void;
  autoFetch?: boolean;
}

export default function PostList({
  posts: externalPosts,
  onPostUpdate,
  onPostDelete,
  onNewPost,
  autoFetch = true,
}: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(externalPosts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 外部からpostsが渡された場合はそれを使用、そうでなければAPIから取得
  const fetchPosts = async () => {
    if (externalPosts) {
      setPosts(externalPosts);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await PostsAPI.getPosts();
      // 投稿を新しい順（timestamp降順）でソート
      const sortedPosts = fetchedPosts.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB.getTime() - dateA.getTime();
      });
      setPosts(sortedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の取得に失敗しました");
      console.error("投稿一覧の取得に失敗しました:", err);
    } finally {
      setLoading(false);
    }
  };

  // 新しい投稿を追加する処理
  const addNewPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // 親コンポーネントにも通知（オプション）
    if (onNewPost) {
      onNewPost(newPost);
    }
  };

  // 投稿更新時の処理
  const handlePostUpdate = async (postId: string, newContent: string) => {
    try {
      // ローカル状態を更新
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, content: newContent } : post
        )
      );

      // 親コンポーネントにも通知（オプション）
      if (onPostUpdate) {
        onPostUpdate(postId, newContent);
      }
    } catch (error) {
      console.error("投稿の更新処理に失敗しました:", error);
    }
  };

  // 投稿削除時の処理
  const handlePostDelete = async (postId: string) => {
    try {
      // ローカル状態を更新
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      // 親コンポーネントにも通知（オプション）
      if (onPostDelete) {
        onPostDelete(postId);
      }
    } catch (error) {
      console.error("投稿の削除処理に失敗しました:", error);
    }
  };

  // 外部からpostsが変更された場合の処理
  useEffect(() => {
    if (externalPosts) {
      setPosts(externalPosts);
    }
  }, [externalPosts]);

  // 自動取得の設定
  useEffect(() => {
    if (autoFetch && !externalPosts) {
      fetchPosts();
    }
  }, [autoFetch, externalPosts]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <LoadingSpinner size="lg" />
          <p>投稿を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <p>エラー: {error}</p>
          <button onClick={fetchPosts}>再試行</button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ 
          textAlign: "center", 
          padding: "3rem 2rem",
          backgroundColor: "var(--color-bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "2px dashed var(--color-border-secondary)",
          margin: "var(--spacing-4) 0"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
          <h3 style={{ 
            margin: "0 0 0.5rem 0", 
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-lg)"
          }}>
            まだ投稿がありません
          </h3>
          <p style={{ 
            margin: 0, 
            color: "var(--color-text-muted)",
            fontSize: "var(--font-size-base)"
          }}>
            最初の投稿を作成してみましょう！
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <Card>
            <PostCard
              post={post}
              onPostUpdate={handlePostUpdate}
              onPostDelete={handlePostDelete}
            />
          </Card>
        </div>
      ))}
    </div>
  );
}
