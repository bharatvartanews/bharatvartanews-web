"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaVideo, FaBroadcastTower, FaUser } from "react-icons/fa";

export default function MobileBottomBar() {
  const pathname = usePathname();

  const tab = (p: string) =>
    pathname === p ? "mb-tab active" : "mb-tab";

  return (
    <nav className="mobile-bottom-bar">
      <Link href="/" className={tab("/")}>
        <FaHome /><span>Home</span>
      </Link>
      <Link href="/videos" className={tab("/videos")}>
        <FaVideo /><span>Videos</span>
      </Link>
      <Link href="/live" className={tab("/live")}>
        <FaBroadcastTower /><span>Live</span>
      </Link>
      <Link href="/profile" className={tab("/profile")}>
        <FaUser /><span>Profile</span>
      </Link>
    </nav>
  );
}
