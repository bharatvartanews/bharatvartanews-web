import { ImageResponse } from "next/og";
import { PublicApi } from "../../services/publicApi";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };

const isImage = (url?: string) =>
  !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);

const isYouTube = (url?: string) =>
  !!url && (url.includes("youtube.com") || url.includes("youtu.be"));

const getYouTubeThumb = (url?: string) => {
  if (!url) return null;
  try {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]
      : new URL(url).searchParams.get("v");
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
};

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await PublicApi.getArticleBySlug(params.slug);

  let bgImage: string;
  let isVideo = false;

  /* ========== IMAGE ARTICLE ========== */
  if (isImage(article?.image)) {
    bgImage = article.image;
  } else if (
    Array.isArray(article?.images) &&
    isImage(article.images[0])
  ) {
    bgImage = article.images[0];
  }

  /* ========== VIDEO ARTICLE ========== */
  else if (article?.video || article?.videos?.length) {
    const v = article.video || article.videos?.[0];

    if (isYouTube(v)) {
      bgImage = getYouTubeThumb(v)!;
      isVideo = true;
    } else {
      // NON-YOUTUBE VIDEO → PLACEHOLDER
      bgImage = "https://www.bharatvartanews.com/video-placeholder.png";
      isVideo = true;
    }
  }

  /* ========== NO MEDIA ========== */
  else {
    bgImage = "https://www.bharatvartanews.com/app_logo.png";
  }

  const logo = fs.readFileSync(
    path.join(process.cwd(), "public/app_logo.png")
  );

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
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

        {/* Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.1))",
          }}
        />

        {/* Logo watermark */}
        <img
          src={logo as any}
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#fff",
            padding: 8,
          }}
        />

        {/* Play icon */}
        {isVideo && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(0,0,0,.6)",
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
          {article?.title || "Bharat Varta News"}
        </div>
      </div>
    ),
    size
  );
}
