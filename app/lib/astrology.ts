const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getAstroByDob(dob: string) {
  const res = await fetch(`${API}/api/astrology/by-dob`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dob }),
  });
  return res.json();
}

export async function getAllRashis() {
  const res = await fetch(`${API}/api/astrology/all`);
  return res.json();
}

export async function getRashiDetail(rashi: string) {
  const res = await fetch(`${API}/api/astrology/${rashi}`);
  return res.json();
}
