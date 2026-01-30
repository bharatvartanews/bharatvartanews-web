import { api } from "./lib/api";
import Link from "next/link";
import ArticleList from "./components/ArticleList";
import AstrologySidebar from "./components/astrology/AstrologySidebar";


// const categoryIcon = (name: string) => {
//   const key = name.toLowerCase();
//   if (key.includes("top")) return "🔥";
//   if (key.includes("national")) return "🇮🇳";
//   if (key.includes("state")) return "📍";
//   if (key.includes("politic")) return "🏛️";
//   if (key.includes("business")) return "💼";
//   if (key.includes("sport")) return "🏏";
//   return "📰";
// };

const renderCategoryIcon = (category: any) => {
  // 1️⃣ DB icon (image url)
  if (category.icon) {
    return (
      <img
        src={category.icon}
        alt={category.name}
        className="category-icon-img"
      />
    );
  }

  // 2️⃣ Fallback emoji logic
  const key = category.name.toLowerCase();
  if (key.includes("top")) return "🔥";
  if (key.includes("national")) return "🇮🇳";
  if (key.includes("state")) return "📍";
  if (key.includes("politic")) return "🏛️";
  if (key.includes("business")) return "💼";
  if (key.includes("sport")) return "🏏";
  if (key.includes("video")) return "🎥";

  return "📰";
};

export default async function Home({ searchParams }) {
  const categorySlug = searchParams?.category;

  // 🔑 ALWAYS load home data (for categories + topNews)
  const homeData = await api("/api/home");
  console.log(homeData);

  let categories = homeData.categories ?? [];
  let topNews = homeData.topNews ?? [];
  let articles = [];

  if (categorySlug) {
    // ✅ resolve category by SLUG (correct backend route)
    const category = await api(
      `/api/categories/${categorySlug}`
    );

    // ✅ fetch category-specific articles
    articles = await api(
      `/api/articles?categoryId=${category.id}`
    );
  } else {
    // default home articles
    articles = homeData.articles ?? [];
  }

  // const activeCategorySlug =
  //   categorySlug || categories?.[0]?.slug;
const activeCategorySlug = categorySlug || null;


  const activeCategory =
  categories.find((c: any) => c.slug === categorySlug)?.name || "All";

  return (
    <main className="container">
      <div className="grid">
        {/* LEFT */}
        {/* <aside className="side-card">
          <h3>📂 Categories</h3>

          {categories.map((c: any) => (
            <Link
              key={c.id}
              href={`/?category=${c.slug}`}
              className={`category-pill ${
                c.slug === activeCategorySlug ? "active" : ""
              }`}
            >
              <span>{categoryIcon(c.name)}</span>
              <span>{c.name}</span>
            </Link>
          ))}
        </aside> */}

        <aside className="side-card">
  {/* Categories header = ALL */}
  <Link
    href="/"
    className={`category-header ${
      !activeCategorySlug ? "active" : ""
    }`}
  >
    📂 All Categories
  </Link>

  <div className="category-divider" />

  {categories.map((c: any) => (
    <Link
      key={c.id}
      href={`/?category=${c.slug}`}
      className={`category-pill ${
        c.slug === activeCategorySlug ? "active" : ""
      }`}
    >
      {/* <span>{categoryIcon(c.name)}</span>
      <span>{c.name}</span> */}

      <span className="category-icon">
  {renderCategoryIcon(c)}
</span>
<span>{c.name}</span>

    </Link>
  ))}
</aside>



        {/* CENTER */}
        {/* <section>
          <div className="center-section-header">
    <h2>🔥 Trending News</h2>
  </div>

            <ArticleList articles={articles} /> */}

          {/* {articles.map((a: any) => (
            <div key={a.id} className="news-card">
              <img src={a.image || "/logo.png"} />

              <div>
                <Link
                  href={`/articles/${a.slug}`}
                  className="news-title"
                >
                  {a.title}
                </Link>

                <div className="news-meta">
                  {a.createdAt
                    ? new Date(a.createdAt).toLocaleDateString()
                    : ""}
                </div>

                <div>{a.body}</div>
              </div>
            </div>
          ))} */}
        {/* </section> */}

        <section>
  <div className="center-section-header">
    <h2>
      🔥 Trending News{" "}
      <span className="center-section-category">
        — {activeCategory}
      </span>
    </h2>
  </div>

  <ArticleList articles={articles} />
</section>


        {/* RIGHT */}
        <aside className="right">
          <AstrologySidebar />

          {/* <h3>Top Trending</h3> */}
          {/* <div className="center-section-header">
    News You May Like
  </div>
{topNews.map((n: any) => (
  <Link
    key={n.id}
    href={`/articles/${n.id}`}
    className="news-mini-card"
  >
    <h4 className="news-mini-title">
      {n.title}
    </h4>
  </Link>
))} */}

          {/* {topNews.map((n: any) => (
            <div key={n.id} className="right-card">
              <Link href={`/news/${n.slug}`}>

                {n.title}
              </Link>
            </div>
          ))} */}

          {/* <div className="share">
            <h3>Share</h3>
            <div>📘 Facebook</div>
            <div>❌ X (Twitter)</div>
            <div>✉️ Email</div>
          </div> */}
        </aside>
      </div>
    </main>
  );
}
