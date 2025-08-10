import { Avatar } from "@/components/ui";
import { Post } from "@/types/post";
import PostActions from "./PostActions";
import TipTapViewer from "./TipTapViewer";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.card}>
      <Avatar fallbackText={post.username.charAt(0)} />
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.username}>{post.username}</p>
          <span className={styles.userHandle}>{post.userHandle}</span>
          <span className={styles.timestamp}>・{post.timestamp}</span>
        </div>
        <TipTapViewer content={post.content} className={styles.postContent} />
        <PostActions
          replies={post.replies}
          reposts={post.reposts}
          likes={post.likes}
        />
      </div>
    </div>
  );
}
