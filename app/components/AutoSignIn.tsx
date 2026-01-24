"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AutoSignIn() {
  const { user, signIn } = useAuth();

  useEffect(() => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) return;

    const dismissed =
      localStorage.getItem("google_prompt_dismissed") === "1";

    if (!user && !dismissed) {
      signIn(true).then(() => signIn(false));
    }
  }, []);

  return null;
}
