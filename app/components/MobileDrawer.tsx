"use client";

import Link from "next/link";

export default function MobileDrawer({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  categories: any[];
}) {
  if (!open) return null;

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <aside
        className="mobile-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Categories</h3>

        <Link href="/" onClick={onClose}>
          All News
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
