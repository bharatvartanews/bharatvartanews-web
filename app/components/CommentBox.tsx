// "use client";

// import { useState } from "react";

// export default function CommentBox({
//   articleId
// }: {
//   articleId: number;
// }) {
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function postComment() {
//     if (!content.trim()) return;

//     setLoading(true);

//     try {
//       await fetch("/api/public/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           articleId,
//           content
//         })
//       });

//       setContent("");
//       alert("Comment posted");
//     } catch (e) {
//       alert("Failed to post comment");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="article-comments">
//       <input
//         value={content}
//         onChange={(e) =>
//           setContent(e.target.value)
//         }
//         placeholder="Write a comment…"
//       />
//       <button
//         onClick={postComment}
//         disabled={loading}
//       >
//         {loading ? "Posting..." : "Post"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

// const API = "http://localhost:8080/api/public/comments";
const API =
  process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/comments`
    : "http://localhost:8080/api/public/comments";

const PAGE_SIZE = 5;

export default function CommentBox({ articleId }: { articleId: number }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ownerKey, setOwnerKey] = useState<string | null>(null);

  // guest identity
  useEffect(() => {
    let key = localStorage.getItem("comment_owner");
    if (!key) {
      key = crypto.randomUUID();
      localStorage.setItem("comment_owner", key);
    }
    setOwnerKey(key);
  }, []);

  async function load(p = 1, append = false) {
    const res = await fetch(
      `${API}?articleId=${articleId}&page=${p}&limit=${PAGE_SIZE}`
    );
    const data = await res.json();

    const list = Array.isArray(data)
      ? data
      : data.comments || [];

    setComments((prev) => (append ? [...prev, ...list] : list));
    setHasMore(list.length === PAGE_SIZE);
    setPage(p);
  }

  async function post() {
    if (!content.trim() || !ownerKey) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, content, ownerKey }),
    });

    setContent("");
    load(1, false);
  }

  async function update(id: number, text: string) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text, ownerKey }),
    });
    load(1, false);
  }

  async function remove(id: number) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerKey }),
    });
    load(1, false);
  }

  async function reply(parentId: number, text: string) {
    if (!text.trim()) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        content: text,
        ownerKey,
        parentId,
      }),
    });
    load(1, false);
  }

  async function report(id: number) {
    await fetch(`${API}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId: id }),
    });
    alert("Reported");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="bv-comments">
      <h3 className="bv-comments-title">
        Comments <span>({comments.length})</span>
      </h3>

      {/* ⛔ INPUT AREA — UNCHANGED */}
      <div className="comment-input-row">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment…"
          className="comment-input"
        />
        <button
          onClick={post}
          disabled={!ownerKey}
          className="comment-post-btn"
        >
          Post
        </button>
      </div>

      {/* ✅ ENHANCED LIST */}
      <ul className="bv-comment-list">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            ownerKey={ownerKey}
            onEdit={update}
            onDelete={remove}
            onReply={reply}
            onReport={report}
          />
        ))}
      </ul>

      {hasMore && (
        <button
          className="bv-load-more"
          onClick={() => load(page + 1, true)}
        >
          Load more
        </button>
      )}
    </section>
  );
}
