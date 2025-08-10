import { useState, useEffect } from "react";

export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // スクロール位置が100px以上でボタンを表示
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 自動追加されるスクロールトップボタンを非表示にする
    const hideAutoScrollButtons = () => {
      // Next.jsやVercelが自動で追加するボタンを非表示にする
      const autoButtons = document.querySelectorAll(`
        [data-nextjs-scroll-focus-boundary],
        [data-nextjs-scroll-to-top],
        [data-vercel-scroll-to-top],
        .scroll-to-top,
        .scroll-to-top-button,
        .scroll-top,
        .scroll-top-button,
        [class*="scroll-to-top"],
        [class*="scroll-top"],
        [aria-label*="scroll to top"],
        [aria-label*="back to top"],
        [aria-label*="一番上に戻る"]
      `);

      autoButtons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.style.display = "none";
          button.style.visibility = "hidden";
          button.style.opacity = "0";
        }
      });
    };

    // 初期化時に実行
    hideAutoScrollButtons();

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", toggleVisibility);

    // MutationObserverでDOMの変更を監視し、自動追加されるボタンを非表示にする
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          hideAutoScrollButtons();
        }
      });
    });

    // body要素の変更を監視
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { isVisible, scrollToTop };
};
