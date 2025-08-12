import { useEffect } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string | null;
  onClear?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function ErrorMessage({
  error,
  onClear,
  autoHide = true,
  autoHideDelay = 5000,
}: ErrorMessageProps) {
  useEffect(() => {
    if (autoHide && error && onClear) {
      const timer = setTimeout(() => {
        onClear();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [error, autoHide, autoHideDelay, onClear]);

  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <svg
          className={styles.errorIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className={styles.errorText}>{error}</span>
        {onClear && (
          <button
            className={styles.closeButton}
            onClick={onClear}
            aria-label="エラーを閉じる"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
