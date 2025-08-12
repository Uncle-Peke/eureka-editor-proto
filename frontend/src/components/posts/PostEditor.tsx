import { Button, Card, Avatar } from "@/components/ui";
import TipTapEditor from "@/components/editor/TipTapEditor";
import ImageButton from "./ImageButton";
import EmojiButton from "./EmojiButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PostsAPI, CreatePostRequest } from "@/lib/api/posts";
import { useState, useEffect } from "react";

interface PostEditorProps {
  content: string;
  onContentChange: (html: string) => void;
  onPost?: (newPost?: any) => void;
  username?: string;
  userHandle?: string;
  isEditing?: boolean;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function PostEditor({
  content,
  onContentChange,
  onPost,
  username = "ユーザー名",
  userHandle = "@username",
  isEditing = false,
  onCancel,
  isLoading = false,
}: PostEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textContent, setTextContent] = useState("");

  // HTMLタグを除去してテキスト内容を取得
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const extractedText = tempDiv.textContent || tempDiv.innerText || "";
      setTextContent(extractedText);
    }
  }, [content]);

  const handleSubmit = async () => {
    const trimmedContent = textContent.trim();

    if (!trimmedContent) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        // 編集モードの場合は親コンポーネントに委任
        if (onPost) {
          await onPost();
        }
      } else {
        // 新規投稿の場合はPostsAPIを直接使用
        const postData: CreatePostRequest = {
          content,
          username,
          userHandle,
        };

        await PostsAPI.createPost(postData);

        // 投稿成功後の処理
        // 親コンポーネントの状態を更新してエディタをクリア
        onContentChange("");

        // 新しい投稿オブジェクトを作成して親コンポーネントに通知
        const newPost = {
          id: Date.now().toString(), // 一時的なID（APIレスポンスから取得すべき）
          content: postData.content,
          username: postData.username,
          userHandle: postData.userHandle,
          timestamp: new Date().toISOString(),
          likes: 0,
          reposts: 0,
          replies: 0,
        };

        // 親コンポーネントにも通知（オプション）
        if (onPost) {
          onPost(newPost);
        }
      }
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
      alert("投稿の作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !textContent.trim() || isLoading || isSubmitting;

  return (
    <Card padding="lg">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--spacing-3)",
          marginBottom: "var(--spacing-5)",
        }}
      >
        <Avatar fallbackText={username.charAt(0)} />
        <div
          style={{ display: "flex", alignItems: "center", minHeight: "40px" }}
        >
          <p
            style={{
              fontWeight: "500",
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            {username}
          </p>
        </div>
      </div>

      <TipTapEditor
        content={content}
        placeholder="何か投稿してみましょう..."
        onChange={onContentChange}
        minHeight={120}
        maxHeight={600}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "var(--spacing-1)",
          marginTop: "var(--spacing-1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ImageButton />
          <EmojiButton />
        </div>
        <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
          {isEditing && onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              キャンセル
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={isDisabled}>
            {isSubmitting || isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                {isEditing ? "更新中..." : "投稿中..."}
              </>
            ) : isEditing ? (
              "更新"
            ) : (
              "投稿"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
