"use client";

import { useState } from "react";

const EMAIL = "you@yourdomain.com"; // TODO: replace with your email

export function EmailDisplay() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-muted border border-border rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-foreground">{EMAIL}</p>
        <p className="text-xs text-muted-foreground mt-0.5">under 300 chars plz</p>
      </div>
      <button
        onClick={copy}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M2 8H1.5A.5.5 0 011 7.5v-6A.5.5 0 011.5 1h6a.5.5 0 01.5.5V2"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
