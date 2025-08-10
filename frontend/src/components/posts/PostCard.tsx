import { Avatar } from "@/components/ui";
import { Post } from "@/types/post";
import PostActions from "./PostActions";
import TipTapViewer from "./TipTapViewer";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "16px",
      }}
    >
      <Avatar fallbackText={post.username.charAt(0)} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "40px",
          }}
        >
          <p style={{ fontWeight: "500", color: "#212529", margin: 0 }}>
            {post.username}
          </p>
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            {post.userHandle}
          </span>
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            ・{post.timestamp}
          </span>
        </div>
        <TipTapViewer
          content={post.content}
          className="post-content"
          style={{ color: "#212529", marginTop: "4px" }}
        />
        <PostActions
          replies={post.replies}
          reposts={post.reposts}
          likes={post.likes}
        />
      </div>
    </div>
  );
}
