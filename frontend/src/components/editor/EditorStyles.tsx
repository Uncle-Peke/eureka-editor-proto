"use client";

import React from "react";

export default function EditorStyles() {
  return (
    <style jsx global>{`
      .ProseMirror {
        outline: none;
      }
      .ProseMirror p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #9ca3af; /* gray-400 */
        pointer-events: none;
        height: 0;
      }
      .ProseMirror h1 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        margin: 0.5rem 0;
      }
      .ProseMirror h2 {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0.5rem 0;
      }
      .ProseMirror h3 {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 600;
        margin: 0.5rem 0;
      }
      .ProseMirror blockquote {
        border-left: 3px solid #e5e7eb; /* gray-200 */
        margin: 0.5rem 0;
        padding-left: 0.75rem;
        color: #6b7280; /* gray-500 */
      }
      .ProseMirror pre {
        background: #0b1020;
        color: #e5e7eb;
        padding: 0.75rem;
        border-radius: 0.375rem;
        overflow-x: auto;
      }
      .ProseMirror hr {
        border: none;
        border-top: 1px solid #e5e7eb;
        margin: 0.75rem 0;
      }
      .ProseMirror ul,
      .ProseMirror ol {
        padding-left: 1.5rem;
      }
      .ProseMirror li p {
        margin: 0.25rem 0;
      }
    `}</style>
  );
}
