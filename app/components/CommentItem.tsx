// "use client";

// import { useState } from "react";

// function timeAgo(date: string) {
//   const mins = Math.floor(
//     (Date.now() - new Date(date).getTime()) / 60000
//   );
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins} min ago`;
//   return `${Math.floor(mins / 60)}h ago`;
// }

// export default function CommentItem({
//   comment,
//   ownerKey,
//   onEdit,
//   onDelete,
//   onReply,
//   onReport,
// }: any) {
//   const isOwner = comment.ownerKey === ownerKey;
//   const [editing, setEditing] = useState(false);
//   const [replying, setReplying] = useState(false);
//   const [text, setText] = useState(comment.content);
//   const [replyText, setReplyText] = useState("");

//   return (
//     <li className="bv-comment-card">
//       <img
//         src="/man.png"
//         className="bv-avatar"
//         alt="avatar"
//       />

//       <div className="bv-comment-body">
//         <div className="bv-comment-head">
//           <div>
//             <span className="bv-user-name">Guest</span>
//             <span className="bv-time">
//               · {timeAgo(comment.createdAt)}
//             </span>
//           </div>

//           <div className="bv-menu">
//             <button>⋯</button>
//             <div className="bv-menu-dd">
//               {isOwner && (
//                 <button onClick={() => setEditing(true)}>
//                   Edit
//                 </button>
//               )}
//               {isOwner && (
//                 <button onClick={() => onDelete(comment.id)}>
//                   Delete
//                 </button>
//               )}
//               <button onClick={() => onReport(comment.id)}>
//                 Report
//               </button>
//             </div>
//           </div>
//         </div>

//         {!editing ? (
//           <p className="bv-comment-text">{comment.content}</p>
//         ) : (
//           <div className="bv-edit-box">
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <button onClick={() => onEdit(comment.id, text)}>
//               Save
//             </button>
//           </div>
//         )}

//         <div className="bv-comment-footer">
//           <span
//             className="bv-reply-link"
//             onClick={() => setReplying(!replying)}
//           >
//             Reply
//           </span>

//           {comment.replies?.length > 0 && (
//             <span className="bv-reply-count">
//               · {comment.replies.length} replies
//             </span>
//           )}
//         </div>

//         {replying && (
//           <div className="bv-reply-box">
//             <textarea
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               placeholder="Write a reply…"
//             />
//             <button
//               onClick={() => {
//                 onReply(comment.id, replyText);
//                 setReplyText("");
//                 setReplying(false);
//               }}
//             >
//               Reply
//             </button>
//           </div>
//         )}

//         {comment.replies?.length > 0 && (
//           <ul className="bv-replies">
//             {comment.replies.map((r: any) => (
//               <li key={r.id} className="bv-reply-item">
//                 <img
//                   src="/man.png"
//                   className="bv-avatar sm"
//                 />
//                 <div>
//                   <span className="bv-user-name">Guest</span>
//                   <span className="bv-time">
//                     · {timeAgo(r.createdAt)}
//                   </span>
//                   <p>{r.content}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </li>
//   );
// }
"use client";

import { useState } from "react";

function timeAgo(date: string) {
  const mins = Math.floor(
    (Date.now() - new Date(date).getTime()) / 60000
  );
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function CommentItem({
  comment,
  ownerKey,
  onEdit,
  onDelete,
  onReply,
  onReport,
}: any) {
  const isOwner = comment.ownerKey === ownerKey;

  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState(comment.content);
  const [replyText, setReplyText] = useState("");

  function saveEdit() {
    if (!text.trim()) return;
    onEdit(comment.id, text);
    setEditing(false); // ✅ CRITICAL FIX
  }

  return (
    <li className="bv-comment-card">
      <img
        src="/man.png"
        className="bv-avatar"
        alt="avatar"
      />

      <div className="bv-comment-body">
        {/* HEADER */}
        <div className="bv-comment-head">
          <div className="bv-comment-user">
            <span className="bv-user-name">Guest</span>
            <span className="bv-time">
              · {timeAgo(comment.createdAt)}
            </span>
          </div>

          <div className="bv-menu">
            <button className="bv-menu-btn">⋯</button>
            <div className="bv-menu-dd">
              {isOwner && (
                <button onClick={() => setEditing(true)}>
                  Edit
                </button>
              )}
              {isOwner && (
                <button onClick={() => onDelete(comment.id)}>
                  Delete
                </button>
              )}
              <button onClick={() => onReport(comment.id)}>
                Report
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {!editing ? (
          <p className="bv-comment-text">
            {comment.content}
          </p>
        ) : (
          <div className="bv-edit-box">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bv-edit-input"
            />
            <div className="bv-edit-actions">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        {!editing && (
          <div className="bv-comment-footer">
            <span
              className="bv-reply-link"
              onClick={() => setReplying(!replying)}
            >
              Reply
            </span>

            {comment.replies?.length > 0 && (
              <span className="bv-reply-count">
                · {comment.replies.length} replies
              </span>
            )}
          </div>
        )}

        {/* REPLY */}
        {replying && (
          <div className="bv-reply-box">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply…"
              className="bv-reply-input"
            />
            <button
              onClick={() => {
                onReply(comment.id, replyText);
                setReplyText("");
                setReplying(false);
              }}
            >
              Reply
            </button>
          </div>
        )}

        {/* REPLIES */}
        {comment.replies?.length > 0 && (
          <ul className="bv-replies">
            {comment.replies.map((r: any) => (
              <li key={r.id} className="bv-reply-item">
                <img
                  src="/man.png"
                  className="bv-avatar sm"
                />
                <div>
                  <span className="bv-user-name">
                    Guest
                  </span>
                  <span className="bv-time">
                    · {timeAgo(r.createdAt)}
                  </span>
                  <p className="bv-reply-text">
                    {r.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
