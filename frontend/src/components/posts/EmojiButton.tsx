import { IconButton } from "@/components/ui";

interface EmojiButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function EmojiButton({ onClick, disabled }: EmojiButtonProps) {
  return (
    <IconButton
      icon={
        <svg
          style={{ width: "20px", height: "20px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      onClick={onClick}
      disabled={disabled}
    />
  );
}
