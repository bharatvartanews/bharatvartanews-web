// "use client";

// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaXTwitter,
//   FaYoutube,
//   FaEnvelope
// } from "react-icons/fa6";

// export default function footer() {
//   return (
//     <footer className="bv-footer">
//       <div className="bv-footer-inner">
//         {/* BRAND */}
//         <div className="bv-footer-brand">
//           <img
//             src="/news.jpg"
//             alt="Bharat Varta News"
//             className="bv-footer-logo"
//           />
//           <p className="bv-footer-tagline">
//             तेज़ नज़र, हर ख़बर पर
//           </p>
//         </div>

//         {/* COMPANY */}
//         <div className="bv-footer-col">
//           <h4>Company</h4>
//           <ul>
//             <li>
//               <Link href="/">About Us</Link>
//             </li>
//             <li>
//               <Link href="/">Contact</Link>
//             </li>
//             <li>
//               <a href="mailto:feedback@bharatvarta.com">
//                 Feedback
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* FOLLOW */}
//         <div className="bv-footer-col">
//           <h4>Follow</h4>
//           <div className="bv-footer-social">
//             <a href="#" target="_blank" title="Facebook">
//               <FaFacebookF />
//             </a>
//             <a href="#" target="_blank" title="Instagram">
//               <FaInstagram />
//             </a>
//             <a href="#" target="_blank" title="X (Twitter)">
//               <FaXTwitter />
//             </a>
//             <a href="#" target="_blank" title="YouTube">
//               <FaYoutube />
//             </a>
//             <a
//               href="mailto:feedback@bharatvarta.com"
//               title="Email"
//             >
//               <FaEnvelope />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="bv-footer-bottom">
//         © {new Date().getFullYear()} Bharat Varta News •
//         Designed & Developed by Bharat Varta Tech Team
//       </div>
//     </footer>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaXTwitter,
//   FaYoutube,
//   FaEnvelope
// } from "react-icons/fa6";

// export default function footer() {
//   const [showTop, setShowTop] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setShowTop(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <footer className="bv-footer">
//       <div className="bv-footer-inner">
//         {/* LEFT — COMPANY */}
//         <div className="bv-footer-col bv-footer-left">
//           <h4>Company</h4>
//           <ul>
//             <li><Link href="/">About Us</Link></li>
//             <li><Link href="/">Contact</Link></li>
//             <li>
//               <a href="mailto:feedback@bharatvarta.com">
//                 Feedback
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* CENTER — LOGO */}
//         <div className="bv-footer-center">
//           <img
//             src="/news.jpg"
//             alt="Bharat Varta News"
//             className="bv-footer-logo"
//           />
//           <p className="bv-footer-tagline">
//             तेज़ नज़र, हर ख़बर पर
//           </p>
//         </div>

//         {/* RIGHT — FOLLOW */}
//         <div className="bv-footer-col bv-footer-right">
//           <h4>Follow</h4>
//           <div className="bv-footer-social">
//             <a href="#" title="Facebook"><FaFacebookF /></a>
//             <a href="#" title="Instagram"><FaInstagram /></a>
//             <a href="#" title="X (Twitter)"><FaXTwitter /></a>
//             <a href="#" title="YouTube"><FaYoutube /></a>
//             <a href="mailto:feedback@bharatvarta.com" title="Email">
//               <FaEnvelope />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* COPYRIGHT */}
//       <div className="bv-footer-bottom">
//         © {new Date().getFullYear()} Bharat Varta News •
//         Designed & Developed by Bharat Varta Tech Team
//       </div>

//       {/* BACK TO TOP */}
//       {showTop && (
//         <button
//           className="bv-back-to-top"
//           onClick={() =>
//             window.scrollTo({ top: 0, behavior: "smooth" })
//           }
//           aria-label="Back to top"
//         >
//           ↑
//         </button>
//       )}
//     </footer>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaXTwitter,
//   FaYoutube,
//   FaEnvelope
// } from "react-icons/fa6";

// export default function Footer() {
//   const [showTop, setShowTop] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setShowTop(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <footer className="bv-footer">
//       <div className="bv-footer-inner">

//         {/* ================= LEFT ================= */}
//         <div className="bv-footer-col bv-footer-left">
//           <h4>Company</h4>
//           <ul>
//             <li>
//               <Link href="/about">About Us</Link>
//             </li>
//             <li>
//               <Link href="/contact">Contact</Link>
//             </li>
//             <li>
//               <a href="mailto:feedback@bharatvarta.com">
//                 Feedback
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* ================= CENTER ================= */}
//         <div className="bv-footer-center">
//           <img
//             src="/news.jpg"
//             alt="Bharat Varta News"
//             className="bv-footer-logo"
//           />
//           <p className="bv-footer-tagline">
//             तेज़ नज़र, हर ख़बर पर
//           </p>
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div className="bv-footer-col bv-footer-right">
//           <h4>Follow</h4>

//           <div className="bv-footer-social">
//             <a
//               href="https://www.facebook.com/share/K7hUijJRsdYiP5uE/?mibextid=qi2Omg"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//             >
//               <FaFacebookF />
//             </a>

//             <a
//               href="https://www.instagram.com/bharatvartanews"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//             >
//               <FaInstagram />
//             </a>

//             <a
//               href="https://twitter.com/bharatvarta"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="X"
//             >
//               <FaXTwitter />
//             </a>

//             <a
//               href="https://www.youtube.com/@BharatVartanews"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//             >
//               <FaYoutube />
//             </a>

//             <a
//               href="mailto:bharatvartanews24@gmail.com"
//               aria-label="Email"
//             >
//               <FaEnvelope />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* ================= COPYRIGHT ================= */}
//       <div className="bv-footer-bottom">
//         © {new Date().getFullYear()} Bharat Varta News •
//         Designed & Developed by Bharat Varta Tech Team
//       </div>

//       {/* ================= BACK TO TOP ================= */}
//       {showTop && (
//         <button
//           className="bv-back-to-top"
//           onClick={() =>
//             window.scrollTo({ top: 0, behavior: "smooth" })
//           }
//           aria-label="Back to top"
//         >
//           ↑
//         </button>
//       )}
//     </footer>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaEnvelope
} from "react-icons/fa6";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bv-footer">
      <div className="bv-footer-inner">

        <div className="bv-footer-col bv-footer-left">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              <a href="mailto:bharatvartanews24@gmail.com">Feedback</a>
            </li>
          </ul>
        </div>

        <div className="bv-footer-center">
          <img src="/news.jpg" alt="Bharat Varta" className="bv-footer-logo" />
          <p className="bv-footer-tagline">तेज़ नज़र, हर ख़बर पर</p>
        </div>

        <div className="bv-footer-col bv-footer-right">
          <h4>Follow</h4>
          <div className="bv-footer-social">
            <a href="https://www.facebook.com/share/K7hUijJRsdYiP5uE/?mibextid=qi2Omg" target="_blank"><FaFacebookF /></a>
            <a href="https://www.instagram.com/bharatvartanews" target="_blank"><FaInstagram /></a>
            <a href="https://twitter.com/bharatvarta" target="_blank"><FaXTwitter /></a>
            <a href="https://www.youtube.com/@BharatVartanews" target="_blank"><FaYoutube /></a>
            <a href="mailto:bharatvartanews24@gmail.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="bv-footer-bottom">
        © {new Date().getFullYear()} Bharat Varta News • Designed & Developed by Bharat Varta Tech Team
      </div>

      {showTop && (
        <button
          className="bv-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </footer>
  );
}
