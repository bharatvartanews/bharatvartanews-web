import { PublicApi } from "../../services/publicApi";
import Link from "next/link";

export default async function CategoryPage({ params }) {
const category = await PublicApi.getCategoryBySlug(params.slug);
const articles = await PublicApi.getArticlesByCategory(category.id);


  return (
    <main className="container">
      <h2>{category.name}</h2>

      {articles.map((a) => (
        <div key={a.id} className="news-card">
          <Link href={`/news/${a.slug}`}>
            {a.title}
          </Link>
        </div>
      ))}
    </main>
  );
}
