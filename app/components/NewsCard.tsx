import Link from "next/link";

interface NewsCardProps {
  title: string;
  slug: string;
}

export default function NewsCard({
  title,
  slug
}: NewsCardProps) {
  return (
    <div className="news-card">
      <Link href={`/news/${slug}`} className="news-card-link">
        {title}
      </Link>
    </div>
  );
}
