// export function getArticleThumbnail(
//   image?: string | null,
//   video?: string | null
// ) {
//   // 1️⃣ Explicit image wins
//   if (image) return image;

//   if (video) {
//     try {
//       // YouTube (long)
//       if (video.includes("youtube.com")) {
//         const id = new URL(video).searchParams.get("v");
//         if (id) {
//           return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//         }
//       }

//       // YouTube (short)
//       if (video.includes("youtu.be")) {
//         const id = video.split("youtu.be/")[1];
//         if (id) {
//           return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//         }
//       }

//       // Other video source
//       return "/video-placeholder.png";
//     } catch {
//       return "/video-placeholder.png";
//     }
//   }

//   // Final fallback
//   return "/logo_a.png";
// }


export function getArticleThumbnail(
  image?: string | string[] | null,
  video?: string | string[] | null
) {
  // 1️⃣ IMAGE ARRAY (new system)
  if (Array.isArray(image) && image.length > 0) {
    return image[0];
  }

  // 2️⃣ IMAGE STRING (legacy)
  if (typeof image === "string" && image.trim() !== "") {
    return image;
  }

  // 3️⃣ VIDEO ARRAY
  const videoUrl =
    Array.isArray(video) && video.length > 0
      ? video[0]
      : typeof video === "string"
      ? video
      : null;

  if (videoUrl) {
    try {
      // YouTube (long)
      if (videoUrl.includes("youtube.com")) {
        const id = new URL(videoUrl).searchParams.get("v");
        if (id) {
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
      }

      // YouTube (short)
      if (videoUrl.includes("youtu.be")) {
        const id = videoUrl.split("youtu.be/")[1];
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

  // 4️⃣ FINAL fallback
  return "/logo_a.png";
}
