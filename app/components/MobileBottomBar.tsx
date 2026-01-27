// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FaHome,
//   FaVideo,
//   FaBroadcastTower,
//   FaUser
// } from "react-icons/fa";

// export default function MobileBottomBar() {
//   const pathname = usePathname();

//   const tabClass = (path: string) =>
//     pathname === path ? "mb-tab active" : "mb-tab";

//   return (
//     <nav className="mobile-bottom-bar">
//       <Link href="/" className={tabClass("/")}>
//         <FaHome />
//         <span>Home</span>
//       </Link>

//       <Link href="/videos" className={tabClass("/videos")}>
//         <FaVideo />
//         <span>Videos</span>
//       </Link>

//       <Link href="/live" className={tabClass("/live")}>
//         <FaBroadcastTower />
//         <span>Live</span>
//       </Link>

//       <Link href="/profile" className={tabClass("/profile")}>
//         <FaUser />
//         <span>Profile</span>
//       </Link>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaVideo, FaUser } from "react-icons/fa";

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-bar">
      <Link
        href="/"
        className={pathname === "/" ? "active" : ""}
      >
        <FaHome />
        <span>Home</span>
      </Link>

      <Link
        href="/videos"
        className={pathname.startsWith("/videos") ? "active" : ""}
      >
        <FaVideo />
        <span>Videos</span>
      </Link>

      <Link
        href="/profile"
        className={pathname.startsWith("/profile") ? "active" : ""}
      >
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
