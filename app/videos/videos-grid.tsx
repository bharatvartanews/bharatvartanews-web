"use client";

import { useMemo, useState } from "react";

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function isFacebook(url: string) {
  return url.includes("facebook.com");
}

function getFacebookEmbed(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}`;
}

function isYouTube(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getYouTubeEmbed(url: string) {
  try {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : new URL(url).searchParams.get("v");

    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return "";
  }
}

function getSourceName(url: string) {
  if (isYouTube(url)) return "YouTube";
  if (isFacebook(url)) return "Facebook";
  if (isDirectVideo(url)) return "Direct";
  return "Video";
}

// ✅ Netflix style: thumbnail poster helper
function getPoster(v: any) {
  // ✅ If your API already has thumbnail field use it
  if (v.thumbnail) return v.thumbnail;

  // ✅ fallback
  return "/logo_a.png"; // create this in /public
}

export default function VideoGrid({ videos }: { videos: any[] }) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const activeEmbed = useMemo(() => {
    if (!activeVideo?.url) return null;

    if (isDirectVideo(activeVideo.url)) return { type: "direct", src: activeVideo.url };
    if (isYouTube(activeVideo.url)) return { type: "youtube", src: getYouTubeEmbed(activeVideo.url) };
    if (isFacebook(activeVideo.url)) return { type: "facebook", src: getFacebookEmbed(activeVideo.url) };

    return null;
  }, [activeVideo]);

  return (
    <main className="container">
      {/* ✅ Header */}
      <div className="ott-header">
        <div>
          <h2 className="ott-title">Videos</h2>
          <p className="ott-subtitle">Trailers • Clips • Trending</p>
        </div>
      </div>

      {/* ✅ Grid */}
      {videos?.length ? (
        <div className="ott-grid">
          {videos.map((v) => (
            <button
              key={v.id}
              className="ott-card"
              onClick={() => setActiveVideo(v)}
              type="button"
            >
              {/* Poster */}
              <div className="ott-poster">
                <img
                  src={getPoster(v)}
                  alt={v.title}
                  className="ott-poster-img"
                  loading="lazy"
                />

                {/* Play overlay */}
                <div className="ott-overlay">
                  <div className="ott-play">
                    ▶
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="ott-info">
                <div className="ott-row">
                  <div className="ott-card-title" title={v.title}>
                    {v.title}
                  </div>

                  <span className="ott-chip">
                    {getSourceName(v.url)}
                  </span>
                </div>

                {v.createdAt && (
                  <div className="ott-date">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="ott-empty">
          No videos available.
        </div>
      )}

      {/* ✅ Modal Player */}
      {activeVideo && (
        <div className="ott-modal" onClick={() => setActiveVideo(null)}>
          <div className="ott-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ott-modal-top">
              <div className="ott-modal-title" title={activeVideo.title}>
                {activeVideo.title}
              </div>

              <button
                className="ott-close"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
            </div>

            <div className="ott-modal-player">
              {activeEmbed?.type === "direct" && (
                <video src={activeEmbed.src} controls autoPlay playsInline />
              )}

              {(activeEmbed?.type === "youtube" || activeEmbed?.type === "facebook") && (
                <iframe
                  src={activeEmbed.src}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
