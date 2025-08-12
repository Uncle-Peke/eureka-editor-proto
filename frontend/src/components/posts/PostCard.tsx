import { Avatar } from "@/components/ui";
import KebabMenu from "@/components/ui/KebabMenu";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Post } from "@/types/post";
import PostActions from "./PostActions";
import TipTapViewer from "./TipTapViewer";
import PostEditor from "./PostEditor";
import { useState } from "react";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  onPostUpdate?: (postId: string, newContent: string) => void;
  onPostDelete?: (postId: string) => void;
}

export default function PostCard({
  post,
  onPostUpdate,
  onPostDelete,
}: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const handleCopyId = () => {
    navigator.clipboard.writeText(post.id);
    alert("投稿IDをコピーしました");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content);
  };

  const handleDelete = () => {
    if (confirm("この投稿を削除しますか？")) {
      if (onPostDelete) {
        onPostDelete(post.id);
      } else {
        alert(`投稿ID: ${post.id} を削除しました`);
      }
    }
  };

  const handleEditSave = () => {
    if (onPostUpdate) {
      onPostUpdate(post.id, editContent);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(post.content);
  };

  // 編集モードの場合はPostEditorを表示
  if (isEditing) {
    return (
      <div className={styles.card}>
        <PostEditor
          content={editContent}
          onContentChange={setEditContent}
          onPost={handleEditSave}
          username={post.username}
          userHandle={post.userHandle}
          isEditing={true}
          onCancel={handleEditCancel}
        />
      </div>
    );
  }

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
            <Menu as="div" className={styles.menuWrapper}>
              <MenuButton as={KebabMenu} className={styles.kebabMenu} />
              <MenuItems className={styles.dropdownMenu}>
                <MenuItem
                  as="button"
                  className={styles.menuItem}
                  onClick={handleCopyId}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  IDをコピー
                </MenuItem>
                <MenuItem
                  as="button"
                  className={styles.menuItem}
                  onClick={handleEdit}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  編集
                </MenuItem>
                <MenuItem
                  as="button"
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
                </MenuItem>
              </MenuItems>
            </Menu>
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
