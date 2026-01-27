"use client";

import { useState } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        ☰
      </button>

      {open && (
        <div className="hamburger-drawer">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/videos" onClick={() => setOpen(false)}>Videos</Link>
          <Link href="/stories" onClick={() => setOpen(false)}>Stories</Link>
          <Link href="/live" onClick={() => setOpen(false)}>Live</Link>
        </div>
      )}
    </>
  );
}
