"use client";

import Link from "next/link";

export default function MobileMenu({
  open,
  onClose,
  categories = [],
}) {
  if (!open) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <aside
        className="mobile-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <h4>Menu</h4>

        <Link href="/" onClick={onClose}>Home</Link>
        <Link href="/videos" onClick={onClose}>Videos</Link>
        <Link href="/stories" onClick={onClose}>Stories</Link>
        <Link href="/live" onClick={onClose}>Live</Link>

        <hr />

        <h4>Categories</h4>

        <Link href="/" onClick={onClose}>
          All
        </Link>

        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/?category=${c.slug}`}
            onClick={onClose}
          >
            {c.name}
          </Link>
        ))}
      </aside>
    </div>
  );
}
