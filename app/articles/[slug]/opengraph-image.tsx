import { ImageResponse } from "next/og";
import { PublicApi } from "../../services/publicApi";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ================= HELPERS ================= */

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

/* ================= OG IMAGE ================= */

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  let article: any = null;
  try {
    article = await PublicApi.getArticleBySlug(params.slug);
  } catch {}

  // ✅ READ LOGO FILE (THIS WAS MISSING BEFORE)
  const logo = fs.readFileSync(
    path.join(process.cwd(), "public/og-placeholder.png")
  );

  let bgImage: string | null = null;
  let isVideo = false;

  /* ===== IMAGE ===== */
  if (isImage(article?.image)) {
    bgImage = article.image;
  } else if (Array.isArray(article?.images) && isImage(article.images[0])) {
    bgImage = article.images[0];
  }

  /* ===== VIDEO ===== */
  else if (article?.video || article?.videos?.length) {
    const v = article.video || article.videos[0];
    if (isYouTube(v)) {
      bgImage = getYouTubeThumb(v);
    }
    isVideo = true;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#020617",
        }}
      >
        {/* ===== BACKGROUND ===== */}
        {bgImage ? (
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
        ) : (
          // 🔥 PLACEHOLDER (DRAWN, NOT FETCHED)
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #020617, #0f172a, #020617)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}

        {/* ===== DARK OVERLAY ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.15))",
          }}
        />

        {/* ===== LOGO (NOW VISIBLE) ===== */}
        <img
          src={logo as any}
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#fff",
            padding: 10,
          }}
        />

        {/* ===== VIDEO PLAY ICON ===== */}
        {isVideo && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 96,
              height: 96,
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
                marginLeft: 6,
              }}
            />
          </div>
        )}

        {/* ===== TITLE ===== */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            color: "#fff",
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.2,
            textShadow: "0 4px 12px rgba(0,0,0,.6)",
          }}
        >
          {article?.title || "Bharat Varta News"}
        </div>
      </div>
    ),
    size
  );
}
