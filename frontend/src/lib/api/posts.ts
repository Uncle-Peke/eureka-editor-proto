import { Post } from "@/types/post";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface CreatePostRequest {
  content: string;
  username: string;
  userHandle: string;
}

export interface UpdatePostRequest {
  content: string;
}

export interface PostsResponse {
  posts: Post[];
}

export interface PostResponse {
  post: Post;
}

export class PostsAPI {
  // 投稿一覧を取得
  static async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // レスポンスの形式を検証
      if (data && Array.isArray(data.posts)) {
        return data.posts;
      } else if (Array.isArray(data)) {
        // 直接配列が返される場合
        return data;
      } else {
        console.warn("予期しないAPIレスポンス形式:", data);
        return [];
      }
    } catch (error) {
      console.error("投稿一覧の取得に失敗しました:", error);
      throw error;
    }
  }

  // 特定の投稿を取得
  static async getPost(id: string): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PostResponse = await response.json();
      return data.post;
    } catch (error) {
      console.error("投稿の取得に失敗しました:", error);
      throw error;
    }
  }

  // 新しい投稿を作成
  static async createPost(postData: CreatePostRequest): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PostResponse = await response.json();
      return data.post;
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
      throw error;
    }
  }

  // 投稿を更新
  static async updatePost(
    id: string,
    postData: UpdatePostRequest
  ): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PostResponse = await response.json();
      return data.post;
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
      throw error;
    }
  }

  // 投稿を削除
  static async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
      throw error;
    }
  }
}
