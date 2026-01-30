"use client";

import { useTranslate } from "../lib/translate";

export default function ContactModal({ onClose }: any) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{useTranslate("Contact Us")}</h3>
        <p>Bharat Varta News</p>
        <p>bharatvartanews24@gmail.com</p>
        <p>+91 9XXXXXXXXX</p>

        <button onClick={onClose}>
          {useTranslate("Close")}
        </button>
      </div>
    </div>
  );
}
