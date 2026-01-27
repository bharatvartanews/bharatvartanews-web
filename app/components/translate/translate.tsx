import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, target } = await req.json();

  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target,
      format: "text",
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    text: data.translatedText,
  });
}
