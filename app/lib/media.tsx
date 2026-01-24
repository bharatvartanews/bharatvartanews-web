export function getArticleThumbnail(
  image?: string | null,
  video?: string | null
) {
  // 1️⃣ Explicit image wins
  if (image) return image;

  if (video) {
    try {
      // YouTube (long)
      if (video.includes("youtube.com")) {
        const id = new URL(video).searchParams.get("v");
        if (id) {
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
      }

      // YouTube (short)
      if (video.includes("youtu.be")) {
        const id = video.split("youtu.be/")[1];
        if (id) {
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
      }

      // Other video source
      return "/video-placeholder.png";
    } catch {
      return "/video-placeholder.png";
    }
  }

  // Final fallback
  return "/logo_a.png";
}
