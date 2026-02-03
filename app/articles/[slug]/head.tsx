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
// import { PublicApi } from "../../services/publicApi";

// function getYouTubeThumb(url?: string) {
//   if (!url) return null;
//   try {
//     const id = url.includes("youtu.be")
//       ? url.split("youtu.be/")[1]
//       : new URL(url).searchParams.get("v");
//     return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
//   } catch {
//     return null;
//   }
// }

// export default async function Head({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const article = await PublicApi.getArticleBySlug(params.slug);

//   const siteUrl = "https://www.bharatvartanews.com";

//   const title = article?.title || "Bharat Varta News";
//   const description =
//     article?.summary ||
//     article?.excerpt ||
//     article?.body?.replace(/<[^>]+>/g, "").slice(0, 150) ||
//     "Latest news from Bharat Varta News";

//   // 🔥 FINAL IMAGE LOGIC (ALL CASES)
//   const image =
//     article?.image ||
//     (Array.isArray(article?.images) && article.images[0]) ||
//     getYouTubeThumb(article?.video) ||
//     (Array.isArray(article?.videos)
//       ? getYouTubeThumb(article.videos[0])
//       : null) ||
//     `${siteUrl}/video-placeholder.png`; // FINAL FALLBACK

//   return (
//     <>
//       <title>{title}</title>
//       <meta name="description" content={description} />

//       <meta property="og:type" content="article" />
//       <meta property="og:site_name" content="Bharat Varta News" />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url" content={`${siteUrl}/articles/${params.slug}`} />
//       <meta property="og:image" content={image} />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />
//     </>
//   );
// }
import { PublicApi } from "../../services/publicApi";

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

  // 🔥 ALWAYS point to rendered OG image
  const ogImage = `${siteUrl}/articles/${params.slug}/opengraph-image`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Bharat Varta News" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}/articles/${params.slug}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
