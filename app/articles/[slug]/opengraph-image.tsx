// import { ImageResponse } from "next/og";
// import { PublicApi } from "../../services/publicApi";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";
// export const size = { width: 1200, height: 630 };

// const isValidImage = (url?: string) =>
//   !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);

// const isYouTube = (url?: string) =>
//   !!url && (url.includes("youtube.com") || url.includes("youtu.be"));

// const getYouTubeThumb = (url: string) => {
//   try {
//     const id = url.includes("youtu.be")
//       ? url.split("youtu.be/")[1]
//       : new URL(url).searchParams.get("v");
//     return id
//       ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
//       : null;
//   } catch {
//     return null;
//   }
// };

// export default async function OGImage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const raw = params.slug;
//   const isId = /^\d+$/.test(raw);

//   const article = isId
//     ? await PublicApi.getArticleById(raw)
//     : await PublicApi.getArticleBySlug(raw);

//   const title = article?.title || "Bharat Varta News";

//   // 🔹 Decide background image
//   let bgImage: string | null = null;
//   let isVideo = false;

//   if (isValidImage(article?.image)) {
//     bgImage = article.image;
//   } else if (
//     Array.isArray(article?.images) &&
//     isValidImage(article.images[0])
//   ) {
//     bgImage = article.images[0];
//   } else if (isYouTube(article?.video)) {
//     bgImage = getYouTubeThumb(article.video);
//     isVideo = true;
//   }

//   // 🔹 Fallback to app logo
//   if (!bgImage) {
//     bgImage = "https://www.bharatvartanews.com/app_logo.png";
//   }

//   const logo = fs.readFileSync(
//     path.join(process.cwd(), "public/app_logo.png")
//   );

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "relative",
//           backgroundColor: "#000",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         {/* Background */}
//         <img
//           src={bgImage}
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />

//         {/* Dark gradient (DeshajTimes style) */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
//           }}
//         />

//         {/* Logo */}
//         <img
//           src={logo as any}
//           style={{
//             position: "absolute",
//             top: 30,
//             left: 30,
//             width: 90,
//             height: 90,
//           }}
//         />

//         {/* Play icon for video */}
//         {isVideo && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 90,
//               height: 90,
//               borderRadius: "50%",
//               background: "rgba(0,0,0,0.6)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <div
//               style={{
//                 width: 0,
//                 height: 0,
//                 borderTop: "18px solid transparent",
//                 borderBottom: "18px solid transparent",
//                 borderLeft: "28px solid white",
//                 marginLeft: 6,
//               }}
//             />
//           </div>
//         )}

//         {/* Title */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             left: 40,
//             right: 40,
//             color: "#fff",
//             fontSize: 44,
//             fontWeight: 800,
//             lineHeight: 1.25,
//           }}
//         >
//           {title}
//         </div>
//       </div>
//     ),
//     size
//   );
// }

import { ImageResponse } from "next/og";
import { PublicApi } from "../../services/publicApi";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };

const isValidImage = (url?: string) =>
  !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);

const isYouTube = (url?: string) =>
  !!url && (url.includes("youtube.com") || url.includes("youtu.be"));

const getYouTubeThumb = (url: string) => {
  try {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]
      : new URL(url).searchParams.get("v");
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : null;
  } catch {
    return null;
  }
};

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const raw = params.slug;
  const isId = /^\d+$/.test(raw);

  const article = isId
    ? await PublicApi.getArticleById(raw)
    : await PublicApi.getArticleBySlug(raw);

  const siteUrl = "https://www.bharatvartanews.com";
  const title = article?.title || "Bharat Varta News";

  // 🔹 Decide background image (YOUR LOGIC – UNCHANGED)
  let bgImage: string | null = null;
  let isVideo = false;

  if (isValidImage(article?.image)) {
    bgImage = article.image;
  } else if (
    Array.isArray(article?.images) &&
    isValidImage(article.images[0])
  ) {
    bgImage = article.images[0];
  } else if (isYouTube(article?.video)) {
    bgImage = getYouTubeThumb(article.video);
    isVideo = true;
  }

  // 🔹 Fallback to app logo
  if (!bgImage) {
    bgImage = `${siteUrl}/app_logo.png`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Background */}
        <img
          src={bgImage}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
          }}
        />

        {/* ✅ LOGO — LOAD FROM PUBLIC URL */}
        <img
          src={`${siteUrl}/app_logo.png`}
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 90,
            height: 90,
          }}
        />

        {/* Play icon for video */}
        {isVideo && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "18px solid transparent",
                borderBottom: "18px solid transparent",
                borderLeft: "28px solid white",
                marginLeft: 6,
              }}
            />
          </div>
        )}

        {/* Title */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            color: "#fff",
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  );
}
