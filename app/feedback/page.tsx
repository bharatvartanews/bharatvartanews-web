"use client";

import { useState } from "react";

export default function FeedbackPage() {
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
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );

    window.location.href = `mailto:bharatvartanews24@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="container page">
      <h1>Feedback</h1>

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

        <button type="submit">Send Feedback</button>
      </form>
    </main>
  );
}
