import { Card } from "@/components/ui";
import PostCard from "./PostCard";
import { Post } from "@/types/post";
import styles from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postItem}>
          <Card>
            <PostCard post={post} />
          </Card>
        </div>
      ))}
    </div>
  );
}
