import { Avatar } from "@/components/ui";
import KebabMenu from "@/components/ui/KebabMenu";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { Post } from "@/types/post";
import PostActions from "./PostActions";
import TipTapViewer from "./TipTapViewer";
import styles from "./PostCard.module.css";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKebabMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(post.id);
    alert("投稿IDをコピーしました");
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    alert(`投稿ID: ${post.id} を編集します`);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    if (confirm("この投稿を削除しますか？")) {
      alert(`投稿ID: ${post.id} を削除しました`);
      setIsMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.card}>
      <Avatar fallbackText={post.username.charAt(0)} />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <p className={styles.username}>{post.username}</p>
            <span className={styles.userHandle}>{post.userHandle}</span>
            <span className={styles.timestamp}>・{post.timestamp}</span>
          </div>
          <div className={styles.menuContainer}>
            <KebabMenu
              onClick={handleKebabMenuClick}
              className={styles.kebabMenu}
            />
            <DropdownMenu
              isOpen={isMenuOpen}
              onClose={closeMenu}
              className={styles.dropdownMenu}
            >
              <div className={styles.menuItem} onClick={handleCopyId}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                IDをコピー
              </div>
              <div className={styles.menuItem} onClick={handleEdit}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                編集
              </div>
              <div
                className={`${styles.menuItem} ${styles.deleteItem}`}
                onClick={handleDelete}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
                削除
              </div>
            </DropdownMenu>
          </div>
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
