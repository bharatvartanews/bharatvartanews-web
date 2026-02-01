// import { PublicApi } from "../../services/publicApi";

// export default async function Head({ params }) {
//   const article = await PublicApi.getArticleBySlug(params.slug);
//   const url = `https://api.bharatvartanews.com/api/article/${article.slug}`;

//   return (
//     <>
//       <title>{article.title}</title>
//       <meta name="description" content={article.title} />

//       <meta property="og:type" content="article" />
//       <meta property="og:title" content={article.title} />
//       <meta property="og:image" content={article.image} />
//       <meta property="og:url" content={url} />

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "NewsArticle",
//             headline: article.title,
//             image: [article.image],
//             datePublished: article.createdAt,
//             publisher: {
//               "@type": "Organization",
//               name: "Bharat Varta",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "http://localhost:8080/logo_a.png"
//               }
//             }
//           })
//         }}
//       />
//     </>
//   );
// }
import { PublicApi } from "../../services/publicApi";

export default async function Head({ params }: { params: { slug: string } }) {
  const raw = params.slug;
  const isId = /^\d+$/.test(raw);

  const article = isId
    ? await PublicApi.getArticleById(raw)
    : await PublicApi.getArticleBySlug(raw);

  const SITE_URL = "https://www.bharatvartanews.com";

  const title = article?.title || "Bharat Varta News";
  const description =
    article?.summary ||
    article?.excerpt ||
    article?.body?.replace(/<[^>]+>/g, "").slice(0, 150) ||
    "Latest news from Bharat Varta News";

  const ogImage = `${SITE_URL}/og-default.jpeg`; 

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Bharat Varta News" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE_URL}/articles/${params.slug}`} />
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
