const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function api(path: string) {
  const url = `${BASE_URL}${path}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`API error ${res.status} for ${url}`);
    }

    return res.json();
  } catch (err) {
    console.error("FETCH FAILED:", url, err);
    throw err;
  }
}
