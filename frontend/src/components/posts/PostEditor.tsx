import { Button, Card, Avatar } from "@/components/ui";
import TipTapEditor from "@/components/editor/TipTapEditor";
import ImageButton from "./ImageButton";
import EmojiButton from "./EmojiButton";

interface PostEditorProps {
  content: string;
  onContentChange: (html: string) => void;
  onPost: () => void;
  username?: string;
  userHandle?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function PostEditor({
  content,
  onContentChange,
  onPost,
  username = "ユーザー名",
  userHandle = "@username",
  isEditing = false,
  onCancel,
}: PostEditorProps) {
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
          <Button
            onClick={onPost}
            disabled={
              !content || content.trim() === "" || content === "<p></p>"
            }
          >
            {isEditing ? "更新" : "投稿"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
