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

export default async function Head({ params }: any) {
  const raw = params.slug;
  const isId = /^\d+$/.test(raw);

  const article = isId
    ? await PublicApi.getArticleById(raw)
    : await PublicApi.getArticleBySlug(raw);

  if (!article) {
    return (
      <>
        <title>Article not found</title>
      </>
    );
  }

  const url = `https://bharatvartanews.com/articles/${article.slug}`;

  return (
    <>
      <title>{article.title}</title>
      <meta name="description" content={article.title} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={article.title} />
      <meta property="og:image" content={article.image || ""} />
      <meta property="og:url" content={url} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            image: article.image ? [article.image] : [],
            datePublished: article.createdAt,
            publisher: {
              "@type": "Organization",
              name: "Bharat Varta",
              logo: {
                "@type": "ImageObject",
                url: "https://bharatvartanews.com/app_logo.png",
              },
            },
          }),
        }}
      />
    </>
  );
}
