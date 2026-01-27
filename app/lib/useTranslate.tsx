"use client";

import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

export function useTranslate(text: string) {
  const { lang } = useLang();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (lang === "en") {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const res = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({ text, target: lang }),
      });
      const data = await res.json();
      setTranslated(data.text);
    };

    run();
  }, [text, lang]);

  return translated;
}
