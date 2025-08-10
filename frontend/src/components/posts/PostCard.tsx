import { Avatar } from "@/components/ui";
import { Post } from "@/types/post";
import PostActions from "./PostActions";

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
      }}
    >
      <Avatar fallbackText={post.username.charAt(0)} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <p style={{ fontWeight: "500", color: "#212529" }}>{post.username}</p>
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            {post.userHandle}
          </span>
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            ・{post.timestamp}
          </span>
        </div>
        <p style={{ color: "#212529", marginTop: "4px" }}>{post.content}</p>
        <PostActions
          replies={post.replies}
          reposts={post.reposts}
          likes={post.likes}
        />
      </div>
    </div>
  );
}
