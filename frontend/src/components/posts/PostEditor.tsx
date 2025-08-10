import { Button, Card, Avatar, IconButton } from "@/components/ui";
import TipTapEditor from "@/components/editor/TipTapEditor";

interface PostEditorProps {
  content: string;
  onContentChange: (html: string) => void;
  onPost: () => void;
  username?: string;
  userHandle?: string;
}

export default function PostEditor({
  content,
  onContentChange,
  onPost,
  username = "ユーザー名",
  userHandle = "@username",
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

      {/* Notionっぽいエディター */}
      <TipTapEditor
        content={content}
        placeholder="何か投稿してみましょう..."
        onChange={onContentChange}
        minHeight={120}
        maxHeight={400}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "var(--spacing-4)",
          borderTop: "1px solid var(--color-border-secondary)",
          marginTop: "var(--spacing-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
          }}
        >
          <IconButton
            icon={
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <IconButton
            icon={
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
        <Button onClick={onPost} disabled={!content.trim()}>
          投稿
        </Button>
      </div>
    </Card>
  );
}
