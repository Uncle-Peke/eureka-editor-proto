import { useState } from "react";
import PostEditor from "./PostEditor";
import { PostsAPI, CreatePostRequest } from "@/lib/api/posts";

interface CreatePostProps {
  username?: string;
  userHandle?: string;
  onPostCreated?: (post: any) => void;
  onError?: (error: string) => void;
}

export default function CreatePost({
  username = "ユーザー名",
  userHandle = "@username",
  onPostCreated,
  onError,
}: CreatePostProps) {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content || content.trim() === "" || content === "<p></p>") {
      return;
    }

    try {
      const postData: CreatePostRequest = {
        content,
        username,
        userHandle,
      };

      const newPost = await PostsAPI.createPost(postData);

      // 投稿成功後の処理
      setContent("");

      // 親コンポーネントに通知
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "投稿の作成に失敗しました";
      console.error("投稿の作成に失敗しました:", error);

      if (onError) {
        onError(errorMessage);
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <PostEditor
      content={content}
      onContentChange={setContent}
      onPost={handlePost}
      username={username}
      userHandle={userHandle}
      isEditing={false}
    />
  );
}
