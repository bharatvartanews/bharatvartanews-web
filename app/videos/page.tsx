
// import { api } from '../lib/api';


// // function isDirectVideo(url: string) {
// //   return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
// // }
// function isDirectVideo(url: string) {
//   return /\.(mp4|webm|ogg)$/i.test(url);
// }
// function isFacebook(url: string) {
//   return url.includes("facebook.com");
// }

// function getFacebookEmbed(url: string) {
//   return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
//     url
//   )}`;
// }


// function isYouTube(url: string) {
//   return url.includes("youtube.com") || url.includes("youtu.be");
// }

// function getYouTubeEmbed(url: string) {
//   const id =
//     url.includes("youtu.be")
//       ? url.split("youtu.be/")[1]
//       : new URL(url).searchParams.get("v");
//   return `https://www.youtube.com/embed/${id}`;
// }

// export default async function VideosPage() {
//   const videos: any[] = await api("/api/videos");

//   return (
//     <main className="container">
//       <h2 className="page-title">Videos</h2>

//       <div className="video-grid">
//         {videos.map((v) => (
//           <div key={v.id} className="video-card">
//             <div className="video-thumb">
//               {isDirectVideo(v.url) && (
//                 // <video src={v.url} controls />

//                 <video
//   src={v.url}
//   controls
//   preload="metadata"
//   playsInline
// />

//               )}

//               {isYouTube(v.url) && (
//                 <iframe
//                   src={getYouTubeEmbed(v.url)}
//                   allow="autoplay; encrypted-media"
//                   allowFullScreen
//                 />
//               )}

//               {isFacebook(v.url) && (
//   <iframe
//     src={getFacebookEmbed(v.url)}
//     allow="autoplay; encrypted-media"
//     allowFullScreen
//   />
// )}

//             </div>

//             <div className="video-info">
//               <h3 className="video-title">{v.title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
import { api } from "../lib/api";
import Link from "next/link";
import VideoGrid from "../videos/videos-grid";

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
  } catch (e) {
    return "";
  }
}

function getSourceName(url: string) {
  if (isYouTube(url)) return "YouTube";
  if (isFacebook(url)) return "Facebook";
  if (isDirectVideo(url)) return "Direct";
  return "Video";
}

// export default async function VideosPage() {
//   const videos: any[] = await api("/api/videos");

//   return (
//     <main className="container">
//       {/* HEADER */}
//       <div className="videos-header">
//         <div>
//           <h2 className="page-title">🎥 Videos</h2>
//           <p className="page-subtitle">
//             Watch trailers, highlights & trending clips
//           </p>
//         </div>

//         <Link href="/" className="videos-back-btn">
//           ← Back
//         </Link>
//       </div>

//       {/* GRID */}
//       {videos?.length ? (
//         <div className="videos-grid">
//           {videos.map((v) => (
//             <div key={v.id} className="video-card">
//               {/* PLAYER */}
//               <div className="video-player">
//                 {isDirectVideo(v.url) && (
//                   <video
//                     src={v.url}
//                     controls
//                     preload="metadata"
//                     playsInline
//                   />
//                 )}

//                 {isYouTube(v.url) && (
//                   <iframe
//                     src={getYouTubeEmbed(v.url)}
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                   />
//                 )}

//                 {isFacebook(v.url) && (
//                   <iframe
//                     src={getFacebookEmbed(v.url)}
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                   />
//                 )}
//               </div>

//               {/* INFO */}
//               <div className="video-info">
//                 <h3 className="video-title" title={v.title}>
//                   {v.title}
//                 </h3>

//                 <div className="video-meta">
//                   <span className="video-chip">
//                     {getSourceName(v.url)}
//                   </span>

//                   {v.createdAt && (
//                     <span className="video-date">
//                       {new Date(v.createdAt).toLocaleDateString()}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="empty-state">
//           No videos available right now.
//         </div>
//       )}
//     </main>
//   );
// }
export default async function VideosPage() {
  const videos: any[] = await api("/api/videos");
  return <VideoGrid videos={videos || []} />;
}