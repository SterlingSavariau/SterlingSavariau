"use client";

import { useState } from "react";

interface ResolvedImage {
  id: number;
  url: string;
  alt: string;
}

const scatter = [
  { x: -52, y: -6,  rotate: -15, delay: 0   },
  { x:  50, y: -10, rotate:  12, delay: 40  },
  { x: -24, y: -52, rotate:  -8, delay: 80  },
];

export function AvatarStack({
  images,
  initials,
}: {
  images: ResolvedImage[];
  initials: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [main, ...rest] = images;

  return (
    <div
      className="relative mb-4 cursor-default"
      style={{ width: 64, height: 64 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {rest.map((img, i) => {
        const cfg = scatter[i] ?? scatter[0];
        return (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt}
            className="absolute top-0 left-0 w-16 h-16 rounded-2xl object-cover"
            style={{
              zIndex: i + 1,
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? `translateX(${cfg.x}px) translateY(${cfg.y}px) rotate(${cfg.rotate}deg)`
                : `translateX(0) translateY(0) rotate(0deg)`,
              transition: `transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${cfg.delay}ms, opacity 0.2s ease ${cfg.delay}ms`,
            }}
          />
        );
      })}

      {main ? (
        <img
          src={main.url}
          alt={main.alt}
          className="absolute top-0 left-0 w-16 h-16 rounded-2xl object-cover"
          style={{ zIndex: rest.length + 2 }}
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-16 h-16 rounded-2xl bg-muted border-2 border-border flex items-center justify-center text-sm font-medium text-muted-foreground"
          style={{ zIndex: rest.length + 2 }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
