import { Card } from "@/components/ui";
import PostCard from "./PostCard";
import { Post } from "@/types/post";
import styles from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  onPostUpdate?: (postId: string, newContent: string) => void;
  onPostDelete?: (postId: string) => void;
}

export default function PostList({
  posts,
  onPostUpdate,
  onPostDelete,
}: PostListProps) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <Card>
            <PostCard
              post={post}
              onPostUpdate={onPostUpdate}
              onPostDelete={onPostDelete}
            />
          </Card>
        </div>
      ))}
    </div>
  );
}
