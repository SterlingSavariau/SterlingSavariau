"use client";

import { useRef, useState } from "react";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiProjectContent } from "@/components/types/homepage";

type Position = "left" | "center" | "right";

const CARD_BG: Record<Position, string> = {
  left: "linear-gradient(to bottom, #59476f 30%, #7b88d1 100%)",
  center: "linear-gradient(to bottom, #eba65b 30%, #d99267 100%)",
  right: "linear-gradient(to bottom, #59476f 30%, #7b88d1 100%)",
};

const DEFAULT_Z: Record<Position, number> = { left: 0, center: 300, right: 0 };
const LEFT_OFFSET: Record<Position, string> = { left: "-100%", center: "0%", right: "100%" };

function FanCard({ item, position }: { item: StrapiProjectContent | null; position: Position }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaUrl = getStrapiMedia(item?.Media?.url ?? null);
  const isVideo = item?.Media?.mime?.startsWith("video/") ?? false;

  return (
    <div
      className="absolute top-0 w-full h-full overflow-hidden cursor-pointer rounded-xl"
      style={{
        left: LEFT_OFFSET[position],
        zIndex: hovered ? 400 : DEFAULT_Z[position],
        background: CARD_BG[position],
        transform: hovered ? "rotate(0deg) scale(1) translateY(10px)" : "rotateX(60deg) scale(0.7)",
        transition: "all 0.5s ease",
        boxShadow: "0px 20px 100px rgba(0,0,0,0.45)",
      }}
      onMouseEnter={() => {
        setHovered(true);
        if (isVideo) videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (isVideo && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Media — full card */}
      {mediaUrl && (
        isVideo ? (
          <video
            ref={videoRef}
            src={mediaUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={item?.Media?.alternativeText ?? ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      )}
    </div>
  );
}

export function FanCards({ projects }: { projects: StrapiProjectContent[] }) {
  const positions: Position[] = ["left", "center", "right"];
  const padded: (StrapiProjectContent | null)[] = [null, null, null];
  const start = Math.max(0, Math.floor((3 - projects.length) / 2));
  projects.slice(0, 3).forEach((p, i) => { padded[start + i] = p; });

  return (
    <div
      className="relative -mx-16 mt-10 flex justify-center overflow-visible"
      style={{ height: "260px" }}
    >
      <div
        className="relative overflow-visible"
        style={{ width: "320px", height: "200px", perspective: "900px" }}
      >
        {positions.map((pos, i) => (
          <FanCard key={pos} item={padded[i]} position={pos} />
        ))}
      </div>
    </div>
  );
}
