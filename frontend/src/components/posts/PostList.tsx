import { Card } from "@/components/ui";
import PostCard from "./PostCard";
import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div style={{ marginTop: "32px" }}>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "16px" }}>
          <Card>
            <PostCard post={post} />
          </Card>
        </div>
      ))}
    </div>
  );
}
