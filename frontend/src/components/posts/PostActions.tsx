import { IconButton } from "@/components/ui";

interface PostActionsProps {
  replies: number;
  reposts: number;
  likes: number;
  onReply?: () => void;
  onRepost?: () => void;
  onLike?: () => void;
}

export default function PostActions({
  replies,
  reposts,
  likes,
  onReply,
  onRepost,
  onLike,
}: PostActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        marginTop: "12px",
        color: "#6c757d",
      }}
    >
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "inherit",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#0d6efd")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
        onClick={onReply}
      >
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>{replies}</span>
      </button>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "inherit",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#198754")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
        onClick={onRepost}
      >
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>{reposts}</span>
      </button>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "inherit",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#dc3545")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
        onClick={onLike}
      >
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{likes}</span>
      </button>
    </div>
  );
}
