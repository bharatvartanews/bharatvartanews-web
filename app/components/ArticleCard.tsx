// import Link from "next/link";

// interface ArticleCardProps {
//   title: string;
//   excerpt: string;
//   image?: string | null;
//   slug: string;
//   publishedAt?: string;
// }

// export default function ArticleCard({
//   title,
//   excerpt,
//   image,
//   slug,
//   publishedAt
// }: ArticleCardProps) {
//   return (
//     <article className="article-card">
//       <div className="article-card-image">
//         <img
//           src={image || "/new.jpg"}
//           alt={title}
//         />
//       </div>

//       <div className="article-card-content">
//         <Link href={`/articles/${slug}`}>
//           <h3 className="article-card-title">{title}</h3>
//         </Link>

//         {publishedAt && (
//           <div className="article-card-date">
//             {new Date(publishedAt).toLocaleDateString("hi-IN")}
//           </div>
//         )}

//         <p className="article-card-excerpt">
//           {excerpt}
//         </p>
//       </div>
//     </article>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { getArticleThumbnail } from "../lib/media";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  image?: string | null;
  video?: string | null;
  category?: string;
  author?: string;
  publishedAt?: string;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  image,
  video,
  category,
  author,
  publishedAt,
}: ArticleCardProps) {
  const router = useRouter();
const thumbnail = getArticleThumbnail(
    image,
    video ?? null
  );

  const goToDetail = () => {
    router.push(`/articles/${id}`);
  };

  return (
    <article
      className="article-card"
      onClick={goToDetail}
      role="button"
      tabIndex={0}
    >
      <div className="article-card-image">
         <img
          src={thumbnail}
          alt={title}
        />
        {/* <img src={image || "/new.jpg"} alt={title} /> */}
      </div>

      <div className="article-card-content">
        {category && <span className="badge">{category}</span>}

        <h3 className="article-card-title">{title}</h3>

        <div className="article-card-meta">
          {author && <span>✍️ {author}</span>}
          {publishedAt && (
            <span>
              {new Date(publishedAt).toLocaleDateString("hi-IN")}
            </span>
          )}
        </div>

        <p className="article-card-excerpt">
          {excerpt}
        </p>

        <span className="read-more">
          Read more
        </span>
      </div>
    </article>
  );
}


