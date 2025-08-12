import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "currentColor",
}: LoadingSpinnerProps) {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <svg className={styles.spinnerSvg} viewBox="0 0 24 24" style={{ color }}>
        <circle
          className={styles.spinnerCircle}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
