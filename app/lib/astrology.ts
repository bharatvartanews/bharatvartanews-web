// const API =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// export async function getAstroByDob(dob: string) {
//   const res = await fetch(`${API}/api/astrology/by-dob`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ dob }),
//   });
//   return res.json();
// }

// export async function getAllRashis() {
//   const res = await fetch(`${API}/api/astrology/all`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch rashis");
//   }

//   return res.json();
// }

// export async function getRashiDetail(rashi: string) {
//   const res = await fetch(`${API}/api/astrology/${rashi}`);
//   return res.json();
// }

import { api } from "./api";

export async function getAllRashis() {
  try {
    const data = await api("/api/astrology/all");
    return data || [];
  } catch (err) {
    console.error("Horoscope fetch failed", err);
    return [];
  }
}

export async function getRashiDetail(rashi: string) {
  try {
    const data = await api(`/api/astrology/${rashi}`);
    return data;
  } catch (err) {
    console.error("Rashi detail fetch failed", err);
    return null;
  }
}

export async function getAstroByDob(dob: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_BASE_URL}/api/astrology/by-dob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dob }),
  });

  return res.json();
}