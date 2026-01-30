"use client";
import Link from "next/link";

const RASHIS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

export default function RashiGrid() {
  return (
    <div className="rashi-grid">
      {RASHIS.map((r) => (
        <Link
          key={r}
          href={`/astrology/${r}`}
          className="rashi-card"
        >
          <img src={`/rashi/${r}.svg`} alt={r} />
          <span>{r.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
}
