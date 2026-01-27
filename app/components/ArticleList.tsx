// "use client";

// import Link from "next/link";
// import { useSearch } from "../context/SearchContext";

// export default function ArticleList({ articles }: { articles: any[] }) {
//   const { query } = useSearch();

//   const filtered = articles.filter((a) => {
//     if (!query) return true;

//     const q = query.toLowerCase();
//     return (
//       a.title?.toLowerCase().includes(q) ||
//       a.body?.toLowerCase().includes(q)
//     );
//   });

//   if (!filtered.length) {
//     return <p>No results found</p>;
//   }

//   return (
//     <>
//       {filtered.map((a) => (
//         <div key={a.id} className="news-card">
//           <img src={a.image || "/logo.png"} />

//           <div>
//             <Link
//               href={`/articles/${a.slug}`}
//               className="news-title"
//             >
//               {a.title}
//             </Link>

//             <div className="news-meta">
//               {a.createdAt
//                 ? new Date(a.createdAt).toLocaleDateString()
//                 : ""}
//             </div>

//             <div>{a.body}</div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
// "use client";

// import { useRouter } from "next/navigation";
// import { useSearch } from "../context/SearchContext";

// export default function ArticleList({ articles }: { articles: any[] }) {
//   const { query } = useSearch();
//   const router = useRouter();

//   const filtered = articles.filter((a) => {
//     if (!query) return true;
//     const q = query.toLowerCase();
//     return (
//       a.title?.toLowerCase().includes(q) ||
//       a.body?.toLowerCase().includes(q)
//     );
//   });

//   if (!filtered.length) {
//     return <p>No results found</p>;
//   }

//   return (
//     <>
//       {filtered.map((a) => (
//         <div
//           key={a.id}
//           className="news-card"
//           onClick={() => router.push(`/articles/${a.id}`)}
//         >
//           {/* TITLE – FULL WIDTH, OWN ROW */}
//           <div className="news-title-row">
//             <h3 className="news-title">{a.title}</h3>
//           </div>

//           {/* IMAGE + BODY ROW */}
//           <div className="news-body-row">
//             {/* IMAGE */}
//             <div className="news-image">
//               <img src={a.image || "/logo.png"} alt={a.title} />
//             </div>

//             {/* BODY */}
//             <div className="news-content">
//               <div className="news-meta">
//                 {a.createdAt
//                   ? new Date(a.createdAt).toLocaleDateString()
//                   : ""}
//               </div>

//               <div className="news-preview">
//                 {a.body
//                   ?.replace(/<[^>]+>/g, "")
//                   .slice(0, 200)}
//                 …
//               </div>

//               <span className="read-more">
//                 Read more
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { useSearch } from "../context/SearchContext";
import { getArticleThumbnail } from "../lib/media";

export default function ArticleList({
  articles,
}: {
  articles: any[];
}) {
  const { query } = useSearch();
  const router = useRouter();

  const filtered = articles.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.title?.toLowerCase().includes(q) ||
      a.body?.toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    return <p>No results found</p>;
  }

  return (
    <>
      {filtered.map((a) => {
        const thumbnail = getArticleThumbnail(
          a.image,
          // 👇 SAFE: video may or may not exist
          a.video ?? null
        );

        return (
          <div
            key={a.id}
            className="news-card"
            onClick={() =>
              router.push(`/articles/${a.slug}`)
            }
            role="button"
          >
            {/* TITLE */}
            <div className="news-title-row">
              <h3 className="news-title">
                {a.title}
              </h3>
            </div>

            {/* IMAGE + CONTENT */}
            <div className="news-body-row">
              <div className="news-image">
                <img
                  src={thumbnail}
                  alt={a.title}
                />
              </div>

              <div className="news-content">
               <div className="news-meta">
  {a.createdAt && (
    <span>
      {new Date(a.createdAt).toLocaleDateString("hi-IN")}
    </span>
  )}

  {a.authorName && (
    <>
      <span className="meta-separator"> • </span>
      <span className="meta-author">
        {a.authorName}
      </span>
    </>
  )}
</div>


                <div className="news-preview">
                  {a.body
                    ?.replace(/<[^>]+>/g, "")
                    .slice(0, 200)}
                  …
                </div>

                <span className="read-more">
                  Read more
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
