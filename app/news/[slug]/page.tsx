import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicApi } from "../../services/publicApi";

interface PageProps {
  params: { slug: string };
}

export default async function NewsDetail({ params }: PageProps) {
  const id = Number(params.slug);

  // 🚨 HARD GUARD
  if (!Number.isInteger(id) || id <= 0) {
    notFound(); // renders 404 page
  }

  const news = await PublicApi.getArticleById(id);

  if (!news) {
    notFound();
  }

  return (
    <main className="container">
      <div className="grid">
        {/* LEFT */}
        <aside className="left">
          {news.category && (
            <Link
              href={`/category/${news.category.slug}`}
              className="category-pill active"
            >
              📰 {news.category.name}
            </Link>
          )}

          <Link href="/" className="category-pill">
            ← Back to Home
          </Link>
        </aside>

        {/* CENTER */}
        <section>
          <h1 className="article-title">{news.title}</h1>

          <div className="article-meta">
            Bharat Varta •{" "}
            {news.createdAt
              ? new Date(news.createdAt).toLocaleDateString()
              : ""}
          </div>

          <img
            src={news.imageUrl || "/news.jpg"}
            alt={news.title}
            className="article-image"
          />

          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: news.body || ""
            }}
          />

          <div className="article-share">
            <span>Share:</span>
            <span>📘 Facebook</span>
            <span>❌ X</span>
            <span>✉️ Email</span>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="right">
          <h3>Related News</h3>
          <div className="right-card">More updates soon</div>
        </aside>
      </div>
    </main>
  );
}
