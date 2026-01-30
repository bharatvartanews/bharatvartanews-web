import { ImageResponse } from "next/og";
import { PublicApi } from "../../services/publicApi";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };

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

  const title = article?.title || "Bharat Varta News";

  const isValidImage = (url?: string) =>
    !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);

  // 🔹 background image (optional)
  let bgImage: string | null = null;

  if (isValidImage(article?.image)) {
    bgImage = article.image;
  } else if (
    Array.isArray(article?.images) &&
    isValidImage(article.images[0])
  ) {
    bgImage = article.images[0];
  }

  // 🔹 fallback background
  if (!bgImage) {
    bgImage = "https://www.bharatvartanews.com/app_logo.png";
  }

  const logo = fs.readFileSync(
    path.join(process.cwd(), "public/app_logo.png")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "#000",
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

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
          }}
        />

        {/* Logo – ALWAYS */}
        <img
          src={logo as any}
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 120,
            height: 120,
          }}
        />

        {/* Title */}
        <div
          style={{
            position: "relative",
            padding: 40,
            fontSize: 46,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  );
}
