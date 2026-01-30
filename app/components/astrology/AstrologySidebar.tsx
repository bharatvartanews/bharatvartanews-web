"use client";

import { useEffect, useState } from "react";
import {
  getAstroByDob,
  getRashiDetail,
  getAllRashis,
} from "@/app/lib/astrology";

const RASHI_ICONS: Record<string, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};

// export default function AstrologySidebar() {
//   const [dob, setDob] = useState("");
//   const [view, setView] = useState<any>(null);
//   const [rashis, setRashis] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getAllRashis().then(setRashis);
//   }, []);

//   async function loadByDob() {
//     if (!dob) return;
//     setLoading(true);
//     const res = await getAstroByDob(dob);
//     setView({ type: "personal", data: res });
//     setLoading(false);
//     localStorage.setItem("user_dob", dob);
//   }

//   async function loadRashi(rashi: string) {
//     setLoading(true);
//     const res = await getRashiDetail(rashi);
//     setView({ type: "rashi", rashi, data: res });
//     setLoading(false);
//   }

//   return (
//     <aside className="side-card astrology-panel">
//       {/* 🔮 HEADER */}
//       <h3 className="side-title">🔮 Horoscope</h3>

//       {/* 🗓 DOB SELECTOR (ALWAYS) */}
//       <div className="dob-box">
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         />
//         <button onClick={loadByDob}>OK</button>
//       </div>

//       {/* 🔄 CONTENT */}
//       {loading && <p className="muted">Loading…</p>}

//       {view && (
//         <div className="astro-content">
//           <div className="astro-header">
//             <span className="astro-icon">
//               {RASHI_ICONS[
//                 view.type === "personal"
//                   ? view.data.rashi
//                   : view.rashi
//               ]}
//             </span>
//             <div>
//               <h4>
//                 {(view.type === "personal"
//                   ? view.data.rashi
//                   : view.rashi
//                 ).toUpperCase()}
//               </h4>
//               <small>{view.data.date}</small>
//             </div>
//           </div>

//           <p className="astro-preview">
//             {view.data.general.slice(0, 160)}…
//           </p>

//           <a
//             href={`/astrology/${
//               view.type === "personal"
//                 ? view.data.rashi
//                 : view.rashi
//             }`}
//             className="astro-readmore"
//           >
//             Read full horoscope →
//           </a>
//         </div>
//       )}

//       {/* ♈ ALL RASHIS (BOTTOM) */}
//       <div className="rashi-bottom">
//         <h4>All Rashis</h4>
//         <div className="rashi-mini-grid">
//           {rashis.map((r) => (
//             <button
//               key={r.rashi}
//               onClick={() => loadRashi(r.rashi)}
//               className="rashi-mini"
//             >
//               <span>{RASHI_ICONS[r.rashi]}</span>
//               <small>{r.rashi}</small>
//             </button>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }
const RASHIS = [
  "aries","taurus","gemini","cancer",
  "leo","virgo","libra","scorpio",
  "sagittarius","capricorn","aquarius","pisces"
];


export default function AstrologySidebar() {
  const [dob, setDob] = useState("");
  const [rashis, setRashis] = useState<any[]>([]);
  const [view, setView] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [displayDate, setDisplayDate] = useState<string | null>(null);

  useEffect(() => {
    getAllRashis().then(setRashis);
  }, []);

  async function loadByDob() {
    if (!dob) return;
    setLoading(true);
    setExpanded(false);

    const res = await getAstroByDob(dob);

    setView({
      rashi: res.rashi,
      text: res.general || res.homeData || "",
    });
    setDisplayDate(dob);
    setLoading(false);
  }

  async function loadRashi(rashi: string) {
    setLoading(true);
    setExpanded(false);

    const res = await getRashiDetail(rashi);

    setView({
      rashi,
      text: res.general || res.homeData || "",
    });
    setDisplayDate(res.date);
    setDob("");
    setLoading(false);
  }

  const previewText =
    view?.text?.split(" ").slice(0, 35).join(" ") + "...";

  return (
    <aside className="side-card astrology-panel">
      {/* HEADER */}
      <div className="astro-header-top">
        <h3>🔮 राशिफल</h3>
      </div>

      {/* DOB */}
      <div className="dob-box">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button onClick={loadByDob}>OK</button>
      </div>

      {/* LOADER */}
      {loading && <AstroSkeleton />}

      {/* EMPTY STATE */}
      {!view && !loading && (
        <div className="astro-empty">
          अपनी जन्मतिथि चुनें या नीचे से राशि चुनें
        </div>
      )}

      {/* CONTENT */}
      {view && !loading && (
        <div className="astro-content">
          <div className="astro-main-header">
            <span className="astro-icon">
              {RASHI_ICONS[view.rashi]}
            </span>
            <div>
              {/* <h4>{view.rashi.toUpperCase()}</h4>
              <small>{displayDate}</small> */}
              <h4 className="astro-rashi-name">
  {view.rashi.charAt(0).toUpperCase() + view.rashi.slice(1)}
</h4>

            </div>
          </div>

          <p className={`astro-text ${expanded ? "open" : ""}`}>
            {expanded ? view.text : previewText}
          </p>

          {view.text && view.text.length > previewText.length && (
            <button
              className="astro-toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "कम पढ़ें" : "पूरा पढ़ें"}
            </button>
          )}
        </div>
      )}

      {/* ALL RASHIS */}
      <div className="rashi-bottom">
        <h4 className="rashi-title">✨ सभी राशियाँ</h4>

        {/* <div className="rashi-mini-grid">
          {rashis.map((r) => (
            <button
              key={r.rashi}
              onClick={() => loadRashi(r.rashi)}
              className={`rashi-mini ${
                view?.rashi === r.rashi ? "active" : ""
              }`}
            >
              <span>{RASHI_ICONS[r.rashi]}</span>
              <small>{r.rashi}</small>
            </button>
          ))}
        </div> */}
        <div className="rashi-mini-grid">
  {RASHIS.map((rashi) => (
    <button
      key={rashi}
      onClick={() => loadRashi(rashi)}
      className={`rashi-mini ${view?.rashi === rashi ? "active" : ""}`}
    >
      <span>{RASHI_ICONS[rashi]}</span>
      {/* <small>{rashi}</small> */}
  <small className="rashi-label">
  {rashi.charAt(0).toUpperCase() + rashi.slice(1).toLowerCase()}
</small>


    </button>
  ))}
</div>

      </div>
    </aside>
  );
}

/* ---------- Skeleton Loader ---------- */
function AstroSkeleton() {
  return (
    <div className="astro-skeleton">
      <div className="sk-header" />
      <div className="sk-line" />
      <div className="sk-line" />
      <div className="sk-line short" />
    </div>
  );
}
