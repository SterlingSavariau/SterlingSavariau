"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-4 h-4" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={14} strokeWidth={1.8} />
      ) : (
        <Moon size={14} strokeWidth={1.8} />
      )}
    </button>
  );
}
