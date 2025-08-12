import { useState, useCallback } from "react";
import { Post } from "@/types/post";
import {
  PostsAPI,
  CreatePostRequest,
  UpdatePostRequest,
} from "@/lib/api/posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 投稿一覧を取得
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await PostsAPI.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  // 特定の投稿を取得
  const fetchPost = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const post = await PostsAPI.getPost(id);
      return post;
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の取得に失敗しました");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 新しい投稿を作成
  const createPost = useCallback(async (postData: CreatePostRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await PostsAPI.createPost(postData);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の作成に失敗しました");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 投稿を更新
  const updatePost = useCallback(
    async (id: string, postData: UpdatePostRequest) => {
      setLoading(true);
      setError(null);
      try {
        const updatedPost = await PostsAPI.updatePost(id, postData);
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
        return updatedPost;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "投稿の更新に失敗しました"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 投稿を削除
  const deletePost = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await PostsAPI.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿の削除に失敗しました");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // エラーをクリア
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    clearError,
  };
}
