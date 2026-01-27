"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="feedback-page">
      <div className="feedback-card">
        <div className="feedback-success">
          <h3>Contact Us</h3>

          <p>
            <strong>Bharat Varta News</strong>
          </p>

          <p>
            📧 bharatvartanews24@gmail.com
          </p>

          <p>
            📞 +91 9122866370
          </p>

          <p style={{ marginTop: "10px" }}>
            We’d love to hear from you.  
            Feel free to reach out for queries, suggestions, or partnerships.
          </p>

          {/* 👉 Back to Home */}
          <Link href="/" className="feedback-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
