import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { PublicApi } from "../../services/publicApi";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

  const title =
    article?.title || "Bharat Varta News";

  const logo = fs.readFileSync(
    path.join(process.cwd(), "public/app_logo.png")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          background: "linear-gradient(135deg,#b71c1c,#d32f2f)",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo as any} width={80} height={80} />
          <span style={{ marginLeft: 20, fontSize: 32, fontWeight: 700 }}>
            Bharat Varta
          </span>
        </div>

        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.2 }}>
          {title}
        </div>

        <div style={{ fontSize: 24, opacity: 0.9 }}>
          bharatvarta.com
        </div>
      </div>
    ),
    size
  );
}
