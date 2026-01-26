// import Link from "next/link";
// import { PublicApi } from "../../services/publicApi";

// interface PageProps {
//   params: { slug: string };
// }

// export default async function ArticlePage({ params }: PageProps) {
//   const article = await PublicApi.getArticleBySlug(params.slug);

//   console.log(article);
//   if (!article) {
//     return (
//       <main className="container">
//         <p className="empty">Article not found</p>
//       </main>
//     );
//   }

//   return (
//     <main className="container">
//       <div className="grid">
//         {/* LEFT */}
//         <aside className="left">
//           {article.category && (
//             <Link
//               href={`/category/${article.category.slug}`}
//               className="category-pill active"
//             >
//               📰 {article.category.name}
//             </Link>
//           )}

//           <Link href="/" className="category-pill">
//             ← Back to Home
//           </Link>
//         </aside>

//         {/* CENTER */}
//         <section>
//           <h1 className="article-title">{article.title}</h1>

//           <div className="article-meta">
//             Bharat Varta •{" "}
//             {article.createdAt
//               ? new Date(article.createdAt).toLocaleDateString()
//               : ""}
//           </div>

//           <img
//             src={article.imageUrl || "/news.jpg"}
//             alt={article.title}
//             className="article-image"
//           />

//           <div
//             className="article-body"
//             dangerouslySetInnerHTML={{
//               __html: article.body || ""
//             }}
//           />

//           <div className="article-share">
//             <span>Share:</span>
//             <span>📘 Facebook</span>
//             <span>❌ X</span>
//             <span>✉️ Email</span>
//           </div>
//         </section>

//         {/* RIGHT */}
//         <aside className="right">
//           <h3>Related News</h3>
//           <div className="right-card">More updates soon</div>
//         </aside>
//       </div>
//     </main>
//   );
// }
import Link from "next/link";
import { PublicApi } from "../../services/publicApi";
import ShareBar from "../../components/ShareBar";
import CommentBox from "../../components/CommentBox";

interface PageProps {
  params: { slug: string };
}

/* ================= HELPERS (EXISTING + REQUIRED) ================= */

function isYouTube(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getYouTubeEmbed(url: string) {
  const id = url.includes("youtu.be")
    ? url.split("youtu.be/")[1]
    : new URL(url).searchParams.get("v");

  return id
    ? `https://www.youtube.com/embed/${id}`
    : null;
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

/* ================= NEW: BUILD SINGLE MEDIA HTML ================= */

function buildMediaHtml(article: any): string | null {
  if (article.video) {
    if (isYouTube(article.video)) {
      const embed = getYouTubeEmbed(article.video);
      if (!embed) return null;

      return `
        <div class="article-media">
          <iframe
            src="${embed}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    if (isVideoFile(article.video)) {
      return `
        <div class="article-media">
          <video controls>
            <source src="${article.video}" />
          </video>
        </div>
      `;
    }
  }

  if (article.image) {
    return `
      <div class="article-media">
        <img src="${article.image}" alt="${article.title}" />
      </div>
    `;
  }

  return null;
}

/* ================= MODIFIED: INSERT MEDIA ONLY ONCE ================= */

function injectMediaAfterFirstParagraph(
  body: string,
  mediaHtml: string | null
) {
  if (!body || !mediaHtml) return body;

  const parts = body.split("</p>");
  if (parts.length < 2) return mediaHtml + body;

  parts.splice(1, 0, mediaHtml);
  return parts.join("</p>");
}

/* ================= PAGE ================= */

export default async function ArticlePage({ params }: PageProps) {
  //const article = await PublicApi.getArticleBySlug(params.slug);
   const raw = params.slug;

  const isId = /^\d+$/.test(raw);

  const article = isId
    ? await PublicApi.getArticleById(raw)
    : await PublicApi.getArticleBySlug(raw);

  if (!article) {
    return (
      <main className="container">
        <p className="empty">Article not found</p>
      </main>
    );
  }

  /* ================= META (UNCHANGED, FUTURE-PROOF) ================= */

  const categoryName = article.category?.name || "News";
  const authorName = "Bharat Varta";
  const publishedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("hi-IN")
    : "";

  /* ================= MEDIA ================= */

  const mediaHtml = buildMediaHtml(article);
  const finalBody = injectMediaAfterFirstParagraph(
    article.body || "",
    mediaHtml
  );

  return (
    <main className="container">
      <div className="grid">
        {/* LEFT */}
        <aside className="left">
          <Link href="/" className="category-pill">
            ← Back to News
          </Link>
        </aside>

        {/* CENTER */}
        <section>
          <article className="article-card">
            <h1 className="article-title">
              {article.title}
            </h1>

            <div className="article-meta">
              <span>{categoryName}</span>
              <span>•</span>
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{authorName}</span>
            </div>

            {/* BODY + MEDIA */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{
                __html: finalBody
              }}
            />

            {/* COMMENTS */}
            <CommentBox articleId={article.id} />

            {/* SHARE */}
            <ShareBar />
          </article>
        </section>

        {/* RIGHT */}
        <aside className="right">
          <h3>Related News</h3>
          <div className="right-card">
            More updates soon
          </div>
        </aside>
      </div>
    </main>
  );
}
