// // import { PublicApi } from "../../services/publicApi";

// // export default async function Head({ params }) {
// //   const article = await PublicApi.getArticleBySlug(params.slug);
// //   const url = `https://api.bharatvartanews.com/api/article/${article.slug}`;

// //   return (
// //     <>
// //       <title>{article.title}</title>
// //       <meta name="description" content={article.title} />

// //       <meta property="og:type" content="article" />
// //       <meta property="og:title" content={article.title} />
// //       <meta property="og:image" content={article.image} />
// //       <meta property="og:url" content={url} />

// //       <script
// //         type="application/ld+json"
// //         dangerouslySetInnerHTML={{
// //           __html: JSON.stringify({
// //             "@context": "https://schema.org",
// //             "@type": "NewsArticle",
// //             headline: article.title,
// //             image: [article.image],
// //             datePublished: article.createdAt,
// //             publisher: {
// //               "@type": "Organization",
// //               name: "Bharat Varta",
// //               logo: {
// //                 "@type": "ImageObject",
// //                 url: "http://localhost:8080/logo_a.png"
// //               }
// //             }
// //           })
// //         }}
// //       />
// //     </>
// //   );
// // }
import { PublicApi } from "../../services/publicApi";

/* ================= HELPERS ================= */

function isImage(url?: string) {
  return !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);
}

function isYouTube(url?: string) {
  return !!url && (url.includes("youtube.com") || url.includes("youtu.be"));
}

function getYouTubeThumb(url?: string) {
  if (!url) return null;
  try {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]
      : new URL(url).searchParams.get("v");
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

/* ================= HEAD ================= */

export default async function Head({
  params,
}: {
  params: { slug: string };
}) {
  const siteUrl = "https://www.bharatvartanews.com";
  const article = await PublicApi.getArticleBySlug(params.slug);

  const title = article?.title || "Bharat Varta News";
  const description =
    article?.summary ||
    article?.excerpt ||
    article?.body?.replace(/<[^>]+>/g, "").slice(0, 150) ||
    "Latest news from Bharat Varta News";

  /* ========= FINAL IMAGE RESOLUTION ========= */

  let ogImage = `${siteUrl}/app_logo.png`; // default

  // IMAGE ARTICLE
  if (isImage(article?.image)) {
    ogImage = article.image;
  } else if (Array.isArray(article?.images) && isImage(article.images[0])) {
    ogImage = article.images[0];
  }

  // VIDEO ARTICLE
  else if (article?.video || article?.videos?.length) {
    const v = article.video || article.videos[0];

    if (isYouTube(v)) {
      ogImage = getYouTubeThumb(v) || `${siteUrl}/video-placeholder.png`;
    } else {
      // mp4 / hosted video
      ogImage = `${siteUrl}/video-placeholder.png`;
    }
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph */}
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Bharat Varta News" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={`${siteUrl}/articles/${params.slug}`}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
