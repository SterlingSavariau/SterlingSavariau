"use client";

import { useEffect, useState } from "react";

export function CopyEmailHint({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        navigator.clipboard.writeText(email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [email]);

  return (
    <p className="text-sm text-muted-foreground mt-4">
      Press{" "}
      <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-mono bg-muted border border-border rounded text-foreground">
        C
      </kbd>{" "}
      {copied ? (
        <span className="text-foreground">copied!</span>
      ) : (
        "to copy my email"
      )}
    </p>
  );
}
