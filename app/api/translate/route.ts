import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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

    if (!res.ok) {
      return NextResponse.json(
        { text },
        { status: 200 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      text: data.translatedText || text,
    });
  } catch (err) {
    return NextResponse.json(
      { text: "" },
      { status: 500 }
    );
  }
}
