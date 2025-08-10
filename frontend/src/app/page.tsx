"use client";

import { Button } from "@headlessui/react";
import TipTapEditor from "@/components/editor/TipTapEditor";
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Post } from "@/types/post";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content:
        "これはサンプルの投稿です。実際のアプリケーションでは、ここにユーザーの投稿内容が表示されます。",
      username: "サンプルユーザー",
      userHandle: "@sampleuser",
      timestamp: "2時間前",
      likes: 24,
      reposts: 5,
      replies: 12,
    },
  ]);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (html: string) => {
    setEditorContent(html);
  };

  const handlePost = () => {
    if (!editorContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: editorContent,
      username: "ユーザー名",
      userHandle: "@username",
      timestamp: "今",
      likes: 0,
      reposts: 0,
      replies: 0,
    };

    setPosts([newPost, ...posts]);
    setEditorContent("");
  };

  return (
    <MainLayout>
      {/* エディターエリア */}
      <div style={{ padding: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dee2e6",
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                <p style={{ fontWeight: "500", color: "#212529" }}>
                  ユーザー名
                </p>
                <p style={{ fontSize: "14px", color: "#6c757d" }}>
                  新しい投稿を作成
                </p>
              </div>
            </div>

            {/* Notionっぽいエディター */}
            <TipTapEditor
              placeholder="何か投稿してみましょう..."
              onChange={handleEditorChange}
              minHeight={120}
              maxHeight={400}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "1px solid #f8f9fa",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <button
                  style={{
                    padding: "8px",
                    color: "#6c757d",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  style={{
                    padding: "8px",
                    color: "#6c757d",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
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
                </button>
              </div>
              <Button
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "8px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                投稿
              </Button>
            </div>
          </div>

          {/* 投稿一覧 */}
          <div style={{ marginTop: "32px" }}>
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#dee2e6",
                    borderRadius: "50%",
                  }}
                ></div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <p style={{ fontWeight: "500", color: "#212529" }}>
                      サンプルユーザー
                    </p>
                    <span style={{ fontSize: "14px", color: "#6c757d" }}>
                      @sampleuser
                    </span>
                    <span style={{ fontSize: "14px", color: "#6c757d" }}>
                      ・2時間前
                    </span>
                  </div>
                  <p style={{ color: "#212529", marginTop: "4px" }}>
                    これはサンプルの投稿です。実際のアプリケーションでは、ここにユーザーの投稿内容が表示されます。
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      marginTop: "12px",
                      color: "#6c757d",
                    }}
                  >
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#0d6efd")
                      }
                    >
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>12</span>
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#198754")
                      }
                    >
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>5</span>
                    </button>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#dc3545")
                      }
                    >
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>24</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
