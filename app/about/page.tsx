// export default function AboutPage() {
//   return (
//     <main className="container page">
//       <h1>About Bharat Varta News</h1>

//       <p>
//         Bharat Varta is an independent digital news platform committed
//         to delivering accurate, fast, and unbiased news to citizens
//         across India.
//       </p>

//       <p>
//         We cover national, state, politics, business, sports, videos,
//         and ground-level stories in both English and Hindi.
//       </p>

//       <p>
//         Our mission is to empower readers with trustworthy journalism
//         and transparent reporting.
//       </p>
//     </main>
//   );
// }
"use client";

import { useTranslate } from "../lib/useTranslate";
export const dynamic = "force-dynamic";


export default function AboutPage() {
  const t1 = useTranslate("About Bharat Varta");
  const t2 = useTranslate(
    "Bharat Varta is an independent digital news platform delivering fast and reliable news across India."
  );

  return (
    <main className="container page">
      <h1>{t1}</h1>
      <p>{t2}</p>
    </main>
  );
}
