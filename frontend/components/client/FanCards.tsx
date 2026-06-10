"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const href = item?.Link?.Url ?? null;
  const isExternal = item?.Link?.isExternal ?? false;

  function handleClick() {
    if (!href) return;
    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  }

  return (
    <div
      className="absolute top-0 w-full h-full overflow-hidden cursor-pointer rounded-xl"
      onClick={handleClick}
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

function MobileCard({ item }: { item: StrapiProjectContent }) {
  const mediaUrl = getStrapiMedia(item.Media?.url ?? null);
  const isVideo = item.Media?.mime?.startsWith("video/") ?? false;
  const href = item.Link?.Url ?? "#";
  const isExternal = item.Link?.isExternal ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.6 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <a
      ref={cardRef}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/20 transition-colors duration-300"
    >
      {mediaUrl && (
        <div className="w-full h-40 overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img
              src={mediaUrl}
              alt={item.Media?.alternativeText ?? ""}
              className="w-full h-full object-cover pointer-events-none"
            />
          )}
        </div>
      )}
      <div className="flex items-start justify-between px-4 py-3 gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground mb-0.5">{item.Title}</p>
          {item.Description && (
            <p className="text-[12px] leading-relaxed text-muted-foreground">{item.Description}</p>
          )}
        </div>
        <ArrowUpRight
          size={14}
          className="text-muted-foreground group-hover:text-foreground transition-colors mt-0.5 flex-shrink-0"
          aria-hidden
        />
      </div>
    </a>
  );
}

export function FanCards({ projects }: { projects: StrapiProjectContent[] }) {
  const positions: Position[] = ["left", "center", "right"];
  const padded: (StrapiProjectContent | null)[] = [null, null, null];
  const start = Math.max(0, Math.floor((3 - projects.length) / 2));
  projects.slice(0, 3).forEach((p, i) => { padded[start + i] = p; });

  return (
    <>
      {/* Mobile: vertical card list */}
      <div className="flex flex-col gap-4 mt-6 md:hidden">
        {projects.slice(0, 3).map((p) => (
          <MobileCard key={p.id} item={p} />
        ))}
      </div>

      {/* Desktop: 3D fan */}
      <div
        className="relative -mx-16 mt-10 hidden md:flex justify-center overflow-visible"
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
    </>
  );
}
