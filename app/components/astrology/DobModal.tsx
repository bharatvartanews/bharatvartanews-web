"use client";
import { useState } from "react";

export default function DobModal({
  onSave,
}: {
  onSave: (dob: string) => void;
}) {
  const [dob, setDob] = useState("");

  return (
    <div className="astro-modal-backdrop">
      <div className="astro-modal">
        <h3>🔮 Get Personalized Horoscope</h3>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <button
          disabled={!dob}
          onClick={() => {
            localStorage.setItem("user_dob", dob);
            onSave(dob);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
