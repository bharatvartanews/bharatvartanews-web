"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = (e: any) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Feedback from ${data.name}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );

    window.location.href =
      `mailto:bharatvartanews24@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-card">
        {/* HEADER */}
        <div className="feedback-header">
          <h2>Feedback</h2>
          <button
            className="feedback-close"
            onClick={() => router.back()}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="feedback-form">
          <input
            placeholder="Your Name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Your Feedback"
            value={data.message}
            onChange={(e) =>
              setData({ ...data, message: e.target.value })
            }
            required
          />

          <button type="submit" className="feedback-submit">
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
