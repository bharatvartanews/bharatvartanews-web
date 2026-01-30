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

  const title = article?.title ?? "Bharat Varta News";

  // 🔹 choose base image
  let baseImage: string | null = null;

  const isImage = (url?: string) =>
    !!url && /\.(jpg|jpeg|png|webp)$/i.test(url);

  if (isImage(article?.image)) {
    baseImage = article.image;
  } else if (isImage(article?.thumbnail)) {
    baseImage = article.thumbnail; // video thumbnail if you have
  }

  // fallback bg
  if (!baseImage) {
    baseImage = "https://www.bharatvartanews.com/og-bg.jpg";
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
          backgroundColor: "#000",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Background */}
        <img
          src={baseImage}
          style={{
            position: "absolute",
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

        {/* Logo */}
        <img
          src={logo as any}
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 100,
            height: 100,
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
