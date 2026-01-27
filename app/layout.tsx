// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import "./globals.css";
// import ProfileButton from "../app/components/ProfileButton";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [lang, setLang] = useState("en");
//   const pathname = usePathname();

//   const tabClass = (path: string) =>
//     pathname === path ? "nav-tab active" : "nav-tab";

//   return (
//     <html lang="en">
//       <body>
//         <header className="header">
//           <div className="header-inner">
//             {/* LOGO */}
//             <div className="logo">
//               <img src="/logo_a.png" alt="Bharat Varta" width={100} height={80} />
//             </div>

//             {/* LANGUAGE TOGGLE */}
//             <div className="lang-toggle">
//               <button
//                 className={lang === "hi" ? "active" : ""}
//                 onClick={() => setLang("hi")}
//               >
//                 हिन्दी
//               </button>
//               <button
//                 className={lang === "en" ? "active" : ""}
//                 onClick={() => setLang("en")}
//               >
//                 EN
//               </button>
//             </div>

//             {/* SEARCH */}
//             <div className="search-box">
//               <input placeholder="Search news..." />
//             </div>

//             {/* NAVIGATION – BUTTON STYLE */}
//             <nav className="nav">
//               <Link href="/" className={tabClass("/")}>
//                 Home
//               </Link>
//               <Link href="/videos" className={tabClass("/videos")}>
//                 Videos
//               </Link>
//               <Link href="/stories" className={tabClass("/stories")}>
//                 Stories
//               </Link>
//               <Link href="/live" className={tabClass("/live")}>
//                 Live
//               </Link>
//                <ProfileButton />
//             </nav>
//           </div>
//         </header>

//         {children}

//         <footer className="footer">
//           <div className="footer-inner">
//             <div>
//               <h4>Bharat Varta</h4>
//               <p>Independent digital news platform.</p>
//             </div>
//             <div>
//               <h4>Company</h4>
//               <p>About Us</p>
//               <p>Contact</p>
//               <p>Feedback</p>
//             </div>
//             <div>
//               <h4>Follow</h4>
//               <p>Facebook</p>
//               <p>X (Twitter)</p>
//               <p>Email</p>
//             </div>
//           </div>
//           <small>© 2025 Bharat Varta News. All rights reserved.</small>
//         </footer>
//       </body>
//     </html>
//   );
// }


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import "./globals.css";

// import ProfileButton from "./components/ProfileButton";
// import { AuthProvider } from "./context/AuthContext";
// import AutoSignIn from "./components/AutoSignIn";
// import { SearchProvider } from "./context/SearchContext";
// import HeaderSearch from "./components/HeaderSearch";
// import Footer from "./footer";


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [lang, setLang] = useState("en");
//   const pathname = usePathname();

//   const tabClass = (path: string) =>
//     pathname === path ? "nav-tab active" : "nav-tab";

//   return (
//     <html lang="en">
//       <body>
//         {/* Google Identity SDK */}
//         <script
//           src="https://accounts.google.com/gsi/client"
//           async
//           defer
//         />

//         <AuthProvider>
//           <SearchProvider>
//           <AutoSignIn />

//           <header className="header">
//             <div className="header-inner">
//               <div className="logo">
//                 <img
//                   src="/logo_a.png"
//                   alt="Bharat Varta"
//                   width={100}
//                   height={80}
//                 />
//               </div>

//               <div className="lang-toggle">
//                 <button
//                   className={lang === "hi" ? "active" : ""}
//                   onClick={() => setLang("hi")}
//                 >
//                   हिन्दी
//                 </button>
//                 <button
//                   className={lang === "en" ? "active" : ""}
//                   onClick={() => setLang("en")}
//                 >
//                   EN
//                 </button>
//               </div>

//               {/* <div className="search-box">
//                 <input placeholder="Search news..." />
//               </div> */}
//                <HeaderSearch />

//            <nav className="nav">
//   <Link href="/" className={tabClass("/")}>
//     Home
//   </Link>
//   <Link href="/videos" className={tabClass("/videos")}>
//     Videos
//   </Link>
//   <Link href="/stories" className={tabClass("/stories")}>
//     Stories
//   </Link>
//   <Link href="/live" className={tabClass("/live")}>
//     Live
//   </Link>
// </nav>

// {/* Header action area */}
// <div className="header-actions">
//   <ProfileButton />
// </div>

//             </div>
//           </header>

//           {children}

//         {/* ✅ FOOTER COMPONENT */}
//             <Footer />
//           </SearchProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

import AutoSignIn from "./components/AutoSignIn";
import ProfileButton from "./components/ProfileButton";
import HeaderSearch from "./components/HeaderSearch";
import Footer from "./footer";

import MobileBottomBar from "./components/MobileBottomBar";
import HamburgerMenu from "./components/HamburgerMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState("en");
  const pathname = usePathname();

  const tabClass = (path: string) =>
    pathname === path ? "nav-tab active" : "nav-tab";

  return (
    <html lang="en">
      <body>
        {/* Google Identity */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />

        <AuthProvider>
          <SearchProvider>
            <AutoSignIn />

            {/* ================= HEADER ================= */}
            <header className="header">
              <div className="header-inner">
                <div className="logo">
                  <img src="/logo_a.png" alt="Bharat Varta" />
                </div>

                <div className="lang-toggle">
                  <button
                    className={lang === "hi" ? "active" : ""}
                    onClick={() => setLang("hi")}
                  >
                    हिन्दी
                  </button>
                  <button
                    className={lang === "en" ? "active" : ""}
                    onClick={() => setLang("en")}
                  >
                    EN
                  </button>
                </div>

                <HeaderSearch />

                {/* Desktop Nav */}
                <nav className="nav">
                  <Link href="/" className={tabClass("/")}>Home</Link>
                  <Link href="/videos" className={tabClass("/videos")}>Videos</Link>
                  <Link href="/stories" className={tabClass("/stories")}>Stories</Link>
                  <Link href="/live" className={tabClass("/live")}>Live</Link>
                </nav>

                {/* Profile + Hamburger */}
                <div className="header-actions">
                  <ProfileButton />
                  <HamburgerMenu />
                </div>
              </div>
            </header>

            {/* ================= PAGE ================= */}
            {children}

            {/* ================= FOOTER ================= */}
            <Footer />

            {/* ================= MOBILE NAV ================= */}
            <MobileBottomBar />
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
