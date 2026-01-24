import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryNav({
  categories
}: {
  categories: Category[];
}) {
  return (
    <nav className="category-nav">
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="category-nav-item"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
