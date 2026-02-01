// "use client";

// import { usePathname } from "next/navigation";
// import {
//   FaFacebookF,
//   FaXTwitter,
//   FaEnvelope,
//   FaLink,
//   FaInstagram,
//   FaWhatsapp
// } from "react-icons/fa6";

// export default function ShareBar() {
//   const pathname = usePathname();

//   const origin =
//     typeof window !== "undefined"
//       ? window.location.origin
//       : "";

//   const url = `${origin}${pathname}`;
//   const encodedUrl = encodeURIComponent(url);
//   const whatsappText = encodeURIComponent(
//     `Check this news: ${url}`
//   );

//   function copyLink() {
//     navigator.clipboard.writeText(url);
//     alert("Link copied");
//   }

//   return (
//     <div className="article-share">
//       <span className="share-label">Share:</span>

//       {/* Copy */}
//       <button
//         onClick={copyLink}
//         className="share-btn"
//         title="Copy link"
//       >
//         <FaLink />
//       </button>

//       {/* Facebook */}
//       <a
//         href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
//         target="_blank"
//         rel="noreferrer"
//         className="share-btn"
//         title="Share on Facebook"
//       >
//         <FaFacebookF />
//       </a>

//       {/* X (Twitter) */}
//       <a
//         href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
//         target="_blank"
//         rel="noreferrer"
//         className="share-btn"
//         title="Share on X"
//       >
//         <FaXTwitter />
//       </a>

//       {/* WhatsApp */}
//       <a
//        href={`https://wa.me/?text=${encodeURIComponent(url)}`}
//         target="_blank"
//         rel="noreferrer"
//         className="share-btn"
//         title="Share on WhatsApp"
//       >
//         <FaWhatsapp />
//       </a>

//       {/* Instagram – copy link only */}
//       <button
//         onClick={copyLink}
//         className="share-btn"
//         title="Copy link for Instagram"
//       >
//         <FaInstagram />
//       </button>

//       {/* Email */}
//       <a
//         href={`mailto:?subject=${encodeURIComponent(
//           "Check this news"
//         )}&body=${encodedUrl}`}
//         className="share-btn"
//         title="Share via Email"
//       >
//         <FaEnvelope />
//       </a>
//     </div>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaXTwitter,
  FaEnvelope,
  FaLink,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa6";

export default function ShareBar() {
  const pathname = usePathname();

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  // 🔹 Article URL (THIS CREATES PREVIEW)
  const articleUrl = `${origin}${pathname}`;

  // 🔹 Channel / TinyURL (NO PREVIEW EXPECTED)
  // WhatsApp channel for now, future me Insta/FB replace kar sakte ho
  const channelUrl =
    "https://tinyurl.com/bharat-varta-news";

  /**
   * 🔥 DESHAJTIMES-STYLE MESSAGE
   * RULE:
   * 1. Article URL FIRST (preview comes from here)
   * 2. Blank line
   * 3. CTA text
   * 4. Channel link (no preview)
   */
  const whatsappText = `
${articleUrl}

लगातार खबरों के लिए हमारे WhatsApp चैनल से जुड़ें 👇
${channelUrl}
  `.trim();

  function copyLink() {
    navigator.clipboard.writeText(articleUrl);
    alert("Link copied");
  }

  return (
    <div className="article-share">
      <span className="share-label">Share:</span>

      {/* Copy */}
      <button
        onClick={copyLink}
        className="share-btn"
        title="Copy link"
      >
        <FaLink />
      </button>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          articleUrl
        )}`}
        target="_blank"
        rel="noreferrer"
        className="share-btn"
        title="Share on Facebook"
      >
        <FaFacebookF />
      </a>

      {/* X (Twitter) */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          articleUrl
        )}`}
        target="_blank"
        rel="noreferrer"
        className="share-btn"
        title="Share on X"
      >
        <FaXTwitter />
      </a>

      {/* WhatsApp – FIXED */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          whatsappText
        )}`}
        target="_blank"
        rel="noreferrer"
        className="share-btn"
        title="Share on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Instagram – copy link only */}
      <button
        onClick={copyLink}
        className="share-btn"
        title="Copy link for Instagram"
      >
        <FaInstagram />
      </button>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodeURIComponent(
          "Check this news"
        )}&body=${encodeURIComponent(articleUrl)}`}
        className="share-btn"
        title="Share via Email"
      >
        <FaEnvelope />
      </a>
    </div>
  );
}
