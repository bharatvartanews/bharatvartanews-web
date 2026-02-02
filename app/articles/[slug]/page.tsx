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
// import Link from "next/link";
// import { PublicApi } from "../../services/publicApi";
// import ShareBar from "../../components/ShareBar";
// import CommentBox from "../../components/CommentBox";

// interface PageProps {
//   params: { slug: string };
// }

// /* ================= HELPERS (EXISTING + REQUIRED) ================= */

// function isYouTube(url: string) {
//   return url.includes("youtube.com") || url.includes("youtu.be");
// }

// function getYouTubeEmbed(url: string) {
//   const id = url.includes("youtu.be")
//     ? url.split("youtu.be/")[1]
//     : new URL(url).searchParams.get("v");

//   return id
//     ? `https://www.youtube.com/embed/${id}`
//     : null;
// }

// function isVideoFile(url: string) {
//   return /\.(mp4|webm|ogg)$/i.test(url);
// }

// /* ================= NEW: BUILD SINGLE MEDIA HTML ================= */

// function buildMediaHtml(article: any): string | null {
//   if (article.video) {
//     if (isYouTube(article.video)) {
//       const embed = getYouTubeEmbed(article.video);
//       if (!embed) return null;

//       return `
//         <div class="article-media">
//           <iframe
//             src="${embed}"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowfullscreen
//           ></iframe>
//         </div>
//       `;
//     }

//     if (isVideoFile(article.video)) {
//       return `
//         <div class="article-media">
//           <video controls>
//             <source src="${article.video}" />
//           </video>
//         </div>
//       `;
//     }
//   }

//   if (article.image) {
//     return `
//       <div class="article-media">
//         <img src="${article.image}" alt="${article.title}" />
//       </div>
//     `;
//   }

//   return null;
// }

// /* ================= MODIFIED: INSERT MEDIA ONLY ONCE ================= */

// function injectMediaAfterFirstParagraph(
//   body: string,
//   mediaHtml: string | null
// ) {
//   if (!body || !mediaHtml) return body;

//   const parts = body.split("</p>");
//   if (parts.length < 2) return mediaHtml + body;

//   parts.splice(1, 0, mediaHtml);
//   return parts.join("</p>");
// }

// /* ================= PAGE ================= */

// export default async function ArticlePage({ params }: PageProps) {
//   //const article = await PublicApi.getArticleBySlug(params.slug);
//    const raw = params.slug;

//   const isId = /^\d+$/.test(raw);

//   const article = isId
//     ? await PublicApi.getArticleById(raw)
//     : await PublicApi.getArticleBySlug(raw);

//   if (!article) {
//     return (
//       <main className="container">
//         <p className="empty">Article not found</p>
//       </main>
//     );
//   }

//   /* ================= META (UNCHANGED, FUTURE-PROOF) ================= */

//   const categoryName = article.category?.name || "News";
//   const authorName = "Bharat Varta";
//   const publishedDate = article.createdAt
//     ? new Date(article.createdAt).toLocaleDateString("hi-IN")
//     : "";

//   /* ================= MEDIA ================= */

//   const mediaHtml = buildMediaHtml(article);
//   const finalBody = injectMediaAfterFirstParagraph(
//     article.body || "",
//     mediaHtml
//   );

//   return (
//     <main className="container">
//       <div className="grid">
//         {/* LEFT */}
//         <aside className="left">
//           <Link href="/" className="category-pill">
//             ← Back to News
//           </Link>
//         </aside>

//         {/* CENTER */}
//         <section>
//           <article className="article-card">
//             <h1 className="article-title">
//               {article.title}
//             </h1>

//             <div className="article-meta">
//               <span>{categoryName}</span>
//               <span>•</span>
//               <span>{publishedDate}</span>
//               <span>•</span>
//               <span>{authorName}</span>
//             </div>

//             {/* BODY + MEDIA */}
//             <div
//               className="article-body"
//               dangerouslySetInnerHTML={{
//                 __html: finalBody
//               }}
//             />

//             {/* COMMENTS */}
//             <CommentBox articleId={article.id} />

//             {/* SHARE */}
//             <ShareBar />
//           </article>
//         </section>

//         {/* RIGHT */}
//         <aside className="right">
//           <h3>Related News</h3>
//           <div className="right-card">
//             More updates soon
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }
// function buildMediaQueue(article: any): string[] {
//   const media: string[] = [];

//   if (Array.isArray(article.image)) {
//     article.image.forEach((img: string) => {
//       media.push(
//         `<div class="article-media">
//            <img src="${img}" alt="${article.title}" />
//          </div>`
//       );
//     });
//   }

//   if (Array.isArray(article.video)) {
//     article.video.forEach((video: string) => {
//       if (isYouTube(video)) {
//         const embed = getYouTubeEmbed(video);
//         if (embed) {
//           media.push(
//             `<div class="article-media">
//                <iframe
//                  src="${embed}"
//                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                  allowfullscreen
//                ></iframe>
//              </div>`
//           );
//         }
//       } else if (isVideoFile(video)) {
//         media.push(
//           `<div class="article-media">
//              <video controls>
//                <source src="${video}" />
//              </video>
//            </div>`
//         );
//       }
//     });
//   }

//   return media;
// }
// import Link from "next/link";
// import { PublicApi } from "../../services/publicApi";
// import ShareBar from "../../components/ShareBar";
// import CommentBox from "../../components/CommentBox";

// interface PageProps {
//   params: { slug: string };
// }

// /* ===================== HELPERS ===================== */

// function isYouTube(url: string) {
//   return url.includes("youtube.com") || url.includes("youtu.be");
// }

// function getYouTubeEmbed(url: string) {
//   try {
//     if (url.includes("youtu.be")) {
//       return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
//     }
//     return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
//   } catch {
//     return null;
//   }
// }

// function isVideoFile(url: string) {
//   return /\.(mp4|webm|ogg)$/i.test(url);
// }

// /* ===================== MEDIA BUILDER ===================== */

// function buildAllMedia(article: any): string[] {
//   const media: string[] = [];

//   // 🔹 IMAGES (multiple)
//   const images =
//     Array.isArray(article.images)
//       ? article.images
//       : article.image
//       ? [article.image]
//       : [];

//   images.forEach((img: string) => {
//     media.push(`
//       <div class="article-media">
//         <img src="${img}" alt="${article.title}" />
//       </div>
//     `);
//   });

//   // 🔹 VIDEOS (multiple)
//   const videos =
//     Array.isArray(article.videos)
//       ? article.videos
//       : article.video
//       ? [article.video]
//       : [];

//   videos.forEach((vid: string) => {
//     if (isYouTube(vid)) {
//       const embed = getYouTubeEmbed(vid);
//       if (embed) {
//         media.push(`
//           <div class="article-media">
//             <iframe
//               src="${embed}"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowfullscreen
//             ></iframe>
//           </div>
//         `);
//       }
//     } else if (isVideoFile(vid)) {
//       media.push(`
//         <div class="article-media">
//           <video controls>
//             <source src="${vid}" />
//           </video>
//         </div>
//       `);
//     }
//   });

//   return media;
// }

// /* ===================== INJECT MEDIA BETWEEN PARAGRAPHS ===================== */

// function injectMedia(body: string, media: string[]) {
//   if (!body || media.length === 0) return body;

//   const parts = body.split("</p>");
//   let output = "";
//   let mediaIndex = 0;

//   parts.forEach((p, i) => {
//     if (!p.trim()) return;

//     output += p + "</p>";

//     // 🔹 first media after first paragraph, then sequential
//     if (mediaIndex < media.length) {
//       output += media[mediaIndex];
//       mediaIndex++;
//     }
//   });

//   return output;
// }



// /* ===================== PAGE ===================== */

// export default async function ArticlePage({ params }: PageProps) {
//   const raw = params.slug;
//   const isId = /^\d+$/.test(raw);

//   const article = isId
//     ? await PublicApi.getArticleById(raw)
//     : await PublicApi.getArticleBySlug(raw);

//   if (!article) {
//     return (
//       <main className="container">
//         <p className="empty">Article not found</p>
//       </main>
//     );
//   }

//   const authorName =
//     article.authorName ||
//     article.author?.name ||
//     "Bharat Varta";

//   const categoryName = article.category?.name || "News";

//   const publishedDate = article.createdAt
//     ? new Date(article.createdAt).toLocaleDateString("hi-IN")
//     : "";

//   const media = buildAllMedia(article);
//   const finalBody = injectMedia(article.body || "", media);

//   return (
//     <main className="container">
//       <div className="grid">
//         {/* LEFT */}
//         <aside className="left">
//           <Link href="/" className="category-pill">
//             ← Back to News
//           </Link>
//         </aside>

//         {/* CENTER */}
//         <section>
//           <article className="article-card">
//             <h1 className="article-title">{article.title}</h1>

//             <div className="article-meta">
//               <span>{categoryName}</span>
//               <span>•</span>
//               <span>{publishedDate}</span>
//               <span>•</span>
//               <span>{authorName}</span>
//             </div>

//             <div
//               className="article-body"
//               dangerouslySetInnerHTML={{ __html: finalBody }}
//             />

//             {/* COMMENTS */}
//             <CommentBox articleId={article.id} />

//             {/* SHARE */}
//             <ShareBar />
//           </article>
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

import type { Metadata } from "next";
import Link from "next/link";
import { PublicApi } from "../../services/publicApi";
import ShareBar from "../../components/ShareBar";
import CommentBox from "../../components/CommentBox";

/* ===================== TYPES ===================== */

interface PageProps {
  params: { slug: string };
}

/* ===================== HELPERS ===================== */

function isYouTube(url?: string) {
  return !!url && (url.includes("youtube.com") || url.includes("youtu.be"));
}

function getYouTubeEmbed(url: string) {
  try {
    if (url.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    }
    return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
  } catch {
    return null;
  }
}

function getYouTubeThumb(url: string) {
  try {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]
      : new URL(url).searchParams.get("v");
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

/* ===================== MEDIA BUILDER ===================== */

function buildAllMedia(article: any): string[] {
  const media: string[] = [];

  const images =
    Array.isArray(article.images)
      ? article.images
      : article.image
      ? [article.image]
      : [];

  images.forEach((img: string) => {
    media.push(`
      <div class="article-media">
        <img src="${img}" alt="${article.title}" loading="lazy" decoding="async"/>
      </div>
    `);
  });

  const videos =
    Array.isArray(article.videos)
      ? article.videos
      : article.video
      ? [article.video]
      : [];

  videos.forEach((vid: string) => {
    if (isYouTube(vid)) {
      const embed = getYouTubeEmbed(vid);
      if (embed) {
        media.push(`
          <div class="article-media">
            <iframe src="${embed}" allowfullscreen></iframe>
          </div>
        `);
      }
    } else if (isVideoFile(vid)) {
      media.push(`
        <div class="article-media">
          <video controls>
            <source src="${vid}" />
          </video>
        </div>
      `);
    }
  });

  return media;
}

/* ===================== INJECT MEDIA ===================== */

function injectMedia(body: string, media: string[]) {
  if (!body || media.length === 0) return body;

  const parts = body.split("</p>");
  let output = "";
  let mediaIndex = 0;

  parts.forEach((p) => {
    if (!p.trim()) return;
    output += p + "</p>";
    if (mediaIndex < media.length) {
      output += media[mediaIndex++];
    }
  });

  return output;
}

/* ===================== METADATA (FIXED IMAGE LOGIC ONLY) ===================== */

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const siteUrl = "https://www.bharatvartanews.com";

  const article = await PublicApi.getArticleBySlug(params.slug);

  const title = article?.title || "Bharat Varta News";
  const description =
    article?.summary ||
    article?.excerpt ||
    article?.body?.replace(/<[^>]+>/g, "").slice(0, 150) ||
    "Latest news from Bharat Varta News";

  // 🔥 ONLY FIX: preview image logic
  const ogImage =
    article?.image ||
    (Array.isArray(article?.images) && article.images[0]) ||
    (isYouTube(article?.video)
      ? getYouTubeThumb(article.video)
      : null) ||
    `${siteUrl}/app_logo.png`; // fallback

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `${siteUrl}/articles/${params.slug}`,
      siteName: "Bharat Varta News",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ===================== PAGE ===================== */

export default async function ArticlePage({ params }: PageProps) {
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

  const authorName =
    article.authorName ||
    article.author?.name ||
    "Bharat Varta";

  const categoryName =
    article.category?.name || "News";

  const publishedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("hi-IN")
    : "";

  const media = buildAllMedia(article);
  const finalBody = injectMedia(article.body || "", media);

  return (
    <main className="container">
      <div className="grid">
        <aside className="left">
          <Link href="/" className="category-pill">
            ← Back to News
          </Link>
        </aside>

        <section>
          <article className="article-card">
            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta">
              <span>{categoryName}</span>
              <span>•</span>
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{authorName}</span>
            </div>

            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: finalBody }}
            />

            <CommentBox articleId={article.id} />
            <ShareBar />
          </article>
        </section>

        <aside className="right">
          <h3>Related News</h3>
          <div className="right-card">More updates soon</div>
        </aside>
      </div>
    </main>
  );
}
