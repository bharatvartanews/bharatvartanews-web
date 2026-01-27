// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function FeedbackPage() {
//   const router = useRouter();

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const submit = (e: any) => {
//     e.preventDefault();

//     const subject = encodeURIComponent(
//       `Feedback from ${data.name}`
//     );
//     const body = encodeURIComponent(
//       `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
//     );

//     window.location.href =
//       `mailto:bharatvartanews24@gmail.com?subject=${subject}&body=${body}`;
//   };

//   return (
//     <div className="feedback-overlay">
//       <div className="feedback-card">
//         {/* HEADER */}
//         <div className="feedback-header">
//           <h2>Feedback</h2>
//           <button
//             className="feedback-close"
//             onClick={() => router.back()}
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* FORM */}
//         <form onSubmit={submit} className="feedback-form">
//           <input
//             placeholder="Your Name"
//             value={data.name}
//             onChange={(e) =>
//               setData({ ...data, name: e.target.value })
//             }
//             required
//           />

//           <input
//             type="email"
//             placeholder="Your Email"
//             value={data.email}
//             onChange={(e) =>
//               setData({ ...data, email: e.target.value })
//             }
//             required
//           />

//           <textarea
//             placeholder="Your Feedback"
//             value={data.message}
//             onChange={(e) =>
//               setData({ ...data, message: e.target.value })
//             }
//             required
//           />

//           <button type="submit" className="feedback-submit">
//             Send Feedback
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  // success=true URL param detect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
    }
  }, []);

  return (
    <main className="feedback-page">
      <div className="feedback-card">
        {showSuccess ? (
          /* ================= SUCCESS ================= */
          <div className="feedback-success">
            <h3>Thank you 🙏</h3>
            <p>
              Your feedback has been received.
              <br />
              Thank you for your time and support.
            </p>
          </div>
        ) : (
          /* ================= FORM ================= */
          <>
            <h2 className="feedback-title">Feedback</h2>

            <form
              action="https://formsubmit.co/bharatvartanews24@gmail.com"
              method="POST"
              className="feedback-form"
            >
              {/* ===== FormSubmit config ===== */}
              <input type="hidden" name="_captcha" value="false" />

              <input
                type="hidden"
                name="_subject"
                value="New Feedback from Bharat Varta"
              />

              <input
                type="hidden"
                name="_next"
                value="https://bharatvartanews.com/feedback?success=true"
              />

              {/* ===== Inputs ===== */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />

              <textarea
                name="message"
                placeholder="Your Feedback"
                required
              />

              <button
                type="submit"
                className="feedback-submit"
              >
                Send Feedback
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
